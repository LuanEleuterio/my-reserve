// Pega o modal
var modalPag = document.getElementById("myModal-pagamento");

// Pega o botão que irá abrir o modal
var btnPag = document.getElementById("myBtn-pag-rest");

// Pega a tag que irá fechar o modal
var spanPag = document.getElementsByClassName("btn-pag")[0];

// Quando clicar, abre o modal 
btnPag.onclick = function () {
  modalPag.style.display = "flex";
}

// Quando clicar, fecha o modal
spanPag.onclick = function () {
  modalPag.style.display = "none";
}