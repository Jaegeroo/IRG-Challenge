"use client";

import { createConsultantStore } from "./store";
import { ReactNode, createContext, useRef } from "react";

export type ConsultantStoreApi = ReturnType<typeof createConsultantStore>;

export const ConsultantStoreContext = createContext<
  ConsultantStoreApi | undefined
>(undefined);

export const ConsultantStoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const storeRef = useRef<ConsultantStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createConsultantStore();
  }

  return (
    <ConsultantStoreContext.Provider value={storeRef.current}>
      {children}
    </ConsultantStoreContext.Provider>
  );
};
