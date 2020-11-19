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

function mostrarData(){
    // Obtém a data
    var data = new Date();

    var localdate = data.getDate() + `/` + (data.getMonth()+1) + `/` + data.getFullYear();
    document.getElementById("date-reserva").innerHTML = localdate;
}
function initTime(){
  setInterval(mostrarData, 1000);
}

function carregaDescricao() {
  
  fetch(`http://localhost:8080/restaurante/6`)
    .then(res => res.json())
    .then(descricao => {

      console.log(descricao)
      console.log(imageRestaurante)
      imageRestaurante.style.backgroundImage = `url('../../${descricao.img_estabelecimento}')`;
      nomeRestaurante.textContent = descricao.nome;
      categoriaRestaurante.textContent = descricao.categoria.tipo_categoria;
      enderecoRestaurante.textContent = descricao.endereco.logradouro + ", " + descricao.endereco.numero;
      horarioFuncionamento.textContent = descricao.hora_funcionamento;
      descricaoRestaurante.textContent = descricao.descricao;

      descricao.horario.forEach(values => {
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

        caixaHorario.setAttribute("class", "box-horario");

        divIcone.setAttribute("class", "icon-horario col-horario");
        iconeRelogio.setAttribute("class", "fas fa-clock icon-clock");

        divHorario.setAttribute("class", "horario-reserva col-horario");
        paragrafoHora.setAttribute("id", "hour-reserva");
        paragrafoHora.textContent = `${values.horario_de.slice(-8,-3)} às ${values.horario_ate.slice(-8,-3)}`

        caixaVagas.setAttribute("class", "vagas col-horario");
        tituloVaga.textContent = 'Vagas Disponivéis';
        qtdVagas.setAttribute("id", "qtd-vagas");
        qtdVagas.textContent = `${values.vagas_at_moment}`

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
      // console.log(descricao)
    })
}

window.addEventListener("load", carregaDescricao)