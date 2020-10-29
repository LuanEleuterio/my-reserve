const footerHome = document.querySelector("#footer-home")
const footerSearch = document.querySelector("#footer-search")
const footerReserva = document.querySelector("#footer-reserva")
const footerPerfil = document.querySelector("#footer-perfil")


footerHome.addEventListener("click", () => {
    console.log("clicou")
    window.location.href = '../home/home.html'
})

footerSearch.addEventListener("click", () => {
    console.log(footerHome)
    //window.location.href = '../buscar-mobile/buscar-mobile.html'
})

footerReserva.addEventListener("click", () => {
    window.location.href = '../historico-reserva/historico-reserva.html'
})

footerPerfil.addEventListener("click", () => {
    window.location.href = '../perfil-cliente/perfil-cliente.html'
})



