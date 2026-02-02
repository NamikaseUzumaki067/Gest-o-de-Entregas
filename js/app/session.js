import { supabase } from "../core/supabase.js";

/**
 * Retorna usuário + role
 */
export async function getSessionUser() {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user;

  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email,
    role: profile?.role || null
  };
}

/**
 * Observa login / logout
 */
export function watchAuth(callback) {
  supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
}
