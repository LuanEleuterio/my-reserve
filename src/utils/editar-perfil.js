// Pega o modal
const modalEditar = document.getElementById("myModal-editar");

// Pega o botão que irá abrir o modal
const btnEditar = document.getElementById("myBtn-editar");

// Pega a tag que irá fechar o modal
const spanEditar = document.getElementsByClassName("close-btn-editar")[0];
const submitEditar = document.getElementById("submit-editar")

const fotoPerfil = document.getElementById("foto-perfil")
const cpfPerfil = document.getElementById("cpf-editar")
const telefonePerfil = document.getElementById("whatsapp-editar")
const namePerfil = document.getElementById("name-editar")
const emailPerfil = document.getElementById("email-editar")
const passwordPerfil = document.getElementById("password-editar")

// Quando clicar, abre o modal 
if (btnEditar != null) {
    btnEditar.onclick = function () {
        modalEditar.style.display = "block";
    }
}

// Quando clicar, fecha o modal
if (spanEditar != null) {
    spanEditar.onclick = function () {
        modalEditar.style.display = "none";
    }
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
if (btnEditar != null) {
    btnEditar.addEventListener("click", carregaDados)
}

if (submitEditar != null) {
    submitEditar.addEventListener("click", (e) => {
        e.preventDefault()

        let bodyDados

        if (passwordPerfil.value == "") {
            bodyDados = {
                nome: namePerfil.value,
                telefone: telefonePerfil.value,
                email: emailPerfil.value
            }
        } else {
            bodyDados = {
                nome: namePerfil.value,
                telefone: telefonePerfil.value,
                email: emailPerfil.value,
                senha: passwordPerfil.value
            }
        }

        fetch(`https://myreserve-pi.herokuapp.com/usuario/${localStorage.getItem("myreserve-usr-identifier")}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyDados)
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText)
            } else {
                exibeAlert(true)
                return res.json()
            }
        }).then(response => {
            localStorage.setItem("myreserve-usr-email", response.email)
            modalEditar.style.display = "none";
        }).catch(err => {
            console.log("error", err)
            exibeAlert(true)
        })
    })
}

function carregaDados() {
    fetch(`https://myreserve-pi.herokuapp.com/usuario/${localStorage.getItem("myreserve-usr-identifier")}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
        }
    })
        .then(res => res.json())
        .then(user => {
            /* if (localStorage.getItem("myreserve-usr-identifier") == null) {
                 localStorage.setItem("myreserve-usr-identifier", user.id_usuario)
             }*/
            fotoPerfil.setAttribute("src", user.img_perfil)
            namePerfil.setAttribute("value", user.nome)
            cpfPerfil.setAttribute("value", user.cpf)
            telefonePerfil.setAttribute("value", user.telefone)
            emailPerfil.setAttribute("value", user.email)
        })
}

if (window.innerWidth < 769) {
    window.addEventListener("load", carregaDados)
}

function exibeAlert(exibe) {
    if (exibe) {
        Swal.fire({
            icon: 'success',
            title: 'Dados alterados!',
            showConfirmButton: false,
            timer: 2500,
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Opss... Ocorreu algum problema!',
            text: "Não foi possível alterar seus dados, tente novamente.",
            showConfirmButton: false,
            timer: 5000,
        })
    }
}
