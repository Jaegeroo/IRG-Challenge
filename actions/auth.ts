"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const signup = async (
  email: string,
  password: string
): Promise<{ error: boolean; message: string }> => {
  const supabase = await createClient();
  try {
    const { error: signup_error, data: user_data } = await supabase.auth.signUp(
      { email, password }
    );

    if (signup_error && !user_data?.user) {
      return { error: true, message: signup_error.message };
    }

    revalidatePath("/", "layout");
    return { error: false, message: "" };
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong signing up. " + error,
    };
  }
};

export const signin = async (
  email: string,
  password: string
): Promise<{ error: boolean; message: string }> => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (!error) {
    revalidatePath("/", "layout");
    return { error: false, message: "" };
  }
  return { error: true, message: error.message };
};

export const signout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/sign-in");
};
