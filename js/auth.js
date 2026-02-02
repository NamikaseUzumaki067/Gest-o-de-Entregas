import { supabase } from "./supabase.js";

const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document
      .getElementById("username")
      .value
      .trim()
      .toLowerCase();

    const password = document.getElementById("password").value;

    // 🔁 CONVERSÃO INTERNA
    const email = `${username}@empresa.local`;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert("Usuário ou senha inválidos");
      return;
    }

    window.location.href = "dashboard.html";
  });
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}
