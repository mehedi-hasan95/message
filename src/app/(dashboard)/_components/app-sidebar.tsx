"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  GitFork,
  Headset,
  LucideLayoutDashboard,
  Mails,
  MenuIcon,
  MessageSquareMore,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/app/(dashboard)/_components/nav-main";
import { NavUser } from "@/app/(dashboard)/_components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { ClosapbleDomain } from "./closapble-domain";
import { navMain } from "./nav-menus";

// This is sample data.

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

export function AppSidebar({ domains }: Props) {
  const { user } = useUser();
  const userData = {
    name: user?.firstName || "",
    email: user?.emailAddresses[0].emailAddress || "",
    avatar: user?.imageUrl || "",
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <ClosapbleDomain items={domains} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
