"use client";

import { createClientStore } from "./store";
import { ReactNode, createContext, useRef } from "react";

export type ClientStoreApi = ReturnType<typeof createClientStore>;

export const ClientStoreContext = createContext<ClientStoreApi | undefined>(
  undefined
);

export const ClientStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ClientStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createClientStore();
  }

  return (
    <ClientStoreContext.Provider value={storeRef.current}>
      {children}
    </ClientStoreContext.Provider>
  );
};
