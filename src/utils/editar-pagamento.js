// Pega o modal
const modalPag = document.getElementById("myModal-pagamento");

// Pega o botão que irá abrir o modal
const btnPag = document.getElementById("myBtn-pag");

// Pega a tag que irá fechar o modal
const spanPag = document.getElementsByClassName("close-btn-pag")[0];

// Quando clicar, abre o modal 
btnPag.onclick = function () {
    modalPag.style.display = "block";
}

// Quando clicar, fecha o modal
spanPag.onclick = function () {
    modalPag.style.display = "none";
}

// mostrar senha - inicio
function mostrar(e) {
    var tipo = e.parentNode.querySelector("[name='senha']");
    if (tipo.type == "password") {
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }

    tipo.type = tipo.type; //aplica o tipo que ficou no primeiro campo

    if (e.classList.contains("glyphicon-eye-close")) { //se tem olho fechado
        e.classList.remove("glyphicon-eye-close"); //remove classe olho fechado
        e.classList.add("glyphicon-eye-open"); //coloca classe olho aberto
    } else {
        e.classList.remove("glyphicon-eye-open"); //remove classe olho aberto
        e.classList.add("glyphicon-eye-close"); //coloca classe olho fechado
    }
}
// mostrar senha - fim