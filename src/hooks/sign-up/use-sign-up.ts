"use client";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/schemas/auth.schema";
import { toast } from "sonner";
import { onCompleteUserRegisration } from "@/actions/auth";

export const useSignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const form = useForm<z.infer<typeof UserRegistrationSchema>>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: "USER",
    },
    mode: "onChange",
  });

  //   Generate OTP
  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return;

    // Start the sign-up process using the email and password provided
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      onNext((prev) => prev + 1);
    } catch (err: any) {
      toast(err.errors[0].longMessage, {
        action: {
          label: "Error",
          onClick: () => console.log("Error"),
        },
      });
    }
  };

  const onHandleSubmit = form.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return;
      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });

        // If verification was completed, set the session to active
        // and redirect the user
        if (completeSignUp.status !== "complete") {
          return { message: "Something went wrong" };
        }
        if (completeSignUp.status === "complete") {
          if (!signUp.createdUserId) return;
          const registerd = await onCompleteUserRegisration(
            values.fullname,
            signUp.createdUserId,
            values.type
          );
          if (registerd?.status == 200 && registerd.user) {
            await setActive({ session: completeSignUp.createdSessionId });
            setLoading(false);
            router.push("/");
          }
          if (registerd?.status == 400) {
            toast("Something went wrong", {
              action: {
                label: "Error",
                onClick: () => console.log("Error"),
              },
            });
          }
        }
      } catch (err: any) {
        toast(err.errors[0].longMessage, {
          action: {
            label: "Error",
            onClick: () => console.log("Error"),
          },
        });
      }
    }
  );

  return {
    form,
    onHandleSubmit,
    onGenerateOTP,
    loading,
  };
};
