"use client";

import AppSidebar from "@/components/overview-layout/sidebar";
import Header from "@/components/overview-layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ConsultantStoreProvider } from "@/context/consultant/provider";
import { ClientStoreProvider } from "@/context/client/provider";
import { ProjectStoreProvider } from "@/context/project/provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProjectStoreProvider>
      <ClientStoreProvider>
        <ConsultantStoreProvider>
          <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
              <Header />
              <main className="flex-1 p-2 lg:p-4">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </ConsultantStoreProvider>
      </ClientStoreProvider>
    </ProjectStoreProvider>
  );
}
