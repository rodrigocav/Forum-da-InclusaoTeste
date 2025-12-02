document.addEventListener("DOMContentLoaded", () => {
    // TODO: Inserir aqui todos os scripts de preloader, menu lateral, voltar ao topo, etc. que são comuns a todas as páginas.
    // O ideal é ter um arquivo .js comum e importar aqui, ou apenas o script específico da página.

    // Script de filtro para a página de materiais
    const tipoMaterialSelect = document.getElementById('tipo-material');
    const topicoMaterialSelect = document.getElementById('topico-material');
    const materialCards = document.querySelectorAll('.material-card');

    function aplicarFiltros() {
        const tipoSelecionado = tipoMaterialSelect.value;
        const topicoSelecionado = topicoMaterialSelect.value;

        materialCards.forEach(card => {
            const tipoCard = card.dataset.tipo;
            const topicoCard = card.dataset.topico;

            const tipoCorresponde = (tipoSelecionado === 'todos' || tipoSelecionado === tipoCard);
            const topicoCorresponde = (topicoSelecionado === 'todos' || topicoSelecionado === topicoCard);

            card.style.display = (tipoCorresponde && topicoCorresponde) ? 'flex' : 'none';
        });
    }

    tipoMaterialSelect?.addEventListener('change', aplicarFiltros);
    topicoMaterialSelect?.addEventListener('change', aplicarFiltros);

    aplicarFiltros();
});