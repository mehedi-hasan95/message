import { onGetSubscriptionPlan } from "@/actions/settings";
import { Section } from "./section";
import { pricingCards } from "@/components/common/pricing-plan";
import { ListCheckIcon, Plus } from "lucide-react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

export const BillingSettings = async () => {
  const plan = await onGetSubscriptionPlan();
  const planFeatures = pricingCards.find(
    (card) => card.title === plan
  )?.features;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Billing settings"
          message="Add payment information, upgrade and modify your plan"
        />
      </div>
      <div className="lg:col-span-2">
        <Card className="border-dashed bg-cream border-gray-400 w-full cursor-pointer h-[270px] flex justify-center items-center">
          <CardContent className="flex gap-2 items-center">
            <div className="rounded-full border-2 p-1">
              <Plus className="text-gray-400" />
            </div>
            <CardDescription className="font-semibold">
              Upgrade Plan
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <h2 className="text-2xl">
          Your Current Plan: <span className="font-bold">{plan}</span>
        </h2>
        {planFeatures?.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <ListCheckIcon size={20} /> {item}
          </div>
        ))}
      </div>
    </div>
  );
};
