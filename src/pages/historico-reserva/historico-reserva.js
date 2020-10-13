const conteinerRestaurantes = document.querySelector('.conteudo-restaurantes')
const modalFilter = document.querySelector('.modal-conteiner-filter')
const modalPerfil = document.querySelector('.modal-conteiner-perfil')
const btnFilter = document.querySelector('.btn-filter')
const btnPerfil = document.querySelector('#btn-perfil')
const rangePessoa = document.querySelector('#range-pessoa')
const rangeDistancia = document.querySelector('#range-distancia')
const valueRangePessoa = document.querySelector('#value-range-pessoas')
const valueRangeDistancia = document.querySelector('#value-range-distancia');
const testeT = document.querySelector('#btn-edit-perfil')
const categoriaMain = document.querySelector('.categorias-main')


function carregaRestaurantes() {
    const allRestaurantes = listaRestaurantes;

    allRestaurantes.forEach(values => {
        restaurenteContainer = document.createElement("a");
        restaurantes = document.createElement("div");

        fotoRestaurante = document.createElement("div");
        imgRestaurante = document.createElement("img");

        infoRestaurante = document.createElement("div");
        nomeRestaurante = document.createElement("p");

        restaurenteContainer.setAttribute("class", "restaurante-container");
        restaurantes.setAttribute("class", "restaurantes");

        fotoRestaurante.setAttribute("class", "foto-restaurante");
        imgRestaurante.setAttribute("src", values.img_url);

        infoRestaurante.setAttribute("class", "info-restaurante");
        nomeRestaurante.setAttribute("class", "nome-restaurante infos");
        nomeRestaurante.textContent = values.name;


        restaurenteContainer.appendChild(restaurantes);
        restaurantes.appendChild(fotoRestaurante);
        fotoRestaurante.appendChild(imgRestaurante);

        restaurantes.appendChild(infoRestaurante);
        infoRestaurante.appendChild(nomeRestaurante);

        conteinerRestaurantes.appendChild(restaurenteContainer);


    });

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

btnPerfil.addEventListener("click", openModalPerfil)
btnFilter.addEventListener("click", openModalFilter)
//window.addEventListener("load", carregaRestaurantes)


window.addEventListener("load", () => {
    valueRangePessoa.textContent = rangePessoa.value;
})
window.addEventListener("load", () => {
    valueRangeDistancia.textContent = rangeDistancia.value + 'km';
})

rangePessoa.addEventListener('change', (e) => {
    valueRangePessoa.textContent = e.target.value;
})
rangeDistancia.addEventListener('change', (e) => {
    valueRangeDistancia.textContent = e.target.value + 'km';
})
