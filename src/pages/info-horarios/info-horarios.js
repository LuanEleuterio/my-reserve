const btnHourMobile = document.getElementsByClassName("btn-hour-mobile");
const containerHorario = document.querySelector(".conteiner-horario")


function carregaHorariosMobile() {

    fetch(`https://myreserve-pi.herokuapp.com/restaurante/${localStorage.getItem("myreserve-identifier-rest")}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
        }
    })
        .then(res => res.json())
        .then(descricao => {

            // Ordenando array
            const jsonOrdenado = descricao.horario.sort(function (a, b) {
                return a.horario_de < b.horario_de ? -1 : a.horario_de > b.horario_de ? 1 : 0;
            })

            const onlyHourAtivo = jsonOrdenado.filter((obj) => {
                return obj.ativo == true
            })

            var btnsHours = document.querySelectorAll(".button-horario")

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

                botaoHorario.setAttribute("class", "button-horario btn-hour-mobile");
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

            const blockHorario = document.getElementsByClassName("button-horario");

            for (let i = 0; i < blockHorario.length; i++) {

                (function (index) {
                    blockHorario[index].addEventListener("click", function () {
                        localStorage.setItem("myreserve-hour-identifier", blockHorario[index].attributes[2].value)
                        window.location.href = '../confirmar-reserva/confirmar-reserva.html'
                    })

                })(i)
            }
        })
}

for (let i = 0; i < btnHourMobile.length; i++) {
    (function (index) {
        btnHourMobile[index].addEventListener("click", function () {
            window.location.href = '../confirmar-reserva/confirmar-reserva.html'
        })
    })(i)
}

function mostrarData() {
    // Obtém a data
    var data = new Date();

    var localdate = data.getDate() + `/` + (data.getMonth() + 1) + `/` + data.getFullYear();
    document.getElementById("date-reserva").innerHTML = localdate;
}

function initTime() {
    setInterval(mostrarData, 1000);
}

window.addEventListener("load", initTime)
window.addEventListener("load", carregaHorariosMobile)


