"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Edit } from "lucide-react";
import { useState } from "react";
import UpdateButton from "@/components/ui/update-button";
import UpdateProjectForm from "./update-project-form";
import { ProjectsT } from "@/lib/types";

export default function UpdateProjectButton({ item }: { item: ProjectsT }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <UpdateButton onClick={() => setOpen(true)} />
      <SheetContent className="!max-w-[500px]">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <Edit size={16} strokeWidth={1.2} />
            Update Project
          </SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <UpdateProjectForm item={item} closeSheet={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
