const nomeUsuario = document.getElementById("name")
const dtNasc = document.getElementById("dt_nasc")
const cpfUsuario = document.getElementById("cpf")
const wppUsuario = document.getElementById("whatsapp")
const emailUsuario = document.getElementById("email")
const password = document.getElementById("password")
const btnArrowBack = document.getElementById("btn-arrow-header")

const btnSubmit = document.getElementById("submit-user")

$("#whatsapp").mask("(00) 00000-0000");
$("#cpf").mask("000.000.000-00");

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault()

  let bodyDados = {
    nome: nomeUsuario.value,
    dt_nasc: dtNasc.value,
    email: emailUsuario.value,
    telefone: wppUsuario.value,
    cpf: cpfUsuario.value,
    senha: password.value,
    img_perfil: localStorage.getItem("myreserve-usr-img")
  }

  localStorage.removeItem("myreserve-usr-img")

  cadastraUser(bodyDados)
})

function cadastraUser(obj) {

  fetch("https://myreserve-pi.herokuapp.com/usuario", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then((res) => {
      console.log("Enviado com sucesso")
      exibeAlert(true)
    })
    .catch(err => {
      console.log("Erro ao cadastrar", err)
      exibeAlert(false)
    })

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

function exibeAlert(exibe) {
  if (exibe) {
    Swal.fire({
      icon: 'success',
      title: 'Deu tudo certo!',
      text: "Seu cadastro foi realizado.",
      showConfirmButton: false,
      timer: 3500,
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Opss... Ocorreu algum problema!',
      text: "Não foi possível realizar seu cadastro, tente novamente.",
      showConfirmButton: false,
      timer: 4500,
    })
  }
}

btnArrowBack.addEventListener("click", () => {
  window.location.href = "../../../index.html"
})