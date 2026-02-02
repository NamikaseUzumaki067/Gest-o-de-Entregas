import { supabase } from "./supabase.js";

export async function login(username, password) {
  const email = `${username}@empresa.local`;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw new Error("Usuário ou senha inválidos");
  }
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}
