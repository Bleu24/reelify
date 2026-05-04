"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BadgeCheck,
  LayoutDashboard,
  ListVideo,
  Sparkles
} from "lucide-react";

import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/automations", label: "Automations", icon: Sparkles },
  { href: "/posts", label: "Posts", icon: ListVideo },
  { href: "/accounts", label: "Accounts", icon: BadgeCheck },
  { href: "/activity", label: "Activity", icon: Activity }
];

/** Render the shared app sidebar. */
export function Sidebar(): React.ReactElement {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-[260px] shrink-0 border-r border-white/10 bg-black/30 backdrop-blur-[16px]">
      <div className="flex h-full flex-col">
        <div className="px-4 py-5">
          <div className="text-sm font-semibold tracking-wide text-white/80">
            Reelify
          </div>
          <div className="mt-1 text-xs text-white/50">Kinetic Pulse</div>
        </div>

        <nav className="flex-1 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white",
                      isActive &&
                        "bg-white/5 text-white ring-1 ring-white/10"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 py-4 text-xs text-white/40">
          Mock-only prototype · No external APIs
        </div>
      </div>
    </aside>
  );
}
