import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { HelpDeskForm } from "./help-desk-form";
import { onGetHelpDeskQuestion } from "@/actions/settings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  id: string;
};
export const HelpDeskContent = async ({ id }: Props) => {
  const data = await onGetHelpDeskQuestion(id);

  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <HelpDeskForm id={id} />
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        {data?.helpDesk.length ? (
          <Accordion type="single" collapsible className="w-full">
            {data.helpDesk.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p>No help desk question added</p>
        )}
      </CardContent>
    </Card>
  );
};
