const voltaHomeRestaurante = document.querySelector("#logo-rest")
const btnVoltaRest = document.querySelector("#btn-arrow-header")

if (voltaHomeRestaurante != null) {
    voltaHomeRestaurante.addEventListener("click", () => {
        window.location.href = "../home-restaurante/home-restaurante.html"
    })
}

if (btnVoltaRest != null) {
    btnVoltaRest.addEventListener("click", () => {
        window.location.href = "javascript:history.back()"
    })
}
