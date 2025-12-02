document.addEventListener("DOMContentLoaded", () => {

    /* ===================== BOTÃO TOPO ===================== */
    const botao = document.getElementById("btn-topo");

    function verificarScroll() {
        if (!botao) return;
        botao.classList.toggle("mostrar", window.scrollY > 300);
    }

    botao?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", verificarScroll);


    /* ===================== ALINHAMENTO SOCIAL ===================== */
    function alinharSigaNosComGato() {
        const sigaNos = document.querySelector(".social-media");
        if (!botao || !sigaNos) return;

        const distanciaDireita = window.innerWidth - botao.getBoundingClientRect().right;
        sigaNos.style.marginRight = `${distanciaDireita + 10}px`;
    }

    function ajustarBotaoTopo() {
        verificarScroll();
    }

    window.addEventListener("resize", alinharSigaNosComGato);


    /* ===================== ATIVA LINK DO MENU ===================== */
    document.querySelectorAll("nav ul li a, .menu-lateral ul li a").forEach(link => {
        const linkHref = new URL(link.href).pathname.replace(/\/$/, "");
        const atualHref = window.location.pathname.replace(/\/$/, "");

        if (atualHref === linkHref) {
            link.classList.add("ativo");
            link.setAttribute("aria-current", "page");
        }
    });


    /* ===================== MENU LATERAL ===================== */
    const abrirMenuBtn = document.querySelector(".abrir-menu");
    const fecharMenuBtn = document.querySelector(".fechar-menu");
    const menuLateral = document.querySelector(".menu-lateral");
    const overlayMenu = document.querySelector(".overlay-menu");

    function abrirMenu() {
        menuLateral.classList.add("aberto");
        overlayMenu.style.display = "block";
        abrirMenuBtn?.setAttribute("aria-expanded", "true");
        abrirMenuBtn.classList.add("aberto");
    }

    function fecharMenu() {
        menuLateral.classList.remove("aberto");
        overlayMenu.style.display = "none";
        abrirMenuBtn?.setAttribute("aria-expanded", "false");
        abrirMenuBtn.classList.remove("aberto");
    }

    abrirMenuBtn?.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            menuLateral.classList.contains("aberto") ? fecharMenu() : abrirMenu();
        }
    });

    overlayMenu?.addEventListener("click", fecharMenu);


    /* ===================== PRELOADER ===================== */
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


    /* ===================== PARALLAX ===================== */
    document.querySelectorAll(".parallax-card").forEach(card => {
        const content = card.querySelector(".parallax-card-content");
        if (!content) return;

        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 12;
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

            content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            content.style.transform = "rotateX(0deg) rotateY(0deg)";
        });
    });


    /* ===================== SLIDER ===================== */
    const slides = document.querySelectorAll(".slide");
    let slideIndex = 0;

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
