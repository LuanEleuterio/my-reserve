const modalConfigHour = document.querySelector(".modal-config-hour")
const btnHorario = document.querySelector("#btn-horario")

function openModalConfig() {
    modalConfigHour.classList.add('mostrar')
    console.log(modalConfigHour)
    modalConfigHour.addEventListener("click", (e) => {
        if (e.target.id == "button-fechar" || e.target.className == modalConfigHour.className) {
            modalConfigHour.classList.remove('mostrar')
        }
    })
}


btnHorario.addEventListener("click", openModalConfig)