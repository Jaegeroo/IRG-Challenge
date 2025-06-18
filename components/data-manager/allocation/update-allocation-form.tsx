"use client";

import { SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { updateAllocation } from "@/actions/allocation";
import { useAllocationStore } from "@/context/allocation/hook";
import { AllocationsT } from "@/lib/types";
import ConsultantComboBoxInput from "../consultants/consultant-combo-box";
import ProjectComboBoxInput from "../projects/project-combo-box";

export default function UpdateAllocationForm({
  item,
  closeSheet,
}: {
  item: AllocationsT;
  closeSheet: () => void;
}) {
  const { update } = useAllocationStore((state) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{
    id: string;
    consultant: string;
    project: string;
    start_date: Date | undefined;
    end_date: Date | undefined;
    hours_per_week: number;
  }>({
    id: item.id,
    consultant: item.consultant.id,
    project: item.project.id,
    start_date: new Date(item.start_date),
    end_date: new Date(item.end_date),
    hours_per_week: item.hours_per_week,
  });

  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const { error, message, data } = await updateAllocation(form);
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
          Consultant<span className="text-destructive">*</span>
        </Label>
        <ConsultantComboBoxInput
          consultant={form.consultant}
          setForm={(e) => setForm((prev) => ({ ...prev, consultant: e }))}
        />
      </div>
      <div className="grid gap-2">
        <Label>
          Project<span className="text-destructive">*</span>
        </Label>
        <ProjectComboBoxInput
          project={form.project}
          setForm={(e) => setForm((prev) => ({ ...prev, project: e }))}
        />
      </div>

      <div className="grid gap-2">
        <Label>
          Start Date<span className="text-destructive">*</span>
        </Label>
        <Input
          type="date"
          value={
            form.start_date ? form.start_date.toISOString().slice(0, 10) : ""
          }
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              start_date: new Date(e.target.value),
            }))
          }
        />
      </div>

      <div className="grid gap-2">
        <Label>
          End Date<span className="text-destructive">*</span>
        </Label>
        <Input
          type="date"
          value={form.end_date ? form.end_date.toISOString().slice(0, 10) : ""}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              end_date: new Date(e.target.value),
            }))
          }
        />
      </div>

      <div className="grid gap-2">
        <Label>
          Hours/Week<span className="text-destructive">*</span>
        </Label>
        <Input
          type="number"
          value={form.hours_per_week}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              hours_per_week: Number(e.target.value),
            }))
          }
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
