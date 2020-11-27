const footerHome = document.querySelector("#footer-home")
const footerSearch = document.querySelector("#footer-search")
const footerReserva = document.querySelector("#footer-reserva")
const footerPerfil = document.querySelector("#footer-perfil")


footerHome.addEventListener("click", () => {
    window.location.href = '../home/home.html'
})

footerSearch.addEventListener("click", () => {
    window.location.href = '../busca-mobile/busca-mobile.html'
})

footerReserva.addEventListener("click", () => {
    window.location.href = '../historico-reserva/historico-reserva.html'
})

footerPerfil.addEventListener("click", () => {
    window.location.href = '../cliente-perfil/perfil.html'
})



