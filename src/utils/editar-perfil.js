// Pega o modal
const modalEditar = document.getElementById("myModal-editar");

// Pega o botão que irá abrir o modal
const btnEditar = document.getElementById("myBtn-editar");

// Pega a tag que irá fechar o modal
const spanEditar = document.getElementsByClassName("close-btn-editar")[0];

// Quando clicar, abre o modal 
btnEditar.onclick = function () {
    modalEditar.style.display = "block";
}

// Quando clicar, fecha o modal
spanEditar.onclick = function () {
    modalEditar.style.display = "none";
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