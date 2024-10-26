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
import { ChangePasswordSchema } from "@/schemas/auth.schema";
import { useTransition } from "react";
import { onUpdatePassword } from "@/actions/settings";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const ChangePasswordForm = () => {
  const [isLoading, startTransaction] = useTransition();
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPasssword: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ChangePasswordSchema>) {
    startTransaction(() => {
      onUpdatePassword(values.currentPasssword, values.password).then(
        (data) => {
          if (data?.status === 200) {
            toast(data?.message, {
              action: {
                label: "Success",
                onClick: () => console.log("Success"),
              },
            });
            form.reset();
          } else {
            toast("Password dosen't match", {
              action: {
                label: "Error",
                onClick: () => console.log("Error"),
              },
            });
          }
        }
      );
    });
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="currentPasssword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="****"
                    type="password"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="****"
                    type="password"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="****"
                    type="password"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit">Change Password</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
