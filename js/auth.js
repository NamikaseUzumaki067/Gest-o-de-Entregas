import { supabase } from "./supabase.js";

const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert("Login inválido");
      return;
    }

    window.location.href = "dashboard.html";
  });
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}
