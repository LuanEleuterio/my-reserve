const modalConfigHour = document.querySelector(".modal-config-hour")
const btnHorario = document.querySelectorAll(".button-horario")
const modalHourReserva = document.querySelector("#hour-reserva-modal")
const maxPessoas = document.getElementById("total-pessoa-reserva")
const totalVagas = document.getElementById("total-vagas-horario")
const horarioDe = document.getElementById("horario-de")
const horarioAte = document.getElementById("horario-ate")
const maxPessoasModal = document.getElementById("total-pessoa-reserva-modal")
const totalVagasModal = document.getElementById("total-vagas-horario-modal")
const horaDeModal = document.getElementById("horario-de-modal")
const horaAteModal = document.getElementById("horario-ate-modal")
const submitHorario = document.getElementById("submit-horario")
const submitModal = document.getElementById("submit-modal")
const btnCancelHour = document.getElementById("cancel-btn-modal")
const conteinerHorario = document.querySelector(".conteiner-horario")
const btnModalEstab = document.getElementById("submit-mod-perfil")
const modalCategoria = document.getElementById("categoria-option")
const fieldSet = document.getElementById("fieldSet-ModalPerfil")
var idHour

function carregaHorarios() {
  fetch(`https://myreserve-pi.herokuapp.com/horario/byEstab/${localStorage.getItem("myreserve-usr-identifier")}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    }
  })
    .then(res => res.json())
    .then(horarios => {
      const hourOrdenado = horarios.sort(function (a, b) {
        return a.horario_de < b.horario_de ? -1 : a.horario_de > b.horario_de ? 1 : 0;
      })

      const onlyHourAtivo = hourOrdenado.filter((obj) => {
        return obj.ativo == true
      })

      var buttonsHours = document.querySelectorAll(".button-horario")

      for (let i = 0; i < buttonsHours.length; i++) {
        if (buttonsHours[i].parentNode) {
          buttonsHours[i].parentNode.removeChild(buttonsHours[i])
        }
      }

      onlyHourAtivo.forEach(horario => {
        buttonHorario = document.createElement("button");

        boxHorario = document.createElement("div");

        divIcone = document.createElement("div")
        iconeRelogio = document.createElement("i");

        divHorario = document.createElement("div");
        horaDeAte = document.createElement("p");

        iconEdit = document.createElement("i")

        buttonHorario.setAttribute("class", "button-horario")
        buttonHorario.setAttribute("data-value", horario.id_horario)
        boxHorario.setAttribute("class", "box-horario-info")
        divIcone.setAttribute("class", "icon-horario col-horario")
        iconeRelogio.setAttribute("class", "fas fa-clock icon-clock");
        iconEdit.setAttribute("class", "fas fa-cog icon-edit")
        divHorario.setAttribute("class", "horario-reserva col-horario")
        horaDeAte.setAttribute("class", "hour-reserva")

        horaDeAte.innerText = `${horario.horario_de.slice(-8, -3)} às ${horario.horario_ate.slice(-8, -3)}`

        divIcone.appendChild(iconeRelogio)
        divHorario.appendChild(horaDeAte)

        boxHorario.appendChild(divIcone)
        boxHorario.appendChild(divHorario)
        boxHorario.appendChild(iconEdit)

        buttonHorario.appendChild(boxHorario)

        conteinerHorario.appendChild(buttonHorario)

      })

      const blockHorario = document.querySelectorAll(".button-horario")
      for (let i = 0; i < blockHorario.length; i++) {

        (function (index) {
          blockHorario[index].addEventListener("click", function () {
            modalConfigHour.classList.add('mostrar')
            modalHourReserva.innerText = blockHorario[index].innerText;
            idHour = parseInt(blockHorario[index].attributes[1].value)
            totalVagasModal.setAttribute("value", onlyHourAtivo[index].total_vagas)
            maxPessoasModal.setAttribute("value", localStorage.getItem("myreserve-estab-max-people"))
            horaDeModal.setAttribute("value", onlyHourAtivo[index].horario_de.slice(-8, -3))
            horaAteModal.setAttribute("value", onlyHourAtivo[index].horario_ate.slice(-8, -3))
            modalConfigHour.addEventListener("click", (e) => {
              if (e.target.id == "button-fechar" || e.target.className == modalConfigHour.className) {
                modalConfigHour.classList.remove('mostrar')
              }
            })
          })
        })(i)
      }
    })
}
function openModalConfig(event) {
  modalConfigHour.classList.add('mostrar')
  modalHourReserva.innerText = event.target.innerText;
  modalConfigHour.addEventListener("click", (e) => {
    if (e.target.id == "button-fechar" || e.target.className == modalConfigHour.className) {
      modalConfigHour.classList.remove('mostrar')
    }
  })
}

for (let i = 0; i < btnHorario.length; i++) {
  btnHorario[i].addEventListener("click", (event) => {
    openModalConfig(event)
  })
}

submitHorario.addEventListener("click", (e) => {
  e.preventDefault()

  const bodyDados = {
    total_vagas: parseInt(totalVagas.value),
    qtd_pessoa_vaga: parseInt(maxPessoas.value),
    horario_de: horarioDe.value,
    horario_ate: horarioAte.value,
    fk_estabelecimento: parseInt(localStorage.getItem("myreserve-usr-identifier"))
  }

  fetch("https://myreserve-pi.herokuapp.com/horario", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    },
    body: JSON.stringify(bodyDados)
  }).then(res => {
    if (!res.ok) {
      throw Error(res.statusText)
    } else {
      exibeAlertConfig(true, "Horario cadastrado!")
      carregaHorarios()
    }
  }).catch(err => {
    console.log(err)
    exibeAlertConfig(false, "Não foi possível cadastrar o horário.")
  })
})

submitModal.addEventListener("click", (e) => {
  e.preventDefault()

  const bodyDados = {
    total_vagas: parseInt(totalVagasModal.value),
    qtd_pessoa_vaga: parseInt(maxPessoas.value),
    horario_de: horaDeModal.value,
    horario_ate: horaAteModal.value,
    //fk_estabelecimento: parseInt(localStorage.getItem("myreserve-usr-identifier"))
  }

  fetch(`https://myreserve-pi.herokuapp.com/horario/altera?idHour=${idHour}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    },
    body: JSON.stringify(bodyDados)
  }).then(res => {
    console.log(res.json())
    if (!res.ok) {
      throw Error(res.statusText)
    } else {
      exibeAlertConfig(true, "Horário alterado!")
      carregaHorarios()
    }
  }).catch(err => {
    console.log(err)
    exibeAlertConfig(false, "Não foi possível altrar o horário.")
  })
})

