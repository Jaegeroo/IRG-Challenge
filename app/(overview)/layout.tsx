"use client";

import AppSidebar from "@/components/overview-layout/sidebar";
import Header from "@/components/overview-layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-2 lg:p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
