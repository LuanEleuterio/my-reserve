const btnReserva = document.querySelector("#btn-reserva")
const btnVolta = document.querySelector("#btn-arrow-header")
const voltaHomeLogo = document.querySelector("#logo-cli")

if (btnReserva != null) {
    btnReserva.addEventListener("click", () => {
        window.location.href = '../historico-reserva/historico-reserva.html'
    })
}

if (btnVolta != null) {
    setTimeout(() => {
        btnVolta.addEventListener("click", () => {
            window.location.href = "javascript:history.back()"
        })
    }, 50);

}

if (voltaHomeLogo != null) {
    voltaHomeLogo.addEventListener("click", () => {
        window.location.href = "../home/home.html"
    })
}

