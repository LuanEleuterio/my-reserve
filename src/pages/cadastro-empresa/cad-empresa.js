
const nomeEmpresa = document.getElementById("name")
const emailEmpresa = document.getElementById("email")
const cnpjEmpresa = document.getElementById("cnpj")
const firstTelefoneEmpresa = document.getElementById("telefone_um")
const secondTelefoneEmpresa = document.getElementById("telefone_dois")
const categoriaEmpresa = document.getElementById("categoia")
const horaDe = document.getElementById("hora_de")
const horaAte = document.getElementById("hora_ate")
const maxPessoas = document.getElementById("max-pessoas")
const cepEmpresa = document.getElementById("cep")
const cidadeEmpresa = document.getElementById("localidade")
const ufEmpresa = document.getElementById("uf")
const bairroEmpresa = document.getElementById("bairro")
const logradouroEmpresa = document.getElementById("logradouro")
const numeroEmpresa = document.getElementById("numero")
const fieldSetDados = document.getElementById("fieldset-dados")
const catPeople = document.querySelector(".group-categ-people")
const passWord = document.getElementById("password")
const description = document.getElementById("description")
const btnArrowBack = document.getElementById("btn-arrow-header")
var bodyDadosEndereco = {}

const btnSubmit = document.getElementById("submit-estab")

$("#cep").mask("00000-000");
$("#telefone_um, #telefone_dois").mask("(00) 00000-0000");
$("#cnpj").mask("00.000.000/0000-00");

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

// localização por CEP - start
const cep = document.querySelector("#cep")

const showData = (result) => {
  for (const campo in result) {
    if (document.querySelector("#" + campo)) {
      document.querySelector("#" + campo).value = result[campo]
    }
  }
}

cep.addEventListener("blur", (e) => {
  let search = cep.value.replace("-", "")
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  }

  fetch(`https://viacep.com.br/ws/${search}/json/`, options)
    .then(response => {
      response.json()
        .then(data => showData(data))
    })
    .catch(e => console.log('Deu Erro: ' + e, message))
})
// localização por CEP - end

//Busca categorias na API
window.addEventListener("load", (event) => {

  fetch("https://myreserve-pi.herokuapp.com/categoria")
    .then(res => res.json())
    .then(categorias => {
      const fieldConteiner = document.createElement("div")
      const categoriaLabel = document.createElement("label")
      const selectCategoria = document.createElement("select")

      fieldConteiner.setAttribute("class", "field")
      categoriaLabel.setAttribute("for", "categoria")
      categoriaLabel.textContent = "Categoria:"

      selectCategoria.setAttribute("name", "categoria")
      selectCategoria.setAttribute("id", "categoria-option")

      categorias.forEach(categoria => {
        const options = document.createElement("option")

        options.setAttribute("value", categoria.id_categoria)
        options.textContent = categoria.tipo_categoria

        selectCategoria.appendChild(options)
      })

      fieldConteiner.appendChild(categoriaLabel)
      fieldConteiner.appendChild(selectCategoria)

      catPeople.appendChild(fieldConteiner)
      //fieldSetDados.appendChild(fieldConteiner)

    })
    .catch(err => console.log(err))
})
//------------------------------------

