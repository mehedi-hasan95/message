"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { LightMode } from "./theme-mode/light-mode";
import { Section } from "./section";
import { SystemMode } from "./theme-mode/system-mode";
import { DarkMode } from "./theme-mode/dark-mode";

export function ToggleTheme() {
  const { setTheme } = useTheme();

  return (
    <div className="grid md:grid-cols-5 gap-10 pt-10">
      <div className="lg:col-span-1">
        <Section label="Theme Interface" message="Select the theme" />
      </div>
      <div className="lg:col-span-4">
        <div className="flex gap-10 items-center flex-wrap container mx-auto px-6">
          <div onClick={() => setTheme("light")} className="cursor-pointer">
            <SystemMode />
          </div>
          <div onClick={() => setTheme("dark")} className="cursor-pointer">
            <LightMode />
          </div>
          <div onClick={() => setTheme("system")} className="cursor-pointer">
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
}
