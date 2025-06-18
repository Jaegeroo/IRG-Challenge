"use client";

import { SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useClientStore } from "@/context/client/hook";
import { updateClient } from "@/actions/client";
import { ClientsT } from "@/lib/types";

export default function UpdateClientForm({
  item,
  closeSheet,
}: {
  item: ClientsT;
  closeSheet: () => void;
}) {
  const { update } = useClientStore((state) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{ id: string; name: string }>({
    id: item.id,
    name: item.name,
  });

  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const { error, message, data } = await updateClient(form);
    if (error || !data) {
      alert(`${message}`);
    } else {
      closeSheet();
      update(data);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 p-2 pt-0 lg:p-4 lg:pt-0 flex-1 ">
      <div className="grid gap-2">
        <Label>
          Name<span className="text-destructive">*</span>
        </Label>
        <Input
          name="name"
          type="text"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder=""
          className="col-span-3"
          required
        />
      </div>

      <div className="flex items-center gap-2 justify-between mt-auto border">
        <SheetClose asChild>
          <Button disabled={loading} className="flex-1" variant="outline">
            Cancel
          </Button>
        </SheetClose>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          type="submit"
          className="flex-1"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}
