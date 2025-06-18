import { ProjectStoreT } from "@/lib/types";
import { useContext } from "react";
import { useStore } from "zustand";
import { ProjectStoreContext } from "./provider";

export const useProjectStore = <T>(selector: (store: ProjectStoreT) => T) => {
  const projectStoreContext = useContext(ProjectStoreContext);

  if (!projectStoreContext) {
    throw new Error("useProjectStore must be used within ProjectStoreProvider");
  }

  return useStore(projectStoreContext, selector);
};
