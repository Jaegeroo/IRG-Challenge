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
import AddClientForm from "./add-client-form";

export default function AddClientButton() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="ml-auto">
        <Button>
          <Plus />
          <span className="hidden md:block">Add Client</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="!max-w-[500px]">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <Plus size={18} strokeWidth={1.2} />
            Add Client
          </SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <AddClientForm closeSheet={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
