"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HomeMenu = () => {
  const menus = [
    {
      id: "1",
      href: "/",
      label: "Home",
    },
    {
      id: "2",
      href: "#feature",
      label: "Feature",
    },
    {
      id: "3",
      href: "#pricing",
      label: "Pricing",
    },
    {
      id: "4",
      href: "#contact",
      label: "Contact Us",
    },
  ];
  const pathName = usePathname();
  return (
    <ul className="flex items-center gap-4">
      {menus.map((menu) => (
        <li
          key={menu.id}
          className={cn(
            "text-xl text-muted-foreground font-semibold",
            pathName === menu.href && "text-white font-bold"
          )}
        >
          <Link href={menu.href}>{menu.label}</Link>
        </li>
      ))}
    </ul>
  );
};
