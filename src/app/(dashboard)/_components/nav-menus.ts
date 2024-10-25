import {
  GitFork,
  Headset,
  LucideLayoutDashboard,
  Mails,
  MessageSquareMore,
  Settings2,
} from "lucide-react";

export const navMain = [
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
];
