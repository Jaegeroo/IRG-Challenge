import { Tables } from "@/database.types";

export type DashboardDataT = {
  week: number;
  cap_hours: number;
  sched_hours: number;
  util: number;
  cost: number;
  rev: number;
  profit: number;
};

// -------- Generic Store Types -------- //
export type BaseStateT<T> = {
  has_more: boolean;
  loading: boolean;
  page: number;
  items: T[];
  last_query: string;
};
export type BaseStateActionsT<T> = {
  fetch: (searchQuery: string, page: number) => Promise<number>;
  add: (data: T) => void;
  update: (data: T) => void;
  deleteState: (id: string) => void;
  setPage: (page: number) => void;
  setLoading: (value: boolean) => void;
  setHasMore: (value: boolean) => void;
  setLastQuery: (query: string) => void;
};
export type BaseStoreT<T> = BaseStateT<T> & BaseStateActionsT<T>;

// -------- Supabase Types -------- //
export type ConsultantsT = Tables<"consultants">;
export type ClientsT = Tables<"clients">;

// -------- Store Types -------- //
export type ConsultantStateT = BaseStateT<ConsultantsT>;
export type ConsultantStateActionsT = BaseStateActionsT<ConsultantsT>;
export type ConsultantStoreT = BaseStoreT<ConsultantsT>;

export type ClientStateT = BaseStateT<ClientsT>;
export type ClientStateActionsT = BaseStateActionsT<ClientsT>;
export type ClientStoreT = BaseStoreT<ClientsT>;
