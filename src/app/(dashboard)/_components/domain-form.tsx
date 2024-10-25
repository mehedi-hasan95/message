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
import { AddDomainSchema } from "@/schemas/settings.schema";
import { FileUpload } from "@/components/common/file-upload";
import { useTransition } from "react";
import { onIntegrateDomain } from "@/actions/settings";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type DomainFormProps = {
  onSuccess: () => void;
};

export const DomainForm = ({ onSuccess }: DomainFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof AddDomainSchema>>({
    resolver: zodResolver(AddDomainSchema),
    defaultValues: {
      domain: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof AddDomainSchema>) {
    startTransition(() => {
      onIntegrateDomain(values.domain, values.image).then((data) => {
        toast(data?.message, {
          action: {
            label: data?.status === 200 ? "Success" : "Error",
            onClick: () =>
              console.log(data?.status === 200 ? "Success" : "Error"),
          },
        });

        if (data?.status === 200) {
          onSuccess();
        }

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
                  disabled={isPending}
                  placeholder="mehedi.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isPending}
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain Image</FormLabel>
              <FormControl>
                <FileUpload
                  endpoint="domainImage"
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isPending ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};
