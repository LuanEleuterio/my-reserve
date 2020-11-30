const modalCategoria = document.getElementById("categoria-option")
const btnModalEstab = document.getElementById("submit-salvar")
const fieldSet = document.getElementById("fieldSet")

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

function carregaDados() {
  fetch("https://myreserve-pi.herokuapp.com/categoria", {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      const categoriaRestaurante = data

      categoriaRestaurante.forEach(tipos => {
        opt = document.createElement('option');
        opt.value = tipos.id_categoria
        opt.innerHTML = tipos.tipo_categoria;
        opt.setAttribute("data-values", tipos.id_categoria)
        modalCategoria.appendChild(opt)
      })

    })

  fetch(`https://myreserve-pi.herokuapp.com/restaurante/${localStorage.getItem('myreserve-usr-identifier')}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("foto-restaurante").setAttribute("src", data.img_estabelecimento)
      document.getElementById("categoria-option").value = data.categoria.id_categoria

      document.getElementById("name").value = data.nome
      document.getElementById("cnpj").value = data.cnpj
      document.getElementById("email").value = data.email
      document.getElementById("story").value = data.descricao
      document.getElementById("qtdPessoa").value = data.max_pessoas
      document.getElementById("horarioDe").value = data.hora_funcionamento.slice(0, 5)
      document.getElementById("horarioAte").value = data.hora_funcionamento.slice(-5)

      const telefoneOrderById = data.telefone.sort(function (a, b) {
        return a.id_telefone < b.id_telefone ? -1 : a.id_telefone > b.id_telefone ? 1 : 0;
      })

      let nTel = 0
      telefoneOrderById.forEach((telefone) => {
        nTel++
        divField = document.createElement("div")
        labelTelefone = document.createElement("label")
        inputTelefone = document.createElement("input")

        divField.setAttribute("class", "field")
        labelTelefone.setAttribute("for", "telefone-" + nTel)
        labelTelefone.innerText = "Telefone " + nTel;

        inputTelefone.setAttribute("id", "telefone-" + nTel)
        inputTelefone.setAttribute("type", "text")
        inputTelefone.setAttribute("name", "telefone-" + nTel)
        inputTelefone.setAttribute("placeholder", "(xx) xxxxx-xxxx")
        inputTelefone.setAttribute("data-value", telefone.id_telefone)
        inputTelefone.setAttribute("value", `${telefone.ddd}${telefone.numero}`)

        divField.appendChild(labelTelefone)
        divField.appendChild(inputTelefone)

        fieldSet.appendChild(divField)
      })
    })

}

btnModalEstab.addEventListener("click", (event) => {
  event.preventDefault()
  let objEstab = {}

  if (document.getElementById("password").value == "") {

    objEstab = {
      fk_categoria: parseInt(document.getElementById("categoria-option").value),
      nome: document.getElementById("name").value,
      cnpj: document.getElementById("cnpj").value,
      email: document.getElementById("email").value,
      max_pessoas: document.getElementById("qtdPessoa").value,
      hora_funcionamento: document.getElementById("horarioDe").value + " às " + document.getElementById("horarioAte").value,
      descricao: document.getElementById("story").value
    }
  }
  if (document.getElementById("password").value != "") {

    objEstab = {
      fk_categoria: parseInt(document.getElementById("categoria-option").value),
      nome: document.getElementById("name").value,
      cnpj: document.getElementById("cnpj").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("password").value,
      max_pessoas: document.getElementById("qtdPessoa").value,
      hora_funcionamento: document.getElementById("horarioDe").value + " às " + document.getElementById("horarioAte").value,
      descricao: document.getElementById("story").value
    }
  }

  fetch(`https://myreserve-pi.herokuapp.com/restaurante/${localStorage.getItem('myreserve-usr-identifier')}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    },
    body: JSON.stringify(objEstab)
  }).then(res => {
    if (!res.ok) {
      throw Error(res.statusText)
    } else {
      montaObjTelefone()
      exibeAlertMobileRest(true)
      return res.json()
    }
  }).catch(err => {
    exibeAlertMobileRest(false)
    console.log(err)
  })
})

function montaObjTelefone() {
  const telefoneOne = document.getElementById("telefone-1")
  const telefoneSecond = document.getElementById("telefone-2")

  let px = 1;
  do {
    if (px === 1) {
      dddTel = telefoneOne.value.substr(0, 2)
      numeroTel = telefoneOne.value.substr(2)
      idTel = parseInt(telefoneOne.attributes[4].value)
    } else {
      dddTel = telefoneSecond.value.substr(0, 2)
      numeroTel = telefoneSecond.value.substr(2)
      idTel = parseInt(telefoneSecond.attributes[4].value)
      px = 3
    }

    let bodyDadosTelefone = {
      ddd: dddTel,
      numero: numeroTel,
    }

    console.log(bodyDadosTelefone)
    console.log(idTel)

    cadastraTelefone(bodyDadosTelefone, idTel)

    if (telefoneSecond != null && telefoneSecond.value != "" && px < 2) {
      px = 2
    } else {
      px = 3
    }

  } while (px <= 2)
}

function cadastraTelefone(obj, idTel) {
  fetch(`https://myreserve-pi.herokuapp.com/telefone/${idTel}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    },
    body: JSON.stringify(obj)
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText)
      }
    })
    .catch(err => {
      console.log("Erro ao cadastrar telefone", err)
    })
}

window.addEventListener("load", carregaDados)

function exibeAlertMobileRest(exibe) {
  if (exibe) {
    Swal.fire({
      icon: 'success',
      title: 'Os dados foram alterados',
      showConfirmButton: false,
      timer: 3500,
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Não foi possível alterar os dados',
      showConfirmButton: false,
      timer: 2500,
    })
  }
}