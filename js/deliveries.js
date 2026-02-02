import { supabase } from "./supabase.js";
import { getUserSession } from "./session.js";
import { logout } from "./auth.js";

document.getElementById("logout").onclick = logout;

const user = await getUserSession();

if (!user) {
  window.location.href = "index.html";
}
