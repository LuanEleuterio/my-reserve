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
window.addEventListener("load", carregaReservas)


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
