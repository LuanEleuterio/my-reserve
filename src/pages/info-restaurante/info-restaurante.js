const btn_horario = document.getElementsByClassName("button-horario");
const modalHorario = document.getElementById("modal-horario")
const btnVerHorarios = document.querySelector("#btn-ver-horario")

const containerHorario = document.querySelector(".conteiner-horario")

const imageRestaurante = document.getElementById("foto-rest")
const nomeRestaurante = document.getElementById("nome-restaurante")
const categoriaRestaurante = document.getElementById("categoria-restaurante")
const enderecoRestaurante = document.getElementById("endereco-restaurante")
const horarioFuncionamento = document.getElementById("hora-funcionamento")
const descricaoRestaurante = document.getElementById("description")
const distanceEstab = document.getElementById("distance-estab")

const blockHorario = document.getElementsByClassName("button-horario");

const boxModalHorario = document.querySelector(".info-hour-modal")
const horarioReserva = document.getElementById("hour-reserva-modal")
const qtdVagasModal = document.getElementById("qtd-vagas-modal")

const inputPessoas = document.querySelector(".qtdPessoas")
const maxPessoas = document.getElementById("maxPessoas")

const modalSubmitReserva = document.querySelector(".btn-confirmar")
const spanValorReserva = document.getElementById("valor-reserva")

var idHorario
var valorReserva = spanValorReserva.attributes[1].value

for (let i = 0; i < btn_horario.length; i++) {

  (function (index) {
    btn_horario[index].addEventListener("click", function () {
      modalHorario.classList.add("mostrar")
    })
  })(i)
}

modalHorario.addEventListener("click", function (e) {
  if (e.target.className == modalHorario.className || e.target.id == "button-fechar") {
    modalHorario.classList.remove("mostrar")
  }

})

btnVerHorarios.addEventListener("click", () => {
  window.location.href = '../info-horarios/info-horarios.html'
})

function mostrarData() {
  // Obtém a data
  var data = new Date();

  var localdate = data.getDate() + `/` + (data.getMonth() + 1) + `/` + data.getFullYear();
  document.getElementById("date-reserva").innerHTML = localdate;
}

function initTime() {
  setInterval(mostrarData, 1000);
}

