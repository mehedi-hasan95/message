import { BillingSettings } from "./_components/billing-settings";
import { ChangePassword } from "./_components/change-password";
import { ToggleTheme } from "./_components/toggle-theme";

const SettingsPage = () => {
  return (
    <div className="overflow-y-auto w-full">
      <BillingSettings />
      <ToggleTheme />
      <ChangePassword />
    </div>
  );
};

export default SettingsPage;
