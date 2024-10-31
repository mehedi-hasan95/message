import { Separator } from "@/components/ui/separator";
import { ConversationMenus } from "./_components/conversation-menus";
import { onGetAllAccountDomains } from "@/actions/settings";
import { Mesenger } from "./_components/mesenger";

const Conversations = async () => {
  const domains = await onGetAllAccountDomains();

  return (
    <>
      <Separator />
      <div className="h-full lg:flex gap-3">
        <ConversationMenus domains={domains?.domains} />
        <Separator orientation="vertical" className="hidden lg:block" />
        <div className="flex flex-col w-full">
          <Mesenger />
        </div>
      </div>
    </>
  );
};

export default Conversations;
