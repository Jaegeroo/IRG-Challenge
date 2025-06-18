"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateProject } from "@/actions/project";
import { Loader2 } from "lucide-react";
import { useProjectStore } from "@/context/project/hook";
import { ProjectsT } from "@/lib/types";
import ClientComboBoxInput from "../clients/client-combo-box";

export default function UpdateProjectForm({
  item,
  closeSheet,
}: {
  item: ProjectsT;
  closeSheet: () => void;
}) {
  const { update } = useProjectStore((state) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{
    id: string;
    name: string;
    client: string;
    billing_model: "Flat" | "Hourly";
    flat_fee?: number;
  }>({
    id: item.id,
    name: item.name,
    client: item.client.id,
    billing_model: item.billing_model,
    flat_fee: item.flat_fee || 0,
  });

  const handleSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const { error, message, data } = await updateProject(form);
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
          Client <span className="text-red-500">*</span>
        </Label>
        <ClientComboBoxInput
          client={form.client}
          setForm={(e) => setForm((prev) => ({ ...prev, client: e }))}
        />
      </div>

      <div className="grid gap-2">
        <Label>
          Billing Model <span className="text-red-500">*</span>
        </Label>
        <Select
          name="billing_model"
          value={form.billing_model}
          onValueChange={(e) =>
            setForm((prev) => ({
              ...prev,
              billing_model: e as "Flat" | "Hourly",
            }))
          }
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Flat">Flat</SelectItem>
              <SelectItem value="Hourly">Hourly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Flat fee</Label>
        <Input
          name="flat-fee"
          type="number"
          value={form.flat_fee}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, flat_fee: Number(e.target.value) }))
          }
          placeholder=""
          className="col-span-3"
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
