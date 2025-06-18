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
import { ConsultantsT } from "@/lib/types";
import UpdateButton from "@/components/ui/update-button";
import UpdateConsultantForm from "./update-consultant-form";

export default function UpdateConsultantButton({
  item,
}: {
  item: ConsultantsT;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <UpdateButton onClick={() => setOpen(true)} />
      <SheetContent className="!max-w-[500px]">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center gap-2">
            <Edit size={16} strokeWidth={1.2} />
            Update Consultant
          </SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <UpdateConsultantForm item={item} closeSheet={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
