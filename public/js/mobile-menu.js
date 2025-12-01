let buttonClose = document.querySelector(".menu span");
let menu = document.querySelector(".menu");

// Abrir o menu
document.querySelector(".icon-mobile span").addEventListener("click", () => {
  menu.classList.add("menu-selected");
  document.body.classList.add("no-scroll"); // 🔥 Bloqueia o scroll do fundo

  document.querySelector(".cad-log").style.display = "flex";
  buttonClose.style.display = "flex";
});

// Fechar o menu
buttonClose.addEventListener("click", (event) => {
  event.stopPropagation(); // Agora funciona corretamente

  // Animação de saída
  menu.style.animation = "slideOut 0.5s forwards";

  setTimeout(() => {
    menu.style.animation = "";
    menu.classList.remove("menu-selected");
    document.body.classList.remove("no-scroll"); // 🔥 Libera o scroll novamente
  }, 500);
});
