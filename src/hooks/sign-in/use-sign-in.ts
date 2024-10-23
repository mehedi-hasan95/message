import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });
  const onHandleSubmit = form.handleSubmit(async (values: UserLoginProps) => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      const authenticated = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (authenticated.status === "complete") {
        await setActive({ session: authenticated.createdSessionId });
        toast("Welcome Back!", {
          action: {
            label: "Success",
            onClick: () => console.log("Success"),
          },
        });
        router.push("/");
      }
    } catch (error: any) {
      setLoading(false);
      if (error.errors[0].code === "form_password_incorrect")
        toast("email/password is incorrect try again", {
          action: {
            label: "Error",
            onClick: () => console.log("Error"),
          },
        });
    }
  });

  return {
    form,
    onHandleSubmit,
    loading,
  };
};
