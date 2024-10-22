import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
type LoaderProps = {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
};

export const Loader = ({ loading, children, className }: LoaderProps) => {
  return loading ? (
    <div className={cn(className || "w-full py-5 flex justify-center")}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </div>
  ) : (
    children
  );
};
