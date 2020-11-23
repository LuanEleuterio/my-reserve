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

  cepAtNow.value = localStorage.getItem("myreserve-usr-cep")
  numeroLoc.value = localStorage.getItem("myreserve-usr-numero")
  logradouroLoc.value = localStorage.getItem("myreserve-usr-logradouro")
  cidadeLoc.value = localStorage.getItem("myreserve-usr-cidade")

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

  let anyLocVazio = (logradouroLoc.value == "" && cidadeLoc.value == "" && numeroLoc.value == "") ? false : true

  if (anyLocVazio) {
    enderecoAtNow.textContent = `${logradouroLoc.value}, ${numeroLoc.value} - ${cidadeLoc.value}`
    localStorage.setItem("myreserve-usr-location", `${logradouroLoc.value}, ${numeroLoc.value} - ${cidadeLoc.value}`)
    localStorage.setItem("myreserve-usr-location", `${logradouroLoc.value}, ${numeroLoc.value} - ${cidadeLoc.value}`)
    localStorage.setItem("myreserve-usr-cidade", cidadeLoc.value)
    localStorage.setItem("myreserve-usr-logradouro", logradouroLoc.value)
    localStorage.setItem("myreserve-usr-numero", numeroLoc.value)
    localStorage.setItem("myreserve-usr-cep", cepAtNow.value)
    modalNotFound.classList.remove('mostrar')
  }
})

window.addEventListener("load", () => {
  if (localStorage.getItem("myreserve-usr-location") == null) {
    openModalLocation()
  } else {
    enderecoAtNow.textContent = localStorage.getItem("myreserve-usr-location")
  }
})
