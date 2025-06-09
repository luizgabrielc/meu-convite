"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addGuest(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const event_id = formData.get("event_id") as string;

  if (!name || !event_id) {
    return { error: "Nome e evento são obrigatórios." };
  }

  const { error } = await supabase.from("guests").insert([
    { name, event_id }
  ]);

  revalidatePath(`/admin/events/${event_id}`);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function deleteGuest(formData: FormData) {
  const supabase = await createClient();
  const guest_id = formData.get("guest_id") as string;
  const event_id = formData.get("event_id") as string;

  if (!guest_id || !event_id) {
    return { error: "Dados obrigatórios ausentes." };
  }

  const { error } = await supabase.from("guests").delete().eq("id", guest_id);

  revalidatePath(`/admin/events/${event_id}`);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
} 