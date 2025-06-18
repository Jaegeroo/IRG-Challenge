import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import PageTitle from "./page-title";
// import ThemeToggler from "../themes/theme-toggler";

export default function Header() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex justify-between w-full items-center gap-1 px-4 py-2">
        <div className="flex flex-row items-center">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <PageTitle />
        </div>
        {/* <ThemeToggler /> */}
      </div>
    </header>
  );
}
