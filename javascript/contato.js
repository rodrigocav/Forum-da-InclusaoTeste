document.addEventListener("DOMContentLoaded", () => {

// ===================== BOTÃO "VOLTAR AO TOPO" =====================
const botao = document.getElementById("btn-topo");

function verificarScroll() {
  if (!botao) return;
  if (window.scrollY > 300) {
    botao.classList.add("mostrar");
  } else {
    botao.classList.remove("mostrar");
  }
}

if (botao) {
  botao.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

window.addEventListener("scroll", verificarScroll);

// ===================== ALINHAMENTO SOCIAL =====================
function alinharSigaNosComGato() {
  const sigaNos = document.querySelector(".social-media");
  if (!botao || !sigaNos) return;

  const distanciaDireita = window.innerWidth - botao.getBoundingClientRect().right;
  sigaNos.style.marginRight = `${distanciaDireita + 10}px`;
}

function ajustarBotaoTopo() {
  if (botao) verificarScroll();
}

window.addEventListener("resize", alinharSigaNosComGato);
window.addEventListener("load", () => {
  ajustarBotaoTopo();
  alinharSigaNosComGato();
});

// ===================== ATIVA LINK DE MENU =====================
document.querySelectorAll("nav ul li a, .menu-lateral ul li a").forEach(link => {
  const linkHref = new URL(link.href, window.location.origin).pathname;
  const atualHref = window.location.pathname;

  const normalize = path => decodeURIComponent(path).replace(/\/$/, "");

  if (normalize(atualHref) === normalize(linkHref)) {
    link.classList.add("ativo");
    link.setAttribute("aria-current", "page");
  }
});

// ===================== MENU LATERAL =====================
const abrirMenuBtn = document.querySelector(".abrir-menu");
const fecharMenuBtn = document.querySelector(".fechar-menu");
const menuLateral = document.querySelector(".menu-lateral");
const overlayMenu = document.querySelector(".overlay-menu");
const logoAnimado = document.querySelector(".logo-menu-img");

function abrirMenu() {
  menuLateral.classList.add("aberto");
  overlayMenu.style.display = "block";
  abrirMenuBtn?.setAttribute("aria-expanded", "true");
  abrirMenuBtn?.classList.add("ativo", "aberto");

  if (logoAnimado) {
    logoAnimado.classList.remove("logo-menu-img");
    void logoAnimado.offsetWidth;
    logoAnimado.classList.add("logo-menu-img");
  }
}

function fecharMenu() {
  menuLateral.classList.remove("aberto");
  overlayMenu.style.display = "none";
  abrirMenuBtn?.setAttribute("aria-expanded", "false");
  abrirMenuBtn?.classList.remove("ativo", "aberto");
}

abrirMenuBtn?.addEventListener("click", e => {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    menuLateral.classList.contains("aberto") ? fecharMenu() : abrirMenu();
  }
});

fecharMenuBtn?.addEventListener("click", fecharMenu);
overlayMenu?.addEventListener("click", fecharMenu);

// ===================== PRELOADER =====================
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

    if (preloader) {
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";
      setTimeout(() => {
        preloader.remove();
        ajustarBotaoTopo();
        alinharSigaNosComGato();
      }, 600);
    }
  }, wait);
});

// ===================== PARALLAX =====================
const cards = document.querySelectorAll(".parallax-card");
const maxRotation = 12;

cards.forEach(card => {
  const content = card.querySelector(".parallax-card-content");
  if (!content) return;

  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / centerY * maxRotation;
    const rotateY = (x - centerX) / centerX * maxRotation;

    content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    content.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

// ===================== SLIDER =====================
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
});
