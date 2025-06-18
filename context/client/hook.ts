import { ClientStoreT } from "@/lib/types";
import { useContext } from "react";
import { useStore } from "zustand";
import { ClientStoreContext } from "./provider";

export const useClientStore = <T>(selector: (store: ClientStoreT) => T) => {
  const clientStoreContext = useContext(ClientStoreContext);

  if (!clientStoreContext) {
    throw new Error("useClientStore must be used within ClientStoreProvider");
  }

  return useStore(clientStoreContext, selector);
};
