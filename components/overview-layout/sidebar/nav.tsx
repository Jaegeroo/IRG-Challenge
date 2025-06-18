"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Database, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { title: "Dashboard", href: "/", icon: LayoutDashboard },
    { title: "Data Manager", href: "/data-manager", icon: Database },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Overview</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {links.map((item, index) => (
            <Link href={item.href} key={index}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(
                    "cursor-pointer",
                    pathname === item.href && "bg-muted-foreground/10"
                  )}
                >
                  {item.icon && (
                    <item.icon className="!size-5" strokeWidth={1.2} />
                  )}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
