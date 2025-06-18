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
export type ProjectsT = {
  billing_model: "Flat" | "Hourly";
  client: ClientsT;
  created_at: string;
  flat_fee: number | null;
  id: string;
  name: string;
};
export type AllocationsT = {
  id: string;
  consultant: ConsultantsT;
  project: ProjectsT;
  hours_per_week: number;
  start_date: string;
  end_date: string;
  created_at: string;
};

// -------- Store Types -------- //
export type ConsultantStateT = BaseStateT<ConsultantsT>;
export type ConsultantStateActionsT = BaseStateActionsT<ConsultantsT>;
export type ConsultantStoreT = BaseStoreT<ConsultantsT>;

export type ClientStateT = BaseStateT<ClientsT>;
export type ClientStateActionsT = BaseStateActionsT<ClientsT>;
export type ClientStoreT = BaseStoreT<ClientsT>;

export type ProjectStateT = BaseStateT<ProjectsT>;
export type ProjectStateActionsT = BaseStateActionsT<ProjectsT>;
export type ProjectStoreT = BaseStoreT<ProjectsT>;

export type AllocationStateT = BaseStateT<AllocationsT>;
export type AllocationStateActionsT = BaseStateActionsT<AllocationsT>;
export type AllocationStoreT = BaseStoreT<AllocationsT>;

export type UserStateT = { id: string; email: string };
export type UserStateActionsT = { fetchUserData: () => void };
export type UserStoreT = UserStateT & UserStateActionsT;
