// Pega o modal
var modal = document.getElementById("myModal");

// Pega o botão que irá abrir o modal
var btn = document.getElementById("myBtn");

// Pega a tag que irá fechar o modal
var span = document.getElementsByClassName("close-btn")[0];

// Quando clicar, abre o modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// Quando clicar, fecha o modal
span.onclick = function () {
  modal.style.display = "none";
}