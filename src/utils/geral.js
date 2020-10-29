const btnReserva = document.querySelector("#btn-reserva")
const btnVolta = document.querySelector("#btn-arrow-header")
const voltaHomeLogo = document.querySelector("#logo-cli")

if (btnReserva != null) {
    btnReserva.addEventListener("click", () => {
        window.location.href = '../historico-reserva/historico-reserva.html'
    })
}

btnVolta.addEventListener("click", () => {
    window.location.href = "javascript:history.back()"
})

voltaHomeLogo.addEventListener("click", () => {
    window.location.href = "../home/home.html"
})

