"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useProjectStore } from "@/context/project/hook";
import { deleteProjectById } from "@/actions/project";
import { Loader2 } from "lucide-react";
import DeleteButton from "@/components/ui/delete-button";

export default function DeleteProjectButton({ id }: { id: string }) {
  const { deleteState } = useProjectStore((state) => state);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { error, message } = await deleteProjectById(id);
    if (error) {
      alert(message);
    } else {
      deleteState(id);
      setOpen(false);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DeleteButton onClick={() => setOpen(true)} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="border-b pb-2">
          <DialogTitle className="px-2 pt-4">Delete Project</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <span className="text-muted-foreground text-sm px-2">
          Are you sure you want to delete the selected row? <br />
          This action cannot be undone.
        </span>
        <DialogFooter className="flex-1 flex !flex-row border-t p-2">
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="destructive"
            className="flex-1"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
