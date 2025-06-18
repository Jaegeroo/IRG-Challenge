"use client";

import { usePathname } from "next/navigation";
import { getPageTitle } from "@/lib/utils";

export default function PageTitle() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return <h1 className="text-base font-medium">{pageTitle}</h1>;
}
