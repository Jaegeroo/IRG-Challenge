"use client";

import { SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateConsultant } from "@/actions/consultant";
import { Loader2 } from "lucide-react";
import { useConsultantStore } from "@/context/consultant/hook";
import { ConsultantsT } from "@/lib/types";

export default function UpdateConsultantForm({
  item,
  closeSheet,
}: {
  item: ConsultantsT;
  closeSheet: () => void;
}) {
  const { update } = useConsultantStore((state) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{
    id: string;
    name: string;
    cost: number;
    bill: number;
    capacity: number;
  }>({
    id: item.id,
    name: item.name,
    cost: item.cost,
    bill: item.bill,
    capacity: item.capacity,
  });

  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const { error, message, data } = await updateConsultant(form);
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

      <div className="grid gap-2">
        <Label>
          Cost/hr ($)<span className="text-red-500">*</span>
        </Label>
        <Input
          name="cost"
          type="number"
          value={form.cost}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, cost: Number(e.target.value) }))
          }
          placeholder=""
          className="col-span-3"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label>
          Bill Rate/hr ($)<span className="text-red-500">*</span>
        </Label>
        <Input
          name="bill"
          type="number"
          value={form.bill}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, bill: Number(e.target.value) }))
          }
          placeholder=""
          className="col-span-3"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label>
          Capacity Rate/hr ($)<span className="text-red-500">*</span>
        </Label>
        <Input
          name="const"
          type="number"
          value={form.capacity}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, capacity: Number(e.target.value) }))
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
