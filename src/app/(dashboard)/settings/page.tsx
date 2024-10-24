import { BillingSettings } from "./_components/billing-settings";

const SettingsPage = () => {
  return (
    <div className="overflow-y-auto w-full chat-window flex-1 flex flex-col gap-10 ">
      <BillingSettings />
    </div>
  );
};

export default SettingsPage;
