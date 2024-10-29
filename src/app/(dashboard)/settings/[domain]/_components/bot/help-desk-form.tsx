"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HelpDeskSchema } from "@/schemas/settings.schema";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { onHelpDeskQuestion } from "@/actions/settings";
import { toast } from "sonner";
import { LoadingButton } from "@/components/common/loding-button";

type Props = {
  id: string;
};
export const HelpDeskForm = ({ id }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof HelpDeskSchema>>({
    resolver: zodResolver(HelpDeskSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof HelpDeskSchema>) {
    startTransition(() => {
      onHelpDeskQuestion(id, values.question, values.answer).then((data) => {
        toast(data?.message, {
          action: {
            label: data?.status === 200 ? "Success" : "Error",
            onClick: () =>
              console.log(data?.status === 200 ? "Success" : "Error"),
          },
        });
        form.reset();
        router.refresh();
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Help Desk Question</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="What is your name?"
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
              <FormLabel>Help Desk Answer</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  placeholder="My name is Mehedi"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPending ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};
