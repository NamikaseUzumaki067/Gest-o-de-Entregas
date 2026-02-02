import { supabase } from "./core/supabase.js";
import { getSessionUser, watchAuth } from "./app/session.js";
import { logout } from "./core/auth.js";
import { loadLastDeliveries } from "./app/deliveries.js";

const deliveriesContainer = document.getElementById("deliveriesList");
const modal = document.getElementById("deliveryModal");
const titleInput = document.getElementById("deliveryTitle");

const btnCreate = document.querySelector(".btn-create");
const btnSave = document.getElementById("saveDelivery");
const btnCancel = document.getElementById("cancelDelivery");

async function renderDeliveries() {
  deliveriesContainer.innerHTML = "";

  const deliveries = await loadLastDeliveries(5);

  if (!deliveries.length) {
    deliveriesContainer.innerHTML =
      "<p>Nenhuma entrega cadastrada.</p>";
    return;
  }

  deliveries.forEach((d) => {
    const card = document.createElement("div");
    card.className = "delivery-card";
    card.innerHTML = `
      <strong>${d.title}</strong>
      <span class="status ${d.status}">
        ${d.status}
      </span>
    `;
    deliveriesContainer.appendChild(card);
  });
}

function openModal() {
  modal.classList.remove("hidden");
  titleInput.value = "";
  titleInput.focus();
}

function closeModal() {
  modal.classList.add("hidden");
}

async function createDelivery(user) {
  const title = titleInput.value.trim();
  if (!title) return;

  await supabase.from("deliveries").insert({
    title,
    status: "pendente",
    created_by: user.id
  });

  closeModal();
  await renderDeliveries();
}

async function bootstrap() {
  const user = await getSessionUser();

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  document.getElementById("logout")
    ?.addEventListener("click", logout);

  if (user.role === "observador") {
    document.body.classList.add("role-observador");
  } else {
    btnCreate?.addEventListener("click", openModal);
  }

  btnCancel?.addEventListener("click", closeModal);
  btnSave?.addEventListener("click", () => createDelivery(user));

  await renderDeliveries();
}

bootstrap();

watchAuth((user) => {
  if (!user) window.location.href = "index.html";
});
