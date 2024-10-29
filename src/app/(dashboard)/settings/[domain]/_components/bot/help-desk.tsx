import { HELP_DESK_TABS_MENU } from "@/constants/forms";
import TabsMenu from "./tabs-menu";
import { TabsContent } from "@/components/ui/tabs";
import { HelpDeskContent } from "./help-desk-content";
import { FilterQuestion } from "./filter-question";

type Props = {
  id: string;
};
export const HelpDesk = ({ id }: Props) => {
  return (
    <div>
      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
        <TabsContent value="helpdesk" className="w-full">
          <HelpDeskContent id={id} />
        </TabsContent>
        <TabsContent value="question">
          <FilterQuestion id={id} />
        </TabsContent>
      </TabsMenu>
    </div>
  );
};
