"use client";

import { onDeleteDomain } from "@/actions/settings";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { DeleteModal } from "./delete-modal";
import { Delete, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/common/loding-button";
import { Section } from "../../_components/section";
type Props = {
  id: string;
  title: string;
};
export const DeleteDomain = ({ id, title }: Props) => {
  const [isLoading, startTransaction] = useTransition();
  const router = useRouter();
  const DeleteBrand = (id: string) => {
    startTransaction(() => {
      onDeleteDomain(id).then((data) => {
        toast(data?.message, {
          action: {
            label: data?.status === 200 ? "Success" : "Error",
            onClick: () =>
              console.log(data?.status === 200 ? "Success" : "Error"),
          },
        });
        router.push("/settings");
      });
    });
  };
  return (
    <>
      <Section
        label="Delete domain"
        message="The domain will be permanently deleted, including its chats. This action is irreversible and can not be undone."
      />
      <div className="pt-5">
        <DeleteModal onDelete={DeleteBrand} id={id} title={title as string}>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button variant={"destructive"}>
              <Trash2 /> Delete Domain
            </Button>
          )}
        </DeleteModal>
      </div>
    </>
  );
};
