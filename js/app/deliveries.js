import { supabase } from "../core/supabase.js";

export async function loadLastDeliveries(limit = 5) {
  const { data, error } = await supabase
    .from("deliveries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Erro ao carregar entregas:", error.message);
    return [];
  }

  return data;
}
