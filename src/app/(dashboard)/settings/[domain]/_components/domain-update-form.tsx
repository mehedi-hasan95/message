"use client";

import { useTransition } from "react";
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
import { DomainSettingsSchema } from "@/schemas/settings.schema";
import { FileUpload } from "@/components/common/file-upload";
import { onUpdateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { LoadingButton } from "@/components/common/loding-button";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  name: string;
  icon: string | null | undefined;
  welcomeMessage: string | null | undefined;
};
export const DomainUpdateForm = ({ icon, id, name, welcomeMessage }: Props) => {
  const [isLoading, startTransaction] = useTransition();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof DomainSettingsSchema>>({
    resolver: zodResolver(DomainSettingsSchema),
    defaultValues: {
      domain: name || undefined,
      image: icon || undefined,
      welcomeMessage: welcomeMessage || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof DomainSettingsSchema>) {
    // Todo
    startTransaction(() => {
      onUpdateSettings(
        id,
        values.domain,
        values.image,
        values.welcomeMessage
      ).then((data) => {
        toast(data?.message, {
          action: {
            label: data?.status === 200 ? "Success" : "Error",
            onClick: () =>
              console.log(data?.status === 200 ? "Success" : "Error"),
          },
        });
        router.refresh();
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="mehedi.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="welcomeMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chatbot welcome message</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="hey there"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chatbot icon</FormLabel>
              <FormControl>
                <FileUpload
                  endpoint="chatImage"
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                  value={field.value as string}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">Update Domain</Button>
        )}
      </form>
    </Form>
  );
};
