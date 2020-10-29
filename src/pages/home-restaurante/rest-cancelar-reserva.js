// Pega o modal
var modalCancel = document.getElementById("myModal-cancel");

// Pega o botão que irá abrir o modal
var btnCancel = document.getElementById("myBtn-cancel");

// Pega a tag que irá fechar o modal
var spanCancel = document.getElementsByClassName("btn-cancel")[0];
// Quando clicar, abre o modal 
btnCancel.onclick = function () {
  modalCancel.style.display = "flex";
}

// Quando clicar, fecha o modal
spanCancel.onclick = function () {
  modalCancel.style.display = "none";
}