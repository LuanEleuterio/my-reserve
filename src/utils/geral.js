const btnReserva = document.querySelector("#btn-reserva")
const btnVolta = document.querySelector("#btn-arrow-header")


btnReserva.addEventListener("click", () => {
    window.location.href = '../historico-reserva/historico-reserva.html'
})

btnVolta.addEventListener("click", () => {
    window.location.href = "javascript:history.back()"
})