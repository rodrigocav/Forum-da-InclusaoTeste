document.addEventListener("DOMContentLoaded", () => {

    /* ===================== BOTÃO VOLTAR AO TOPO ===================== */
    const botao = document.getElementById("btn-topo");

    function verificarScroll() {
        if (window.scrollY > 300) botao.classList.add("mostrar");
        else botao.classList.remove("mostrar");
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

    window.addEventListener("resize", alinharSigaNosComGato);
    window.addEventListener("load", () => {
        verificarScroll();
        alinharSigaNosComGato();
    });

    /* ===================== MENU LATERAL ===================== */
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
        if (window.innerWidth <= 768) {
            menuLateral.classList.contains("aberto") ? fecharMenu() : abrirMenu();
        }
    });

    overlayMenu?.addEventListener("click", fecharMenu);

    /* ===================== ATIVA LINK DE MENU ===================== */
    document.querySelectorAll("nav a, .menu-lateral a").forEach(link => {
        const linkHref = new URL(link.href, window.location.origin).pathname;
        const atualHref = window.location.pathname;

        if (linkHref === atualHref) {
            link.classList.add("ativo");
            link.setAttribute("aria-current", "page");
        }
    });

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
            if (!img.src) img.src = img.dataset.src;
        });

        setTimeout(() => {
            document.documentElement.classList.remove("loading");

            const preloader = document.getElementById("preloader");
            if (preloader) {
                preloader.style.opacity = "0";
                preloader.style.pointerEvents = "none";
                setTimeout(() => preloader.remove(), 600);
            }
        }, wait);
    });

});
