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
import { ClientsT } from "@/lib/types";
import UpdateButton from "@/components/ui/update-button";
import UpdateClientForm from "./update-client-form";

export default function UpdateClientButton({ item }: { item: ClientsT }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <UpdateButton onClick={() => setOpen(true)} />
      <SheetContent className="!max-w-[500px]">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <Edit size={16} strokeWidth={1.2} />
            Update Client
          </SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <UpdateClientForm item={item} closeSheet={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
