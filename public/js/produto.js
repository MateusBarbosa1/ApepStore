let quantity = 1;
let selectedColor = null;
let selectedSize = null;
let shippingCost = 0;

document.addEventListener("DOMContentLoaded", () => {
  setDefaultSelections();
  initializeColorButtons();
  initializeSizeButtons();
  initializeQuantityInput();
  setupAddToCart();
  setupBuyNow();
});

// ===========================
// Valores padrão
// ===========================
function setDefaultSelections() {
  const defaultColorBtn = document.querySelector(".color-btn.active");
  if (defaultColorBtn) selectedColor = defaultColorBtn.dataset.color;

  const defaultSizeBtn = document.querySelector(".size-btn.active");
  if (defaultSizeBtn) selectedSize = defaultSizeBtn.textContent;

  const qtyInput = document.getElementById("quantity");
  if (qtyInput) quantity = parseInt(qtyInput.value) || 1;
}

// ===========================
// CORES
// ===========================
function initializeColorButtons() {
  document.querySelectorAll(".color-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".color-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedColor = btn.dataset.color;
    });
  });
}

// ===========================
// TAMANHOS
// ===========================
function initializeSizeButtons() {
  document.querySelectorAll(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".size-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.textContent;
    });
  });
}

// ===========================
// QUANTIDADE
// ===========================
function initializeQuantityInput() {
  const qtyInput = document.getElementById("quantity");
  qtyInput.addEventListener("change", () => {
    if (qtyInput.value < 1) qtyInput.value = 1;
    quantity = parseInt(qtyInput.value);
  });
}

function increaseQuantity() {
  quantity++;
  document.getElementById("quantity").value = quantity;
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    document.getElementById("quantity").value = quantity;
  }
}

// ===========================
// ADICIONAR AO CARRINHO
// ===========================
function setupAddToCart() {
  document.querySelectorAll(".btn-cart").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const PRODUCT_ID = btn.dataset.id;

      try {
        const url = "/produto-single-cart/" + PRODUCT_ID;
        if (window.location.pathname == url) {
          const response = await fetch(`/update-carrinho`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: PRODUCT_ID,
              qtd: quantity,
              cor: selectedColor,
              size: selectedSize,
            }),
          });
          if (response.ok) {
            showNotification("Produto Atualizado com sucesso!", "success");
            window.location.href = "/carrinho";
          }
        } else {
          const response = await fetch(`/add-carrinho`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: PRODUCT_ID,
              qtd: quantity,
              cor: selectedColor,
              size: selectedSize,
            }),
          });
          if (!response.ok) {
            showNotification("Produto já está no carrinho!", "error");
          } else {
            showNotification("Produto adicionado ao carrinho", "success");
            window.location.href = "/carrinho";
          }
        }
      } catch (err) {
        console.error(err);
        showNotification("Erro ao adicionar ao carrinho", "error");
      }
    });
  });
}

// ===========================
// COMPRAR AGORA
// ===========================
function setupBuyNow() {
  document.querySelectorAll(".btn-comprar").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const PRODUCT_ID = btn.dataset.id;

      try {
        const response = await fetch(`/add-carrinho`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: PRODUCT_ID,
            qtd: quantity,
            cor: selectedColor,
            size: selectedSize,
          }),
        });

        if (!response.ok)
          throw new Error("Não foi possível adicionar o produto");

        showNotification("Produto adicionado! Redirecionando...", "success");
        setTimeout(() => (window.location.href = "/checkout"), 500);
      } catch (err) {
        console.error(err);
        showNotification("Erro ao comprar o produto", "error");
      }
    });
  });
}

// ===========================
// NOTIFICAÇÃO
// ===========================
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        color: white;
        background-color: ${type === "success" ? "#10b981" : "#f44336"};
        z-index: 1000;
        font-family: 'Lato', sans-serif;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
