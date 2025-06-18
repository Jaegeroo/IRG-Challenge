import { AllocationsT, AllocationStateT, AllocationStoreT } from "@/lib/types";
import { getAllocations } from "@/actions/allocation";
import { createStore } from "zustand";

export const defaultInitState: AllocationStateT = {
  has_more: true,
  loading: false,
  page: 1,
  items: [],
  last_query: "",
};

export const createAllocationStore = (
  initState: AllocationStateT = defaultInitState
) => {
  return createStore<AllocationStoreT>()((set) => ({
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
    add: (data: AllocationsT) => {
      set((prev) => {
        const updated = [...prev.items, data];

        return { ...prev, items: updated };
      });
    },
    update: (newData: AllocationsT) => {
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
        const { count, data } = await getAllocations(searchQuery, page);

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
