// Pega o modal
var modalNotFound = document.getElementById("myModal-not-found");

// Pega o botão que irá abrir o modal
var btnNotFound = document.getElementById("myBtn-loc");

// Pega a tag que irá fechar o modal
var spanCloseNf = document.getElementsByClassName("close-btnn-lcl")[0];

// Quando clicar, abre o modal 
btnNotFound.onclick = function () {
  modalNotFound.style.display = "block";
  modal.style.display = "none";
}

// Quando clicar, fecha o modal
spanCloseNf.onclick = function () {
  modalNotFound.style.display = "none";
}