"use server";

import { createClient } from "@/lib/supabase/server";
import type { AllocationsT } from "@/lib/types";

export const getAllocations = async (
  searchQuery: string,
  page: number
): Promise<{ data: AllocationsT[]; count: number; message: string }> => {
  const items_per_page = 20;
  try {
    const supabase = await createClient();

    // Base query for data
    let query = supabase
      .from("allocations")
      .select(`*, consultant!inner(*), project!inner(*)`);

    // Add search conditionally
    if (searchQuery) {
      query = query.ilike("consultant.name", `%${searchQuery}%`);
    }

    // Get count separately
    const { count: totalCount } = await supabase
      .from("allocations")
      .select("id", { count: "exact", head: true });

    // If no results or page out of range, return early
    if (!totalCount || (page - 1) * items_per_page >= totalCount) {
      console.log("No results or page out of range");
      return { data: [], count: 0, message: "" };
    }

    // Calculate range
    const start = (page - 1) * items_per_page;
    const end = Math.min(page * items_per_page - 1, totalCount - 1);

    // Execute main query with range
    const { data, error } = await query.range(start, end);

    if (error) {
      return { data: [], count: 0, message: error.message };
    }

    return { data: data || [], count: totalCount || 0, message: "" };
  } catch (error) {
    return { data: [], count: 0, message: (error as Error).message };
  }
};

export const createAllocation = async (form: {
  consultant: string;
  project: string;
  start_date: Date | undefined;
  end_date: Date | undefined;
  hours_per_week: number;
}): Promise<{ error: boolean; message: string; data: AllocationsT | null }> => {
  try {
    const supabase = await createClient();

    const { error, data } = await supabase
      .from("allocations")
      .insert(form)
      .select(`*, consultant(*), project(*)`);

    if (error) {
      return { error: true, message: error.message, data: null };
    }

    return { error: false, message: "", data: data[0] || null };
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong creating.",
      data: null,
    };
  }
};

export const updateAllocation = async (form: {
  id: string;
  consultant: string;
  project: string;
  start_date: Date | undefined;
  end_date: Date | undefined;
  hours_per_week: number;
}) => {
  try {
    const supabase = await createClient();

    const formattedForm = {
      consultant: form.consultant,
      project: form.project,
      start_date: form.start_date,
      end_date: form.end_date,
      hours_per_week: form.hours_per_week,
    };

    const { error, data } = await supabase
      .from("allocations")
      .update(formattedForm)
      .eq("id", form.id)
      .select(`*, consultant(*), project(*)`);

    if (error) {
      return { error: true, message: error.message, data: null };
    }

    return { error: false, message: "", data: data[0] };
  } catch (error) {
    return {
      error: true,
      message: "Something went error updating.",
      data: null,
    };
  }
};

export const deleteAllocationById = async (id: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("allocations").delete().eq("id", id);

    if (error) {
      return { error: true, message: error.message };
    }

    return { error: false, message: "" };
  } catch (error) {
    return { error: true, message: "Something went wrong deleting." };
  }
};
