import { onGetCurrentDomainInfo } from "@/actions/settings";
import { redirect } from "next/navigation";
import { DomainUpdateForm } from "./_components/domain-update-form";
import { Section } from "../_components/section";

interface Props {
  params: { domain: string };
}
const DomainPage = async ({ params }: Props) => {
  const domain = await onGetCurrentDomainInfo(params.domain);
  if (!domain) redirect("/dashboard");
  return (
    <div className="grid lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <Section
          label="Update your domain"
          message="You can update domain name, image, chat welcome message"
        />
      </div>
      <div className="lg:col-span-2">
        <DomainUpdateForm
          icon={domain?.domains[0]?.chatBot?.icon}
          id={domain?.domains[0]?.id}
          name={domain?.domains[0]?.name}
          welcomeMessage={domain?.domains[0]?.chatBot?.welcomeMessage}
        />
      </div>
    </div>
  );
};

export default DomainPage;
