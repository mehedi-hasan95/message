import { Card, CardContent } from "@/components/ui/card";
import { onGetFilterQuestion } from "@/actions/settings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FilterQuestionForm } from "./filter-question-form";

type Props = {
  id: string;
};
export const FilterQuestion = async ({ id }: Props) => {
  const data = await onGetFilterQuestion(id);
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
      <CardContent className="p-6 border-r-[1px]">
        <FilterQuestionForm id={id} />
      </CardContent>
      <CardContent className="p-6 overflow-y-auto chat-window">
        {data?.filterQuestion.length ? (
          <Accordion type="single" collapsible className="w-full">
            {data.filterQuestion.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answered}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <CardContent>No filter question added</CardContent>
        )}
      </CardContent>
    </Card>
  );
};
