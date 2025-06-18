import { ConsultantStoreT } from "@/lib/types";
import { useContext } from "react";
import { useStore } from "zustand";
import { ConsultantStoreContext } from "./provider";

export const useConsultantStore = <T>(
  selector: (store: ConsultantStoreT) => T
) => {
  const consultantStoreContext = useContext(ConsultantStoreContext);

  if (!consultantStoreContext) {
    throw new Error(
      "useConsultantStore must be used within ConsultantStoreProvider"
    );
  }

  return useStore(consultantStoreContext, selector);
};
