const conteinerRestaurantes = document.querySelector('.conteudo-restaurantes')
const categoriaMain = document.querySelector('.categorias-main')
const filterRedirect = document.querySelector('.filter-mobile')
const btnVerMais = document.querySelector("#btn-ver-mais")

const modalNotFound = document.getElementById("myModal-not-found");
const modalLocation = document.querySelector(".model-conteiner-lcl");
const btnNotFound = document.getElementById("myBtn-loc");
const cepAtNow = document.getElementById("cep")
const logradouroLoc = document.getElementById("logradouro")
const cidadeLoc = document.getElementById("localidade")
const numeroLoc = document.getElementById("numero")
const enderecoAtNow = document.getElementById("seu-endereco")
const btnSubmitLoc = document.getElementById("submit-location")

const modalFilter = document.querySelector('.modal-conteiner-filter')
const modalPerfil = document.querySelector('.modal-conteiner-perfil')
const btnFilter = document.querySelector('.btn-filter')
const btnPerfil = document.querySelector('#btn-perfil')
const rangePessoa = document.querySelector('#range-pessoa')
const rangeDistancia = document.querySelector('#range-distancia')
const valueRangePessoa = document.querySelector('#value-range-pessoas')
const valueRangeDistancia = document.querySelector('#value-range-distancia')
const btnArrowBack = document.querySelector("#btn-arrow-header")

const searchBar = document.getElementById("search-bar")
const iconSearch = document.getElementById("icon-search")

var numPageMax = 0
var proxPage = 0
var idIncrement = 0

//Busca restaurantes na Api
function carregaRestaurantes(numPage, deleteElements, url = null) {
    if (url == "" || url == null) {
        url = `https://myreserve-pi.herokuapp.com/restaurante?page=${numPage}`
    }

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

            let haveItens
            let arrRests
            if (restaurantes.content === undefined) {
                haveItens = Object.entries(restaurantes).length
                arrRests = restaurantes
            } else {
                haveItens = Object.entries(restaurantes.content).length
                arrRests = restaurantes.content
            }

            if (haveItens > 0) {
                const filterRestaurante = arrRests.filter((obj) => {
                    return obj.max_pessoas <= localStorage.getItem("myreserve-filter-people")
                })
                async function filterForEach() {

                    for await (rest of filterRestaurante) {
                        let enderecoRest = `${rest.endereco.cidade}, ${rest.endereco.logradouro} - ${rest.endereco.numero}`
                        //let userKmFilter = parseInt(localStorage.getItem("myreserve-filter-distance"))
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
                    restaurenteContainer.setAttribute("data-km", restaurante.kilometers.toFixed(1))
                    restaurantes.setAttribute("class", "restaurantes");

                    fotoRestaurante.setAttribute("class", "foto-restaurante");
                    imgRestaurante.setAttribute("src", restaurante.img_estabelecimento);

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
                        distancia.textContent = `${restaurante.kilometers.toFixed(1)} km`
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
                    newEvent.addEventListener("click", () => { redirectInfoRest(newEvent.attributes[2].value, newEvent.attributes[3].value) })

                    idIncrement++
                })
            }
        }).catch(err => console.log(err))

}

//Busca categorias na API
window.addEventListener("load", () => {

    fetch("https://myreserve-pi.herokuapp.com/categoria", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
        }
    })
        .then(res => res.json())
        .then(categorias => {
            categorias.forEach(categoria => {
                tipoCategoria = document.createElement("a");
                imgCarrousel = document.createElement("figure");
                imgCategoria = document.createElement("img");
                nameCategoria = document.createElement("span");

                tipoCategoria.setAttribute("class", "tipo-categoria")
                tipoCategoria.setAttribute("data-value", categoria.id_categoria)
                tipoCategoria.setAttribute("id", "category-" + categoria.id_categoria)
                imgCarrousel.setAttribute("class", "img-carrousel")
                imgCategoria.setAttribute("class", "img-categoria")
                nameCategoria.setAttribute("class", "name-categoria")

                imgCategoria.setAttribute("src", categoria.img_categoria)
                nameCategoria.textContent = categoria.tipo_categoria

                tipoCategoria.appendChild(imgCarrousel)
                imgCarrousel.appendChild(imgCategoria)
                tipoCategoria.appendChild(nameCategoria)

                categoriaMain.appendChild(tipoCategoria)

                const newEvent = document.getElementById(`category-${categoria.id_categoria}`)
                newEvent.addEventListener("click", () => { buscaPorCategoria(newEvent.attributes[1].value) })


            })
            /*
            const categoriasMenu = document.getElementsByClassName('tipo-categoria')
            for (let i = 0; i < categoriasMenu.length; i++) {
                (function (index) {
                    categoriasMenu[index].addEventListener("click", function () {
                        console.log(categoriasMenu[index].attributes[1].value)
                        buscaPorCategoria(categoriasMenu[index].attributes[1].value)
                    })
                })(i)
            }
            */
            montaCarrouselSlick()
        })
        .catch(err => console.log(err))
})

