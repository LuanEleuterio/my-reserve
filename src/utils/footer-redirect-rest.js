const footerHome = document.querySelector("#footer-home")
const footerReserva = document.querySelector("#footer-reserva")
const footerPerfil = document.querySelector("#footer-perfil")

/*
footerHome.addEventListener("click", () => {
    console.log("clicou")
    window.location.href = '../home/home.html'
})*/

footerReserva.addEventListener("click", () => {
    window.location.href = '../home-restaurante/home-restaurante.html'
})

footerPerfil.addEventListener("click", () => {
    window.location.href = '../restaurante-perfil/perfil.html'
})



