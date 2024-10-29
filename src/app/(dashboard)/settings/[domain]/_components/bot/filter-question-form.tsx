"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { onFilterQuestion } from "@/actions/settings";
import { FilterQuestionSchema } from "@/schemas/settings.schema";
import { LoadingButton } from "@/components/common/loding-button";

type Props = {
  id: string;
};
export const FilterQuestionForm = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof FilterQuestionSchema>>({
    resolver: zodResolver(FilterQuestionSchema),
    defaultValues: {
      question: "",
      answer: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof FilterQuestionSchema>) {
    startTransition(() => {
      onFilterQuestion(id, values).then((data) => {
        toast(data?.message, {
          action: {
            label: data?.status === 200 ? "Success" : "Error",
            onClick: () =>
              console.log(data?.status === 200 ? "Success" : "Error"),
          },
        });
        router.refresh();
        form.reset({ answer: "", question: "" });
      });
    });
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filter Question</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ask the question what bot answer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Filter Question Answer</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write the answer what bot answer"
                    className="resize-none"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPending ? (
            <LoadingButton />
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
