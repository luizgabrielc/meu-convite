"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function rsvpGuest(formData: FormData) {
  const supabase = await createClient();
  const guest_id = formData.get("guest_id") as string;
  const rsvp_status = formData.get("rsvp_status") as string;

  if (!guest_id || !rsvp_status) {
    return { error: "Dados obrigatórios ausentes." };
  }

  const { error } = await supabase.from("guests").update({
    rsvp_status,
    responded_at: new Date().toISOString(),
  }).eq("id", guest_id);

  revalidatePath(`/rsvp/${guest_id}`);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
} 