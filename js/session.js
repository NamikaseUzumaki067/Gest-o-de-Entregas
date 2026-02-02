import { supabase } from "./supabase.js";

export async function getUserSession() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
}

export function can(role, action) {
  const permissions = {
    admin: ["create", "edit", "delete", "view", "manage_users"],
    operador: ["create", "edit", "view"],
    observador: ["view"]
  };

  return permissions[role]?.includes(action);
}
