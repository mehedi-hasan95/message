"use client";

import { useSidebar } from "@/context/use-sidebar";
import { cn } from "@/lib/utils";

type Props = {
  domains: { id: string; name: string; icon: string }[] | null | undefined;
};

export const Sidebar = ({ domains }: Props) => {
  const { expand, onExpand, onSignOut, page } = useSidebar();
  return (
    <div
      className={cn(
        "bg-cream dark:bg-neutral-950 h-full w-[60px] fill-mode-forwards fixed md:relative",
        expand == undefined && "",
        expand == true
          ? "animate-open-sidebar"
          : expand == false && "animate-close-sidebar"
      )}
    >
      Sidebar
    </div>
  );
};
