const conteinerReservas = document.querySelector('.conteudo-reserva')
const phourReserva = document.getElementById("hour-reserva")
const pDataReserva = document.getElementById("data-reserva")
const snNomeRestaurante = document.querySelector(".snNomeRestaurante")
const btnConfirmaCancel = document.querySelector(".btnConfirmarCancelamento")
var idReserva

function carregaReservas() {

    fetch(`https://myreserve-pi.herokuapp.com/reserva/byUser/${localStorage.getItem("myreserve-usr-identifier")}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
        }
    })
        .then(res => res.json())
        .then(reservas => {
            reservas.sort(function (a, b) {
                return a.data_reserva > b.data_reserva ? -1 : a.data_reserva < b.data_reserva ? 1 : 0;
            })

            const onlyReservaAtivas = reservas.filter((obj) => {
                return obj.status_reserva === "Reservado"
            })

            reservas.forEach(reserva => {
                reservasConteiner = document.createElement("div");

                dateReserva = document.createElement("div")
                dataReserva = document.createElement("div");
                dataInfo = document.createElement("p");

                infoReserva = document.createElement("div");
                nomeRestaurante = document.createElement("p");
                hourReserva = document.createElement("p");
                statusReserva = document.createElement("p");

                buttonsOption = document.createElement("div")
                btnVerRestaurante = document.createElement("button")
                btnCancelar = document.createElement("button")

                // restaurenteContainer.setAttribute("class", "restaurante-container");
                reservasConteiner.setAttribute("class", "reservas");
                reservasConteiner.setAttribute("data-value", reserva.id_reserva)

                dataReserva.setAttribute("class", "date-reserva")
                dataReserva.setAttribute("class", "data-reserva")
                infoReserva.setAttribute("class", "info-restaurante");
                nomeRestaurante.setAttribute("class", "nome-restaurante");
                nomeRestaurante.textContent = reserva.estab;
                dataInfo.setAttribute("class", "data-info");
                dataInfo.textContent = FormataStringData(reserva.data_reserva);
                hourReserva.setAttribute("class", "hour-reserva col-info");
                hourReserva.textContent = `${reserva.horario.horario_de.slice(-8, -3)} - ${reserva.horario.horario_ate.slice(-8, -3)}`;
                statusReserva.setAttribute("class", "status-reserva col-info");
                statusReserva.textContent = "Status: " + reserva.status_reserva;

                buttonsOption.setAttribute("class", "btns-option")
                btnVerRestaurante.setAttribute("class", "btn-ver-restaurante col-btn")
                btnVerRestaurante.setAttribute("data-value", reserva.fk_estabelecimento)
                btnCancelar.setAttribute("class", "btn-cancelar col-btn")
                btnVerRestaurante.textContent = "Visitar"
                btnCancelar.textContent = "Cancelar"

                reservasConteiner.appendChild(dateReserva)
                reservasConteiner.appendChild(infoReserva);
                dataReserva.appendChild(dataInfo)
                dateReserva.appendChild(dataReserva)
                infoReserva.appendChild(nomeRestaurante);
                infoReserva.appendChild(hourReserva);
                infoReserva.appendChild(statusReserva);

                reservasConteiner.appendChild(buttonsOption)
                buttonsOption.appendChild(btnVerRestaurante)
                if (reserva.status_reserva == "Reservado") { buttonsOption.appendChild(btnCancelar) }

                conteinerReservas.appendChild(reservasConteiner);
            });

            const btnModalCancelar = document.getElementsByClassName("btn-cancelar")
            const modalCancelar = document.getElementById("modal-cancelar")

            for (let i = 0; i < btnModalCancelar.length; i++) {

                (function (index) {
                    btnModalCancelar[index].addEventListener("click", function () {
                        modalCancelar.classList.add("mostrar")
                        snNomeRestaurante.innerText = onlyReservaAtivas[index].estab
                        pDataReserva.innerText = FormataStringData(onlyReservaAtivas[index].data_reserva)
                        phourReserva.innerText = onlyReservaAtivas[index].horario.horario_de.slice(-8, -3) + " às " + onlyReservaAtivas[index].horario.horario_ate.slice(-8, -3)
                        idReserva = onlyReservaAtivas[index].id_reserva
                    })
                })(i)
            }
        }).catch(err => console.log("Ocorrou um erro ", err))


}

function modalCancelar() {

    /*Inicio modal cancelar*/

    //const btnModalCancelar = document.getElementsByClassName("btn-cancelar")
    const modalCancelar = document.getElementById("modal-cancelar")

    /*
    for (let i = 0; i < btnModalCancelar.length; i++) {
    
        (function (index) {
            btnModalCancelar[index].addEventListener("click", function () {
                modalCancelar.classList.add("mostrar")
            })
        })(i)
    }*/

    modalCancelar.addEventListener("click", function (e) {

        if (e.target.className == modalCancelar.className || e.target.id == "button-fechar") {
            modalCancelar.classList.remove("mostrar")
        }

    })
}

function modalVisitar() {
    const btnVisitar = document.getElementsByClassName("btn-ver-restaurante")

    for (let i = 0; i < btnVisitar.length; i++) {

        (function (index) {
            btnVisitar[index].addEventListener("click", function () {
                window.location.href = '../info-restaurante/info-restaurante.html'
            })
        })(i)
    }

}

function FormataStringData(d) {
    var dia = d.split("-")[0];
    var mes = d.split("-")[1];
    var ano = d.split("-")[2];

    return ano + '/' + ("0" + mes).slice(-2) + '/' + ("0" + dia).slice(-2);
}

btnConfirmaCancel.addEventListener("click", () => {
    const bodyCancel = {
        fk_reserva: idReserva
    }

    fetch("https://myreserve-pi.herokuapp.com/cancel-justifica", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
        },
        body: JSON.stringify(bodyCancel)
    }).then(res => {
        if (!res.ok) {
            throw Error(res.statusText)
        } else {
            return res.json()
        }
    }).then(cancel => {
        if (cancel) {
            exibeAlertCancel(true)
            //modalCancelar.classList.remove("mostrar")
        } else {
            exibeAlertCancel(false)
        }
    }).catch(err => {
        exibeAlertCancel(false)
        console.log(err)
    })
})

window.addEventListener("load", carregaReservas)
window.addEventListener("load", modalVisitar)
window.addEventListener("load", modalCancelar)


function exibeAlertCancel(exibe) {
    if (exibe) {
        Swal.fire({
            icon: 'success',
            title: 'Reserva cancelada!',
            showConfirmButton: false,
            timer: 3500,
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Opss... não foi possível cancelar a reserva!',
            showConfirmButton: false,
            timer: 4500,
        })
    }
}