btnCancelHour.addEventListener("click", (e) => {
  e.preventDefault()

  fetch(`https://myreserve-pi.herokuapp.com/horario/${idHour}`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    }
  }).then(res => {
    if (!res.ok) {
      throw Error(res.statusText)
    } else {
      exibeAlertConfig(true, "Horário excluído!")
      carregaHorarios()
    }
  }).catch(err => {
    console.log(err)
    exibeAlertConfig(false, "Não foi possível excluir o horário")
  })
})

window.addEventListener("load", () => {
  fetch(`https://myreserve-pi.herokuapp.com/restaurante/${localStorage.getItem("myreserve-usr-identifier")}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    }
  })
    .then(res => res.json())
    .then(estab => {
      localStorage.setItem("myreserve-estab-max-people", estab.max_pessoas)
      maxPessoas.setAttribute("value", estab.max_pessoas)
      carregaHorarios()
    })
    .catch(err => console.log("Ocorreu algum problema", err))
})


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

    document.getElementById("categoria-option").value = data.categoria.id_categoria

    document.getElementById("foto-perfil").setAttribute("src", data.img_estabelecimento)
    document.getElementById("name").value = data.nome
    document.getElementById("cnpj").value = data.cnpj
    document.getElementById("email").value = data.email

    document.getElementById("horarioDe").value = data.hora_funcionamento.slice(0, 5)
    document.getElementById("horarioAte").value = data.hora_funcionamento.slice(11, 16)
    document.getElementById("qtdPessoa").value = data.max_pessoas

    document.getElementById("story").value = data.descricao

    const telefoneOrderById = data.telefone.sort(function (a, b) {
      return a.id_telefone < b.id_telefone ? -1 : a.id_telefone > b.id_telefone ? 1 : 0;
    })

    let nTel = 0
    telefoneOrderById.forEach((telefone) => {
      nTel++
      modalBlock = document.getElementsByClassName("modal-content")
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


btnModalEstab.addEventListener("click", () => {
  event.preventDefault()
  let objEstab = {}

  if (document.getElementById("password").value == "") {

    objEstab = {
      fk_categoria: document.getElementById("categoria-option").value,
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
      fk_categoria: document.getElementById("categoria-option").value,
      nome: document.getElementById("name").value,
      cnpj: document.getElementById("cnpj").value,
      email: document.getElementById("email").value,
      max_pessoas: document.getElementById("qtdPessoa").value,
      senha: document.getElementById("password").value,
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
      exibeAlertConfig(true, "Informacoes salvas.")
      return res.json()
    }
  }).catch(err => {
    exibeAlertConfig(false, "Nao foi possivel alterar.")
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

function exibeAlertConfig(exibe, msg) {
  if (exibe) {
    Swal.fire({
      icon: 'success',
      title: `${msg}`,
      showConfirmButton: false,
      timer: 1500,
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: `${msg}`,
      showConfirmButton: false,
      timer: 3000,
    })
  }
}