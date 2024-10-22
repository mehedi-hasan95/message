import ButtonHandler from "@/components/forms/sign-up/button-handlers";
import HighLightBar from "@/components/forms/sign-up/highlight-bar";
import { RegistrationStep } from "@/components/forms/sign-up/registration-step";
import { SignUpFormProvider } from "@/components/forms/sign-up/signup-form-provider";

const SignUp = () => {
  return (
    <div>
      <SignUpFormProvider>
        <div className="flex flex-col gap-3">
          <RegistrationStep />
          <ButtonHandler />
        </div>
        <HighLightBar />
      </SignUpFormProvider>
    </div>
  );
};

export default SignUp;
