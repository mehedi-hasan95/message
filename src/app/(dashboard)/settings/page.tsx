import { BillingSettings } from "./_components/billing-settings";
import { ToggleTheme } from "./_components/toggle-theme";

const SettingsPage = () => {
  return (
    <div className="overflow-y-auto w-full">
      <BillingSettings />
      <ToggleTheme />
    </div>
  );
};

export default SettingsPage;
