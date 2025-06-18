import { getClients } from "@/actions/client";
import { ClientsT, ClientStateT, ClientStoreT } from "@/lib/types";
import { createStore } from "zustand";

export const defaultInitState: ClientStateT = {
  has_more: true,
  loading: false,
  page: 1,
  items: [],
  last_query: "",
};

export const createClientStore = (
  initState: ClientStateT = defaultInitState
) => {
  return createStore<ClientStoreT>()((set) => ({
    ...initState,
    setLastQuery: (query: string) => {
      set({ last_query: query });
    },
    setLoading: (value: boolean) => {
      set({ loading: value });
    },
    setHasMore: (value: boolean) => {
      set({ has_more: value });
    },
    setPage: (page: number) => {
      set({ page: page });
    },
    add: (data: ClientsT) => {
      set((prev) => {
        const updated = [...prev.items, data];
        updated.sort((a, b) => a.name.localeCompare(b.name));
        return { ...prev, items: updated };
      });
    },
    update: (newData: ClientsT) => {
      set((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === newData.id ? newData : item
        ),
      }));
    },
    deleteState: (id: string) => {
      set((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    },
    fetch: async (searchQuery: string, page: number) => {
      try {
        const { count, data } = await getClients(searchQuery, page);

        set((prev) => {
          // If it's a new search query or first page, replace all items
          if (page === 1) {
            return {
              ...prev,
              items: data,
            };
          }

          // For pagination, append new items ensuring no duplicates
          const mergedMap = new Map();

          // Add existing items
          for (const item of prev.items) {
            mergedMap.set(item.id, item);
          }

          // Add or overwrite with new items
          for (const item of data) {
            mergedMap.set(item.id, item); // This replaces if ID already exists
          }

          // Merge and sort
          const updated = Array.from(mergedMap.values()).sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          return {
            ...prev,
            items: updated,
          };
        });

        return count;
      } catch (error) {
        return 0;
      }
    },
  }));
};
