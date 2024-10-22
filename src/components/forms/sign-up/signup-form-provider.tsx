"use client";
import { AuthContextProvider } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/sign-up/use-sign-up";
import { FormProvider } from "react-hook-form";
import { Loader } from "../loader";

export const SignUpFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { form, loading, onHandleSubmit } = useSignUpForm();
  return (
    <AuthContextProvider>
      <FormProvider {...form}>
        <form onSubmit={onHandleSubmit} className="h-full">
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};
