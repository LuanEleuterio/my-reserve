// Pega o modal
const modalNotFound = document.getElementById("myModal-not-found");
const modalLocation = document.querySelector(".model-conteiner-lcl");
const btnNotFound = document.getElementById("myBtn-loc");
const cepAtNow = document.getElementById("cep")
const logradouroLoc = document.getElementById("logradouro")
const cidadeLoc = document.getElementById("localidade")
const numeroLoc = document.getElementById("numero")
const enderecoAtNow = document.getElementById("seu-endereco")
const btnSubmitLoc = document.getElementById("submit-location")

function openModalLocation() {
  modalNotFound.classList.add('mostrar')
  let anyLocVazio = (cepAtNow.value == "" && logradouroLoc.value == "" && cidadeLoc.value == "" && numeroLoc.value == "") ? false : true
  modalNotFound.addEventListener("click", (e) => {
    if ((e.target.className == "close-btnn-lcl" || e.target.className == modalNotFound.className) && anyLocVazio) {
      modalNotFound.classList.remove('mostrar')
    }
  })
}

btnNotFound.addEventListener("click", openModalLocation)

btnSubmitLoc.addEventListener("click", (e) => {
  e.preventDefault()

  enderecoAtNow.textContent = `${logradouroLoc.value}, ${numeroLoc.value}`

  modalNotFound.classList.remove('mostrar')
})

window.addEventListener("load", () => {
  if (cepAtNow.value === "") {
    openModalLocation()
  }
})