//Envio do cadastro do Estabelecimento p/ a API
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault()

  let optionCategoria = document.getElementById("categoria-option")

  let dddTel
  let numeroTel
  let qtdPessoa = (maxPessoas.value == null) ? 1 : parseInt(maxPessoas.value)
  let horaStart = verificaAmOrPm(horaDe.value)
  let horaFinish = verificaAmOrPm(horaAte.value)
  let horaFunciona = `${horaStart} às ${horaFinish}`
  let exibeAlert = false
  console.log(localStorage.getItem("myreserve-usr-img"))
  let bodyDados = {
    nome: nomeEmpresa.value,
    email: emailEmpresa.value,
    cnpj: cnpjEmpresa.value,
    senha: passWord.value,
    descricao: description.value,
    hora_funcionamento: horaFunciona,
    max_pessoas: qtdPessoa,
    img_estabelecimento: localStorage.getItem("myreserve-usr-img"),
    fk_categoria: parseInt(optionCategoria.value)
  }

  localStorage.removeItem("myreserve-img-perfil")

  const insereEstab = new Promise((resolve, reject) => {
    resolve(cadastraEstab(bodyDados))
  })

  const insereEnd = (obj) => new Promise((resolve, reject) => {
    resolve(cadastraEnderecoEstab(obj))
  })

  const insereEndEstab = async () => {
    try {
      const fkEstab = await insereEstab;
      if (fkEstab.ok) {
        const bodyDadosEndereco = {
          estado: ufEmpresa.value,
          cep: cepEmpresa.value,
          cidade: cidadeEmpresa.value,
          bairro: bairroEmpresa.value,
          logradouro: logradouroEmpresa.value,
          numero: numeroEmpresa.value,
          fk_estabelecimento: fkEstab.idFk
        }

        const okEnd = await insereEnd(bodyDadosEndereco)
        //cadastraEnderecoEstab(bodyDadosEndereco)

        if (okEnd.ok) {
          let px = 1;
          do {
            if (px === 1) {
              dddTel = firstTelefoneEmpresa.value.substr(1, 2)
              numeroTel = firstTelefoneEmpresa.value.substr(5)
            } else {
              dddTel = secondTelefoneEmpresa.value.substr(1, 2)
              numeroTel = secondTelefoneEmpresa.value.substr(5)
              px = 3
            }

            let bodyDadosTelefone = {
              ddd: dddTel,
              numero: numeroTel,
              fk_estabelecimento: fkEstab.idFk
            }

            cadastraTelefoneEstab(bodyDadosTelefone)

            if (secondTelefoneEmpresa.value != "" && px < 2) {
              px = 2
            } else {
              px = 3
            }

          } while (px <= 2)
        }
      }
    }

    catch (err) {
      console.log(err)
      exibeAlert(false)
    }
  }

  insereEndEstab()
})
//-------------------------------------------------------------

btnArrowBack.addEventListener("click", () => {
  window.location.href = "../../../index.html"
})

function verificaAmOrPm(hora) {
  if (hora.substr(0, 2) < 12) {
    hora += "am"
  } else {
    hora += "pm"
  }
  return hora
}

function cadastraEstab(obj) {

  const idEstab = fetch("https://myreserve-pi.herokuapp.com/restaurante", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText)
      } else {
        return res.json()
      }
    })
    .then(id => {
      return { idFk: id, ok: true }
    })
    .catch(err => {
      console.log("Erro ao cadastrar", err)
      exibeAlert(false)
      return { ok: false }
    })

  return idEstab
}

function cadastraEnderecoEstab(obj) {
  const okEndereco = fetch("https://myreserve-pi.herokuapp.com/endereco", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText)
      } else {
        return { ok: true, etapa: 2 }
      }
    })
    .catch(err => {
      console.log("Erro ao cadastrar", err)
      exibeAlert(false)
      desfazCadastro(obj.fkEstab, 2)
      return { ok: false }
    })

  return okEndereco
}

function cadastraTelefoneEstab(obj) {
  fetch("https://myreserve-pi.herokuapp.com/telefone", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText)
      } else {
        exibeAlert(true)

      }
    })
    .catch(err => {
      console.log("Erro ao cadastrar telefone", err)
      exibeAlert(false)
      desfazCadastro(obj.fk_estabelecimento, 3)
    })
}

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

function desfazCadastro(id, etapa) {
  setTimeout(function () {
    fetch(`https://myreserve-pi.herokuapp.com/login/delete?idEstab=${id}&etapa=${etapa}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }, 1500);
}

function redirectToLogin() {
  window.location.href = '../login/login.html'
}