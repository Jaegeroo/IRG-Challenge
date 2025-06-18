"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddProjectForm from "./add-project-form";

export default function AddProjectButton() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="ml-auto">
        <Button>
          <Plus />
          <span className="hidden md:block">Add Project</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="!max-w-[500px]">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <Plus size={18} strokeWidth={1.2} />
            Add Project
          </SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <AddProjectForm closeSheet={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