function montaCarrouselSlick() {
    $('.categorias-main').slick({

        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1
                }
            },
            ,
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1365,
                settings: {
                    slidesToShow: 7,
                    infinite: true,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

}

function buscaPorCategoria(dataValue) {
    let url = `https://myreserve-pi.herokuapp.com/restaurante/categoria/${parseInt(dataValue)}`
    carregaRestaurantes(0, true, url)
}

function buscaPorNome() {
    let url
    searchBar.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && searchBar.value != "") {
            url = `https://myreserve-pi.herokuapp.com/restaurante/byNome?nome=${searchBar.value}`
            carregaRestaurantes(0, true, url)
        }
    })

    iconSearch.addEventListener("click", () => {
        if (searchBar.value != "") {
            url = `https://myreserve-pi.herokuapp.com/restaurante/byNome?nome=${searchBar.value}`
            carregaRestaurantes(0, true, url)
        }
    })
}

btnVerMais.addEventListener("click", () => {
    proxPage++
    if (proxPage <= numPageMax) {
        carregaRestaurantes(proxPage)
    }
})

filterRedirect.addEventListener("click", () => {
    window.location.href = '../filtro-mobile/filtro-mobile.html'
})

function openModalLocation() {
    modalNotFound.classList.add('mostrar')

    cepAtNow.value = localStorage.getItem("myreserve-usr-cep")
    numeroLoc.value = localStorage.getItem("myreserve-usr-numero")
    logradouroLoc.value = localStorage.getItem("myreserve-usr-logradouro")
    cidadeLoc.value = localStorage.getItem("myreserve-usr-cidade")

    let anyLocVazio = (cepAtNow.value == "" && logradouroLoc.value == "" && cidadeLoc.value == "" && numeroLoc.value == "") ? false : true

    modalNotFound.addEventListener("click", (e) => {
        if ((e.target.className == "close-btnn-lcl" || e.target.className == modalNotFound.className) && anyLocVazio) {
            modalNotFound.classList.remove('mostrar')
        }
    })
}

btnNotFound.addEventListener("click", openModalLocation)

btnSubmitLoc.addEventListener("click", (e) => {
    e.preventDefault()

    let anyLocVazio = (logradouroLoc.value == "" && cidadeLoc.value == "" && numeroLoc.value == "") ? false : true

    if (anyLocVazio) {
        enderecoAtNow.textContent = `${logradouroLoc.value}, ${numeroLoc.value} - ${cidadeLoc.value}`
        localStorage.setItem("myreserve-usr-location", `${logradouroLoc.value}, ${numeroLoc.value} - ${cidadeLoc.value}`)
        localStorage.setItem("myreserve-usr-cidade", cidadeLoc.value)
        localStorage.setItem("myreserve-usr-logradouro", logradouroLoc.value)
        localStorage.setItem("myreserve-usr-numero", numeroLoc.value)
        localStorage.setItem("myreserve-usr-cep", cepAtNow.value)
        modalNotFound.classList.remove('mostrar')
        carregaRestaurantes(0, true)
    }
})

window.addEventListener("load", () => {
    setTimeout(() => {
        if (localStorage.getItem("myreserve-usr-location") == null) {
            openModalLocation()
        } else {
            enderecoAtNow.textContent = localStorage.getItem("myreserve-usr-location")
            carregaRestaurantes(0)
        }
    }, 1000);

})

function openModalPerfil() {
    modalPerfil.classList.add('mostrar');

    modalPerfil.addEventListener("click", (e) => {
        modalPerfil.classList.remove('mostrar')
    })
}

