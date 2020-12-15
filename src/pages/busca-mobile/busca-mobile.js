const conteinerRestaurantes = document.querySelector('.conteudo-restaurantes')
const categoriaMain = document.querySelector('.categorias-main')

const searchBar = document.getElementById("search-bar")
const iconSearch = document.getElementById("icon-search")

var idIncrement = 0

function carregaRestaurantes(deleteElements, url = null) {

    fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
        }
    }).then(res => res.json())
        .then(async (restaurantes) => {
            numPageMax = restaurantes.totalPages
            if (deleteElements) {
                let restaurantesConteiners = document.querySelectorAll(".restaurante-container")
                for (let i = 0; i < restaurantesConteiners.length; i++) {
                    if (restaurantesConteiners[i].parentNode) {
                        restaurantesConteiners[i].parentNode.removeChild(restaurantesConteiners[i])
                    }
                }
            }

            let haveItens = Object.entries(restaurantes).length
            let arrRests = restaurantes

            if (haveItens > 0) {
                const filterRestaurante = arrRests.filter((obj) => {
                    return obj.max_pessoas <= localStorage.getItem("myreserve-filter-people")
                })
                async function filterForEach() {

                    for await (rest of filterRestaurante) {
                        let enderecoRest = `${rest.endereco.cidade}, ${rest.endereco.logradouro} - ${rest.endereco.numero}`
                        let distance
                        let estabKm

                        async function getKm() {
                            let getDistance = async (start, end) => {
                                let d = await calculaDistance(enderecoRest)
                                return d.distance.value
                            };
                            const d = await getDistance()
                            return d
                        }

                        distance = await getKm()

                        estabKm = distance / 1000

                        rest.kilometers = parseFloat(estabKm.toFixed(2))
                    }
                }

                await filterForEach()

                const restaurantesFiltered = filterRestaurante.filter((obj) => {
                    return obj.kilometers <= parseInt(localStorage.getItem("myreserve-filter-distance"))
                })

                restaurantesFiltered.forEach(restaurante => {
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
                    restaurantes.setAttribute("class", "restaurantes");

                    fotoRestaurante.setAttribute("class", "foto-restaurante");
                    imgRestaurante.setAttribute("src", "../../../myreserve/" + restaurante.img_estabelecimento);

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
                    if (restaurante.kilometers < 1) {
                        distancia.textContent = `<1km`
                    } else {
                        distancia.textContent = `${restaurante.kilometers}km`
                    }
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
            }
        }).catch(err => console.log(err))

}

function carregaCategorias() {

    fetch(`https://myreserve-pi.herokuapp.com/categoria`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
        }
    })
        .then(res => res.json())
        .then(categoria => {

            btnPrev = document.createElement("button")

            const jsonOrdenado = categoria.sort(function (a, b) {
                return a.img_categoria < b.img_categoria ? -1 : a.img_categoria > b.img_categoria ? 1 : 0;
            })

            jsonOrdenado.forEach(values => {
                tipoCategoria = document.createElement("a");
                imgCarrousel = document.createElement("figure");
                imgCategoria = document.createElement("img");
                nameCategoria = document.createElement("span");

                tipoCategoria.setAttribute("class", "tipo-categoria")
                tipoCategoria.setAttribute("data-value", values.id_categoria)
                imgCarrousel.setAttribute("class", "img-carrousel")
                imgCategoria.setAttribute("class", "img-categoria")
                nameCategoria.setAttribute("class", "name-categoria")
                btnPrev.setAttribute("class", "slick-prev slick-arrow")

                imgCategoria.setAttribute("src", values.img_categoria)
                nameCategoria.textContent = values.tipo_categoria;

                tipoCategoria.appendChild(imgCarrousel)
                imgCarrousel.appendChild(imgCategoria)
                tipoCategoria.appendChild(nameCategoria)

                categoriaMain.appendChild(tipoCategoria)
            })

            const categoriasMenu = document.getElementsByClassName('tipo-categoria')
            for (let i = 0; i < categoriasMenu.length; i++) {
                (function (index) {
                    categoriasMenu[index].addEventListener("click", function () {
                        buscaPorCategoria(categoriasMenu[index].attributes[1].value)
                    })
                })(i)
            }
        })
}

function buscaPorCategoria(dataValue) {
    let url = `https://myreserve-pi.herokuapp.com/restaurante/categoria/${parseInt(dataValue)}`
    carregaRestaurantes(true, url)
}

function buscaPorNome() {
    let url
    searchBar.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && searchBar.value != "") {
            url = `https://myreserve-pi.herokuapp.com/restaurante/byNome?nome=${searchBar.value}`
            carregaRestaurantes(true, url)
        }
    })

    iconSearch.addEventListener("click", () => {
        if (searchBar.value != "") {
            url = `https://myreserve-pi.herokuapp.com/restaurante/byNome?nome=${searchBar.value}`
            carregaRestaurantes(true, url)
        }
    })
}

function redirectInfoRest(dataValue) {
    localStorage.setItem("myreserve-identifier-rest", dataValue)
    window.location.href = '../info-restaurante/info-restaurante.html'
}


window.addEventListener("load", buscaPorNome)
//window.addEventListener("load", carregaRestaurantes)
window.addEventListener("load", carregaCategorias)