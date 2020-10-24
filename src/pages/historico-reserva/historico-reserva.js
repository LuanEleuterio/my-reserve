const conteinerRestaurantes = document.querySelector('.conteudo-restaurantes')

function carregaReservas() {
    const allReservas = listaReservas;

    allReservas.forEach(values => {
        restaurantes = document.createElement("div");

        fotoRestaurante = document.createElement("div");
        imgRestaurante = document.createElement("img");

        infoRestaurante = document.createElement("div");
        nomeRestaurante = document.createElement("p");
        dataReserva = document.createElement("p");
        hourReserva = document.createElement("p");
        statusReserva = document.createElement("p");

        buttonsOption = document.createElement("div")
        btnVerRestaurante = document.createElement("button")
        btnCancelar = document.createElement("button")

        // restaurenteContainer.setAttribute("class", "restaurante-container");
        restaurantes.setAttribute("class", "restaurantes");

        fotoRestaurante.setAttribute("class", "foto-restaurante");
        imgRestaurante.setAttribute("src", values.img_url);

        infoRestaurante.setAttribute("class", "info-restaurante");
        nomeRestaurante.setAttribute("class", "nome-restaurante");
        nomeRestaurante.textContent = values.name_restaurante;
        dataReserva.setAttribute("class", "data-reserva col-info");
        dataReserva.textContent = values.date_reserva;
        hourReserva.setAttribute("class", "hour-reserva col-info");
        hourReserva.textContent = values.hour_reserva;
        statusReserva.setAttribute("class", "status-reserva col-info");
        statusReserva.textContent = "Status: " + values.status_reserva;

        buttonsOption.setAttribute("class", "btns-option")
        btnVerRestaurante.setAttribute("class", "btn-ver-restaurante col-btn")
        btnCancelar.setAttribute("class", "btn-cancelar col-btn")
        btnVerRestaurante.textContent = "Visitar"
        btnCancelar.textContent = "Cancelar"

        restaurantes.appendChild(fotoRestaurante);
        fotoRestaurante.appendChild(imgRestaurante);

        restaurantes.appendChild(infoRestaurante);
        infoRestaurante.appendChild(nomeRestaurante);
        infoRestaurante.appendChild(dataReserva);
        infoRestaurante.appendChild(hourReserva);
        infoRestaurante.appendChild(statusReserva);

        restaurantes.appendChild(buttonsOption)
        buttonsOption.appendChild(btnVerRestaurante)
        if (values.status_reserva == "Reservado") { buttonsOption.appendChild(btnCancelar) }

        conteinerRestaurantes.appendChild(restaurantes);


    });

    /*Inicio modal cancelar*/

    const btnModalCancelar = document.getElementsByClassName("btn-cancelar")
    const modalCancelar = document.getElementById("modal-cancelar")

    for (let i = 0; i < btnModalCancelar.length; i++) {

        (function (index) {
            btnModalCancelar[index].addEventListener("click", function () {

                modalCancelar.classList.add("mostrar")

            })
        })(i)
    }

    modalCancelar.addEventListener("click", function (e) {

        if (e.target.className == modalCancelar.className || e.target.id == "button-fechar") {
            modalCancelar.classList.remove("mostrar")
        }

    })

    /*Fim modal cancelar*/
}

window.addEventListener("load", carregaReservas)