if (btnPerfil != null) {
    btnPerfil.addEventListener("click", openModalPerfil)
}
if (btnFilter != null) {
    btnFilter.addEventListener("click", () => {
        modalFilter.classList.add('mostrar')
    })
}

//Event Listener Modal Filter
window.addEventListener("load", () => {
    modalFilter.addEventListener("click", (e) => {
        let bPessoa = false;
        let bDistance = false
        if (e.target.id == "button-fechar" || e.target.className == modalFilter.className) {
            modalFilter.classList.remove('mostrar')
            if (valueRangePessoa.attributes[2] !== undefined) {
                bPessoa = parseInt(localStorage.getItem("myreserve-filter-people")) != parseInt(valueRangePessoa.attributes[2].value)
                localStorage.setItem("myreserve-filter-people", valueRangePessoa.attributes[2].value)
            }
            if (valueRangeDistancia.attributes[2] !== undefined) {
                bDistance = parseInt(localStorage.getItem("myreserve-filter-distance")) != parseInt(valueRangeDistancia.attributes[2].value)
                localStorage.setItem("myreserve-filter-distance", valueRangeDistancia.attributes[2].value)
            }

            if (bPessoa || bDistance) {
                carregaRestaurantes(0, true)
            }
        }
    })
})

if (btnArrowBack != null) {
    btnArrowBack.addEventListener("click", () => {
        localStorage.setItem("myreserve-filter-people", valueRangePessoa.attributes[2].value)
        localStorage.setItem("myreserve-filter-distance", valueRangeDistancia.attributes[2].value)
    })
}

window.addEventListener("load", () => {
    if (localStorage.getItem("myreserve-filter-people") != null) {
        valueRangePessoa.textContent = localStorage.getItem("myreserve-filter-people");
        rangePessoa.setAttribute("value", localStorage.getItem("myreserve-filter-people"))
    } else {
        valueRangePessoa.textContent = rangePessoa.value;
        localStorage.setItem("myreserve-filter-people", rangePessoa.value)
    }
})
window.addEventListener("load", () => {
    if (localStorage.getItem("myreserve-filter-distance") != null) {
        valueRangeDistancia.textContent = localStorage.getItem("myreserve-filter-distance") + 'km';
        rangeDistancia.setAttribute("value", localStorage.getItem("myreserve-filter-distance"))
    } else {
        valueRangeDistancia.textContent = rangeDistancia.value + 'km';
        localStorage.setItem("myreserve-filter-distance", rangeDistancia.value)
    }
})

rangePessoa.addEventListener('change', (e) => {
    valueRangePessoa.textContent = e.target.value;
    valueRangePessoa.setAttribute("data-value", e.target.value)
})
rangeDistancia.addEventListener('change', (e) => {
    valueRangeDistancia.textContent = e.target.value + 'km';
    valueRangeDistancia.setAttribute("data-value", e.target.value)
})

async function calculaDistance(estabLocation) {
    let usrLocation = `${localStorage.getItem("myreserve-usr-cidade")}, ${localStorage.getItem("myreserve-usr-location")} - ${localStorage.getItem("myreserve-usr-numero")}`
    let distance
    const getDistanceMatrix = (service, data) => new Promise((resolve, reject) => {
        service.getDistanceMatrix(data, (response, status) => {
            if (status === 'OK') {
                resolve(response)
            } else {
                reject(response);
            }
        })
    });

    getDistance = async (start, end) => {
        const origin = usrLocation
        const final = estabLocation
        const service = new google.maps.DistanceMatrixService();
        const result = await getDistanceMatrix(
            service,
            {
                origins: [origin],
                destinations: [final],
                travelMode: 'DRIVING'
            }
        )
        return {
            distance: result.rows[0].elements[0].distance
        };
    };
    distance = await getDistance()

    return distance
}

function redirectInfoRest(dataValue, dataDistance) {
    localStorage.setItem("myreserve-identifier-rest", dataValue)
    localStorage.setItem("myreserve-estab-distance", dataDistance)
    window.location.href = '../info-restaurante/info-restaurante.html'
}

window.addEventListener("load", buscaPorNome)

//window.addEventListener("load", carregaRestaurantes(0))