function carregaDescricao(option = true) {
  //option serve para quando eu fazer uma reserva, ele recarregar somento os horários
  fetch(`https://myreserve-pi.herokuapp.com/restaurante/${localStorage.getItem("myreserve-identifier-rest")}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    }
  })
    .then(res => res.json())
    .then(descricao => {

      if (option) {
        imageRestaurante.style.backgroundImage = `url('${descricao.img_estabelecimento}')`;
        nomeRestaurante.textContent = descricao.nome;
        categoriaRestaurante.textContent = descricao.categoria.tipo_categoria;
        enderecoRestaurante.textContent = descricao.endereco.logradouro + ", " + descricao.endereco.numero + " - " + descricao.endereco.cidade;
        horarioFuncionamento.textContent = descricao.hora_funcionamento;
        descricaoRestaurante.textContent = descricao.descricao;
        distanceEstab.textContent = `${localStorage.getItem("myreserve-estab-distance")} km`
        maxPessoas.textContent = `Máximo ${descricao.max_pessoas}`
        inputPessoas.setAttribute("max", descricao.max_pessoas)
      }

      // Ordenando array
      const jsonOrdenado = descricao.horario.sort(function (a, b) {
        return a.horario_de < b.horario_de ? -1 : a.horario_de > b.horario_de ? 1 : 0;
      })

      const onlyHourAtivo = jsonOrdenado.filter((obj) => {
        return obj.ativo == true
      })

      let btnsHours = document.querySelectorAll(".button-horario")

      for (let i = 0; i < btnsHours.length; i++) {
        if (btnsHours[i].parentNode) {
          btnsHours[i].parentNode.removeChild(btnsHours[i])
        }
      }

      onlyHourAtivo.forEach(values => {
        botaoHorario = document.createElement("button");

        caixaHorario = document.createElement("div");

        divIcone = document.createElement("div");
        iconeRelogio = document.createElement("i");

        divHorario = document.createElement("div");
        paragrafoHora = document.createElement("p");

        caixaVagas = document.createElement("div");
        spanVagas = document.createElement("span");
        tituloVaga = document.createElement("p");
        qtdVagas = document.createElement("p");

        botaoHorario.setAttribute("class", "button-horario");
        botaoHorario.setAttribute("id", "btn-horario");
        botaoHorario.setAttribute("data-value", values.id_horario)

        caixaHorario.setAttribute("class", "box-horario");

        divIcone.setAttribute("class", "icon-horario col-horario");
        iconeRelogio.setAttribute("class", "fas fa-clock icon-clock");

        divHorario.setAttribute("class", "horario-reserva col-horario");
        paragrafoHora.setAttribute("id", "hour-reserva");
        paragrafoHora.textContent = `${values.horario_de.slice(-8, -3)} às ${values.horario_ate.slice(-8, -3)}`

        caixaVagas.setAttribute("class", "vagas col-horario");
        tituloVaga.textContent = 'Vagas Disponíveis';
        qtdVagas.setAttribute("id", "qtd-vagas");
        qtdVagas.textContent = `${values.vagas_at_moment}`
        if (values.vagas_at_moment === 0) {
          tituloVaga.style.color = "var(--vermelho)"
          qtdVagas.style.color = "var(--vermelho)"
        }

        botaoHorario.appendChild(caixaHorario);

        caixaHorario.appendChild(divIcone);
        divIcone.appendChild(iconeRelogio);

        caixaHorario.appendChild(divHorario);
        divHorario.appendChild(paragrafoHora);

        caixaHorario.appendChild(caixaVagas);
        caixaVagas.appendChild(spanVagas);
        spanVagas.appendChild(tituloVaga);
        spanVagas.appendChild(qtdVagas);
        containerHorario.appendChild(botaoHorario);
      })

      for (let i = 0; i < blockHorario.length; i++) {

        (function (index) {
          blockHorario[index].addEventListener("click", function () {
            modalHorario.style.display = "flex"
            idHorario = onlyHourAtivo[index].id_horario

            horarioReserva.textContent = `${onlyHourAtivo[index].horario_de.slice(-8, -3)} às ${onlyHourAtivo[index].horario_ate.slice(-8, -3)}`
            qtdVagasModal.textContent = `${onlyHourAtivo[index].vagas_at_moment}`

          })

        })(i)
      }

    });

}

modalHorario.addEventListener("click", function (e) {
  if (e.target.id == "button-fechar") {
    modalHorario.style.display = "none";
  }
})

window.addEventListener("load", carregaDescricao)

modalSubmitReserva.addEventListener("click", function () {

  const objReserva = {
    valor_reserva: parseFloat(valorReserva),
    qtd_pessoa: parseInt(inputPessoas.value),
    fk_usuario: parseInt(localStorage.getItem(`myreserve-usr-identifier`)),
    fk_estabelecimento: parseInt(localStorage.getItem(`myreserve-identifier-rest`)),
    fk_horario: idHorario
  }

  fetch("https://myreserve-pi.herokuapp.com/reserva/requisita", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
    },
    body: JSON.stringify(objReserva)
  })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText)
      } else {
        return res.json()
      }
    })
    .then(reserva => {
      if (reserva) {
        exibeAlertReserva(true)
        carregaDescricao(false)
        modalHorario.style.display = "none";
      } else {
        exibeAlertReserva(false)
      }
    })
    .catch(err => {
      exibeAlertReserva(false)
      console.log(err)
    })
})

function exibeAlertReserva(exibe) {
  if (exibe) {
    Swal.fire({
      icon: 'success',
      title: 'A reserva foi feita com sucesso.',
      showConfirmButton: false,
      timer: 3500,
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Não foi possível fazer a reserva.',
      showConfirmButton: false,
      timer: 2500,
    })
  }
}