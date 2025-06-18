import { AllocationStoreT } from "@/lib/types";
import { useContext } from "react";
import { useStore } from "zustand";
import { AllocationStoreContext } from "./provider";

export const useAllocationStore = <T>(
  selector: (store: AllocationStoreT) => T
) => {
  const allocationsStoreContext = useContext(AllocationStoreContext);

  if (!allocationsStoreContext) {
    throw new Error(
      "useAllocationsStore must be used within AllocationsStoreProvider"
    );
  }

  return useStore(allocationsStoreContext, selector);
};
