const modalFilter = document.querySelector('.modal-conteiner-filter')
const modalPerfil = document.querySelector('.modal-conteiner-perfil')
const btnFilter = document.querySelector('.btn-filter')
const btnPerfil = document.querySelector('#btn-perfil')
const rangePessoa = document.querySelector('#range-pessoa')
const rangeDistancia = document.querySelector('#range-distancia')
const valueRangePessoa = document.querySelector('#value-range-pessoas')
const valueRangeDistancia = document.querySelector('#value-range-distancia');

function carregaCategorias() {
    const allCategorias = listaCategorias;
    var scale = 'scale(1.5)';

    btnPrev = document.createElement("button")

    allCategorias.forEach(categoria => {
        tipoCategoria = document.createElement("a");
        imgCarrousel = document.createElement("figure");
        imgCategoria = document.createElement("img");
        nameCategoria = document.createElement("span");

        tipoCategoria.setAttribute("class", "tipo-categoria")
        imgCarrousel.setAttribute("class", "img-carrousel")
        imgCategoria.setAttribute("class", "img-categoria")
        nameCategoria.setAttribute("class", "name-categoria")
        btnPrev.setAttribute("class", "slick-prev slick-arrow")

        imgCategoria.setAttribute("src", categoria.img_url)
        nameCategoria.textContent = categoria.name

        tipoCategoria.appendChild(imgCarrousel)
        imgCarrousel.appendChild(imgCategoria)
        tipoCategoria.appendChild(nameCategoria)

        categoriaMain.appendChild(tipoCategoria)

    })
}

function openModalFilter() {
    modalFilter.classList.add('mostrar')

    modalFilter.addEventListener("click", (e) => {
        if (e.target.id == "button-fechar" || e.target.className == modalFilter.className) {
            modalFilter.classList.remove('mostrar')
        }
    })
}

function openModalPerfil() {
    modalPerfil.classList.add('mostrar');

    modalPerfil.addEventListener("click", (e) => {
        console.log(e.target.className);
        modalPerfil.classList.remove('mostrar')
    })
}

if (btnPerfil != null) {
    btnPerfil.addEventListener("click", openModalPerfil)
    btnFilter.addEventListener("click", openModalFilter)
}

window.addEventListener("load", () => {
    valueRangePessoa.textContent = 'Até ' + rangePessoa.value + ' pessoa(s)';
})
window.addEventListener("load", () => {
    valueRangeDistancia.textContent = 'Até ' + rangeDistancia.value + 'km';
})

rangePessoa.addEventListener('change', (e) => {
    valueRangePessoa.textContent = 'Até ' + e.target.value + ' pessoa(s)';
})
rangeDistancia.addEventListener('change', (e) => {
    valueRangeDistancia.textContent = 'Até ' + e.target.value + 'km';
})
