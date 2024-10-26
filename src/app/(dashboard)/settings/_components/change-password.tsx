import { ChangePasswordForm } from "./change-password-form";
import { Section } from "./section";

export const ChangePassword = async () => {
  return (
    <div className="grid lg:grid-cols-5 pt-10">
      <div className="lg:col-span-1">
        <Section
          label="Change password"
          message="Do you want change your password?"
        />
      </div>
      <div className="lg:col-span-2">
        <ChangePasswordForm />
      </div>
    </div>
  );
};
