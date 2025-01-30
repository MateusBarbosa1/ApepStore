let buttonClose = document.querySelector(".menu span");

document.querySelector(".icon-mobile span").addEventListener("click", () => {
  document.querySelector(".menu").classList.add("menu-selected");
  document.querySelector(".cad-log").style.display = "flex";
  buttonClose.style.display = "flex";
});

buttonClose.addEventListener("click", () => {
  let menu = document.querySelector(".menu");

  // Adiciona a animação de saída
  menu.style.animation = "slideOut 0.5s forwards";

  // Aguarda o término da animação e remove a classe após isso
  setTimeout(() => {
    menu.style.animation = ""; // Limpa a animação
    menu.classList.remove("menu-selected");
  }, 500); // Tempo da animação (0.5s) em milissegundos

  // Impede a propagação do evento para evitar comportamento inesperado
  event.stopPropagation();
});