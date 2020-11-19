const conteinerRestaurantes = document.querySelector('.conteudo-restaurantes')
const categoriaMain = document.querySelector('.categorias-main')
const filterRedirect = document.querySelector('.filter-mobile')
const locationInput = document.querySelector(".location-input")
const btnVerMais = document.querySelector("#btn-ver-mais")

var numPageMax = 0
var proxPage = 0
var idIncrement = 0

//Busca restaurantes na Api
function carregaRestaurantes(numPage) {
    fetch(`http://localhost:8080/restaurante?page=${numPage}`)
        .then(res => res.json())
        .then(restaurantes => {
            numPageMax = restaurantes.totalPages
            restaurantes.content.forEach(restaurante => {
                restaurenteContainer = document.createElement("a");
                restaurantes = document.createElement("div");

                fotoRestaurante = document.createElement("div");
                imgRestaurante = document.createElement("img");

                infoRestaurante = document.createElement("div");
                nomeRestaurante = document.createElement("p");

                categoriaInfo = document.createElement("div");
                iconCategoria = document.createElement("i");
                nomeCategoria = document.createElement("p");

                distanceInfo = document.createElement("div");
                iconDistance = document.createElement("i");
                distancia = document.createElement("p");

                infoNumeroPessoas = document.createElement("div");
                numeroPessoas = document.createElement("div");
                qtdPessoas = document.createElement("p");
                iconPessoas = document.createElement("i");

                restaurenteContainer.setAttribute("class", "restaurante-container");
                restaurenteContainer.setAttribute("id", "rest-" + idIncrement)
                restaurenteContainer.setAttribute("data-value", restaurante.id_estabelecimento)
                //restaurenteContainer.setAttribute("href", "../info-restaurante/info-restaurante.html")
                restaurantes.setAttribute("class", "restaurantes");

                fotoRestaurante.setAttribute("class", "foto-restaurante");
                imgRestaurante.setAttribute("src", "../../" + restaurante.img_estabelecimento);

                infoRestaurante.setAttribute("class", "info-restaurante");
                nomeRestaurante.setAttribute("class", "nome-restaurante infos");
                nomeRestaurante.textContent = restaurante.nome;

                categoriaInfo.setAttribute("class", "categoria infos");
                iconCategoria.setAttribute("class", "fas fa-utensils col-1");
                nomeCategoria.setAttribute("class", "categoria")
                nomeCategoria.textContent = restaurante.categoria.tipo_categoria;

                distanceInfo.setAttribute("class", "distance infos")
                iconDistance.setAttribute("class", "fas fa-route col-1");
                distancia.setAttribute("class", "distancia")
                distancia.textContent = '2km';

                infoNumeroPessoas.setAttribute("class", "info-num-pessoas");
                numeroPessoas.setAttribute("class", "numero-pessoas");
                qtdPessoas.setAttribute("class", "quantidade-pessoa");
                iconPessoas.setAttribute("class", "fas fa-user-friends icon-pessoa");
                qtdPessoas.textContent = restaurante.max_pessoas;

                restaurenteContainer.appendChild(restaurantes);
                restaurantes.appendChild(fotoRestaurante);
                fotoRestaurante.appendChild(imgRestaurante);

                restaurantes.appendChild(infoRestaurante);
                infoRestaurante.appendChild(nomeRestaurante);
                infoRestaurante.appendChild(categoriaInfo);
                categoriaInfo.appendChild(iconCategoria);
                categoriaInfo.appendChild(nomeCategoria);

                infoRestaurante.appendChild(distanceInfo);
                distanceInfo.appendChild(iconDistance);
                distanceInfo.appendChild(distancia);

                restaurantes.appendChild(infoNumeroPessoas);
                infoNumeroPessoas.appendChild(numeroPessoas);
                numeroPessoas.appendChild(qtdPessoas);
                numeroPessoas.appendChild(iconPessoas);

                conteinerRestaurantes.appendChild(restaurenteContainer);
                const newEvent = document.getElementById(`rest-${idIncrement}`)
                newEvent.addEventListener("click", () => { redirectInfoRest(newEvent.attributes[2].value) })

                idIncrement++
            })

        }).catch(err => console.log(err))

}
//Busca categorias na API
window.addEventListener("load", () => {

    fetch("http://localhost:8080/categoria")
        .then(res => res.json())
        .then(categorias => {

            categorias.forEach(categoria => {
                tipoCategoria = document.createElement("a");
                imgCarrousel = document.createElement("figure");
                imgCategoria = document.createElement("img");
                nameCategoria = document.createElement("span");

                tipoCategoria.setAttribute("class", "tipo-categoria")
                tipoCategoria.setAttribute("data-value", categoria.id_categoria)
                imgCarrousel.setAttribute("class", "img-carrousel")
                imgCategoria.setAttribute("class", "img-categoria")
                nameCategoria.setAttribute("class", "name-categoria")

                imgCategoria.setAttribute("src", "../../file" + categoria.img_categoria)
                nameCategoria.textContent = categoria.tipo_categoria

                tipoCategoria.appendChild(imgCarrousel)
                imgCarrousel.appendChild(imgCategoria)
                tipoCategoria.appendChild(nameCategoria)

                categoriaMain.appendChild(tipoCategoria)

            })

            const categoriasMenu = document.getElementsByClassName('tipo-categoria')
            for (let i = 0; i < categoriasMenu.length; i++) {
                (function (index) {
                    categoriasMenu[index].addEventListener("click", function () {
                        console.log(categoriasMenu[index])
                    })
                })(i)
            }

        })
        .catch(err => console.log(err))


})
//-

function redirectInfoRest(dataValue) {
    console.log("id " + dataValue)
    localStorage.setItem("myreserve-identifier-rest", dataValue)
    window.location.href = '../info-restaurante/info-restaurante.html'
}

window.addEventListener("load", carregaRestaurantes(0))

btnVerMais.addEventListener("click", () => {
    proxPage++
    if (proxPage <= numPageMax) {
        carregaRestaurantes(proxPage)
    }
})

filterRedirect.addEventListener("click", () => {
    window.location.href = '../filtro-mobile/filtro-mobile.html'
})

locationInput.addEventListener("click", () => {
    if (window.innerWidth < 769) {
        // window.location.href = '../localizacao-mobile/localizacao.html'
    }
})
