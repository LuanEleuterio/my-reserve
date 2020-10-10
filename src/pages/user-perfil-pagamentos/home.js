const conteinerRestaurantes = document.querySelector('.conteudo-restaurantes')
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
        restaurantes.setAttribute("class", "restaurantes");

        fotoRestaurante.setAttribute("class", "foto-restaurante");
        imgRestaurante.setAttribute("src", values.img_url);

        infoRestaurante.setAttribute("class", "info-restaurante");
        nomeRestaurante.setAttribute("class", "nome-restaurante infos");
        nomeRestaurante.textContent = values.name;

        categoriaInfo.setAttribute("class", "categoria infos");
        iconCategoria.setAttribute("class", "fas fa-utensils col-1");
        nomeCategoria.setAttribute("class", "categoria")
        nomeCategoria.textContent = values.category;

        distanceInfo.setAttribute("class", "distance infos")
        iconDistance.setAttribute("class", "fas fa-route col-1");
        distancia.setAttribute("class", "distancia")
        distancia.textContent = '2km';

        infoNumeroPessoas.setAttribute("class", "info-num-pessoas");
        numeroPessoas.setAttribute("class", "numero-pessoas");
        qtdPessoas.setAttribute("class", "quantidade-pessoa");
        iconPessoas.setAttribute("class", "fas fa-user-friends icon-pessoa");
        qtdPessoas.textContent = values.totalPessoas;

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


    });

}

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