"use client";

import { createProjectStore } from "./store";
import { ReactNode, createContext, useRef } from "react";

export type ProjectStoreApi = ReturnType<typeof createProjectStore>;

export const ProjectStoreContext = createContext<ProjectStoreApi | undefined>(
  undefined
);

export const ProjectStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ProjectStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createProjectStore();
  }

  return (
    <ProjectStoreContext.Provider value={storeRef.current}>
      {children}
    </ProjectStoreContext.Provider>
  );
};
