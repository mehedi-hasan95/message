"use client";

import {
  ChevronRight,
  Globe,
  PlusCircle,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { AppDrawer } from "./app-drawer";
import Link from "next/link";
import Image from "next/image";

type Props = {
  domains:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
};
export function ClosapbleDomain({
  items,
}: {
  items:
    | {
        id: string;
        name: string;
        icon: string | null;
      }[]
    | null
    | undefined;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Domain</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible asChild defaultOpen={true} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={"Your Domain"}>
                {<Globe />}
                <span>Your Domain</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuItem>
                  <AppDrawer
                    className="w-full"
                    title="Add your domain"
                    onOpen={
                      <SidebarMenuButton tooltip={"Add Domain"} asChild>
                        <div>
                          <PlusCircle className="h-4 w-4" />
                          <span>Add Domain</span>
                        </div>
                      </SidebarMenuButton>
                    }
                  />
                </SidebarMenuItem>
                {items?.map((domain) => (
                  <SidebarMenuSubItem key={domain.id}>
                    <SidebarMenuSubButton asChild>
                      <Link href={`/settings/${domain.name.split(".")[0]}`}>
                        <Image
                          src={domain.icon || ""}
                          alt="logo"
                          width={20}
                          height={20}
                        />
                        {domain.name}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
