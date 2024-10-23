import LoginForm from "@/components/forms/sign-in/login-form";
import { SignInFormProvider } from "@/components/forms/sign-in/signin-form-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignIn = () => {
  return (
    <SignInFormProvider>
      <div className="flex flex-col gap-3">
        <LoginForm />
        <div className="w-full flex flex-col gap-3 items-center">
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <p>
            Don’t have an account?{" "}
            <Link href="/sign-up" className="font-bold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </SignInFormProvider>
  );
};

export default SignIn;
