"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  GitFork,
  Headset,
  LucideLayoutDashboard,
  Mails,
  MessageSquareMore,
  Settings2,
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
import { useClerk, useUser } from "@clerk/nextjs";

// This is sample data.

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LucideLayoutDashboard,
    },
    {
      name: "Conversations",
      url: "/conversations",
      icon: MessageSquareMore,
    },
    {
      name: "Integrations",
      url: "/integrations",
      icon: GitFork,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: Settings2,
    },
    {
      name: "Appointments",
      url: "/appointments",
      icon: Headset,
    },
    {
      name: "Email Marketing",
      url: "/email-marketing",
      icon: Mails,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const userData = {
    name: user?.firstName || "",
    email: user?.emailAddresses[0].emailAddress || "",
    avatar: user?.imageUrl || "",
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
