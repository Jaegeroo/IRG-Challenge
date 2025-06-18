"use server";

import { createClient } from "@/lib/supabase/server";
import type { ConsultantsT } from "@/lib/types";

export const getConsultants = async (
  searchQuery: string,
  page: number
): Promise<{ data: ConsultantsT[]; count: number; message: string }> => {
  const items_per_page = 20;
  try {
    const supabase = await createClient();

    // Base query for data
    let query = supabase
      .from("consultants")
      .select("*")
      .order("name", { ascending: true });

    // Add search conditionally
    if (searchQuery) {
      query = query.ilike("name", `%${searchQuery}%`);
    }

    // Get count separately
    const { count: totalCount } = await supabase
      .from("consultants")
      .select("id", { count: "exact", head: true })
      .ilike("name", searchQuery ? `%${searchQuery}%` : "%");

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

export const createConsultant = async (form: {
  name: string;
  cost: number;
  bill: number;
  capacity: number;
}): Promise<{ error: boolean; message: string; data: ConsultantsT | null }> => {
  try {
    const supabase = await createClient();

    const { error, data } = await supabase
      .from("consultants")
      .insert(form)
      .select("*");

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

export const updateConsultant = async (form: {
  bill: number;
  capacity: number;
  cost: number;
  id: string;
  name: string;
}) => {
  try {
    const supabase = await createClient();

    const formattedForm = {
      name: form.name,
      bill: form.bill,
      capacity: form.capacity,
      cost: form.cost,
    };

    const { error, data } = await supabase
      .from("consultants")
      .update(formattedForm)
      .eq("id", form.id)
      .select("*");

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

export const deleteConsultantById = async (id: string) => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("consultants").delete().eq("id", id);

    if (error) {
      return { error: true, message: error.message };
    }

    return { error: false, message: "" };
  } catch (error) {
    return { error: true, message: "Something went wrong deleting." };
  }
};
