"use client";

import { createAllocationStore } from "./store";
import { ReactNode, createContext, useRef } from "react";

export type AllocationStoreApi = ReturnType<typeof createAllocationStore>;

export const AllocationStoreContext = createContext<
  AllocationStoreApi | undefined
>(undefined);

export const AllocationStoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const storeRef = useRef<AllocationStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createAllocationStore();
  }

  return (
    <AllocationStoreContext.Provider value={storeRef.current}>
      {children}
    </AllocationStoreContext.Provider>
  );
};
