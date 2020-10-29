const modalConfigHour = document.querySelector(".modal-config-hour")
const btnHorario = document.querySelectorAll(".button-horario")
const modalHourReserva = document.querySelector("#hour-reserva-modal")


function openModalConfig(event) {
    modalConfigHour.classList.add('mostrar')
    modalHourReserva.innerText = event.target.innerText;
    modalConfigHour.addEventListener("click", (e) => {
        if (e.target.id == "button-fechar" || e.target.className == modalConfigHour.className) {
            modalConfigHour.classList.remove('mostrar')
        }
    })
}


for (let i = 0; i < btnHorario.length; i++) {
    btnHorario[i].addEventListener("click", (event) => {
        openModalConfig(event)
    })
}
