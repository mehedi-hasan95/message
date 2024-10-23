"use client";

import { AuthContextProvider } from "@/context/use-auth-context";
import { useSignInForm } from "@/hooks/sign-in/use-sign-in";
import { FormProvider } from "react-hook-form";
import { Loader } from "../loader";

export const SignInFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { form, loading, onHandleSubmit } = useSignInForm();
  return (
    <AuthContextProvider>
      <FormProvider {...form}>
        <form onSubmit={onHandleSubmit}>
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};
