"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

interface Props {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  onRemove: (value: string) => void;
  value: string;
}
export const FileUpload = ({ endpoint, onChange, onRemove, value }: Props) => {
  return (
    <div className="w-full bg-muted/30">
      {value && (
        <div className="mb-4 flex items-center gap-4">
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => onRemove(value)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={value} />
          </div>
        </div>
      )}
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          toast.error(`${error?.message}`);
        }}
      />
    </div>
  );
};
