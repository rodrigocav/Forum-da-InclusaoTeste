document.addEventListener("DOMContentLoaded", () => {

  // BOTÃO VOLTAR AO TOPO
  const botao = document.getElementById("btn-topo");

  function verificarScroll() {
    if (!botao) return;
    botao.classList.toggle("mostrar", window.scrollY > 300);
  }

  botao?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", verificarScroll);

  // MENU LATERAL
  const abrirMenuBtn = document.querySelector(".abrir-menu");
  const menuLateral = document.querySelector(".menu-lateral");
  const overlayMenu = document.querySelector(".overlay-menu");

  function abrirMenu() {
    menuLateral.classList.add("aberto");
    overlayMenu.style.display = "block";
    abrirMenuBtn.setAttribute("aria-expanded", "true");
  }

  function fecharMenu() {
    menuLateral.classList.remove("aberto");
    overlayMenu.style.display = "none";
    abrirMenuBtn.setAttribute("aria-expanded", "false");
  }

  abrirMenuBtn?.addEventListener("click", () => {
    if (menuLateral.classList.contains("aberto")) fecharMenu();
    else abrirMenu();
  });

  overlayMenu?.addEventListener("click", fecharMenu);

  // SLIDER
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlides() {
    slides.forEach(slide => slide.classList.remove("active"));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  }

  if (slides.length > 0) {
    slides[0].classList.add("active");
    setInterval(showSlides, 5000);
  }

  // PARALLAX
  const cards = document.querySelectorAll(".parallax-card");
  const maxRotation = 12;

  cards.forEach(card => {
    const content = card.querySelector(".parallax-card-content");

    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      content.style.transform =
        `rotateX(${-(y - centerY) / centerY * maxRotation}deg) 
         rotateY(${(x - centerX) / centerX * maxRotation}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      content.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });

  // PRELOADER
  const start = Date.now();
  document.querySelectorAll("img.carregamento-postergado").forEach(img => {
    img.dataset.src = img.src;
    img.removeAttribute("src");
  });

  window.addEventListener("load", () => {
    const elapsed = Date.now() - start;
    const wait = Math.max(100 - elapsed, 0);

    document.querySelectorAll("img.carregamento-postergado").forEach(img => {
      if (!img.src && img.dataset.src) img.src = img.dataset.src;
    });

    setTimeout(() => {
      document.documentElement.classList.remove("loading");
      const preloader = document.getElementById("preloader");

      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";

      setTimeout(() => preloader.remove(), 600);
    }, wait);
  });

});
