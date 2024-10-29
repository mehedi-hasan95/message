import { onGetCurrentDomainInfo } from "@/actions/settings";
import { redirect } from "next/navigation";
import { CodeSnippet } from "./_components/code-snippet";
import { Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import { DeleteDomain } from "./_components/delete-domain";
import { Section } from "../_components/section";
import { HelpDesk } from "./_components/bot/help-desk";

const DomainUpdateForm = dynamic(
  () =>
    import("./_components/domain-update-form").then(
      (data) => data.DomainUpdateForm
    ),
  { ssr: false }
);

interface Props {
  params: { domain: string };
}
const DomainPage = async ({ params }: Props) => {
  const domain = await onGetCurrentDomainInfo(params.domain);

  if (!domain?.domains.length) redirect("/settings");
  return (
    <>
      <CodeSnippet id={domain?.domains[0]?.id} />
      <div className="pt-10">
        <Separator className="mb-3" />
        <div className="grid lg:grid-cols-5 gap-10">
          <Section
            label="Domain Settings"
            message="Update or delete your domain"
          />
          <div className="lg:col-span-2">
            <div className="pb-5">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl pb-3">Only for Premium User</h2>
                <Award className="h-6 w-6 text-orange-500" />
              </div>
              <p>If you are in STANDARD plan you can&apos;t update</p>
            </div>
            <DomainUpdateForm
              icon={domain?.domains[0]?.chatBot?.icon}
              id={domain?.domains[0]?.id}
              name={domain?.domains[0]?.name}
              welcomeMessage={domain?.domains[0]?.chatBot?.welcomeMessage}
            />
          </div>
          <div className="lg:col-span-2">
            <DeleteDomain
              id={domain?.domains[0]?.id}
              title={domain?.domains[0]?.name}
            />
          </div>
        </div>
      </div>
      {/* Help Desk  */}
      <div className="pt-10 grid lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Section label="Train your bot" message="Your bot and faq question" />
        </div>
        <div className="lg:col-span-4">
          <HelpDesk id={domain?.domains[0]?.id} />
        </div>
      </div>
    </>
  );
};

export default DomainPage;
