const btnConfirmar = document.querySelector(".btn-confirmar")
const hourReserva = document.getElementById("hour-reserva")
const qtdVagas = document.getElementById("qtd-vagas")
const qtdPessoa = document.getElementById("ipt-qtd-pessoa")
function carregaHorariosMobile() {

    fetch(`https://myreserve-pi.herokuapp.com/horario/${localStorage.getItem("myreserve-hour-identifier")}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("myreserve-usr-token")}`
        }
    })
        .then(res => res.json())
        .then(horario => {
            hourReserva.innerText = `${horario.horario_de.slice(-8, -3)} às ${horario.horario_ate.slice(-8, -3)}`
            qtdVagas.innerText = horario.vagas_at_moment
        })
}

btnConfirmar.addEventListener("click", () => {

    let bodyDados = {
        valor_reserva: 7.50,
        qtd_pessoa: parseInt(qtdPessoa.value),
        fk_usuario: parseInt(localStorage.getItem("myreserve-usr-identifier")),
        fk_estabelecimento: parseInt(localStorage.getItem("myreserve-identifier-rest")),
        fk_horario: parseInt(localStorage.getItem("myreserve-hour-identifier"))
    }

    fetch("https://myreserve-pi.herokuapp.com/reserva/requisita", {
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
            return res.json()
        }
    }).then(reserva => {
        if (reserva) {
            exibeAlertMobile(true)
        } else {
            exibeAlertMobile(false)
        }
    }).catch(err => {
        exibeAlertMobile(false)
        console.log(err)
    })

    //
})

window.addEventListener("load", carregaHorariosMobile)

function exibeAlertMobile(exibe) {
    if (exibe) {
        Swal.fire({
            icon: 'success',
            title: 'A reserva foi feita com sucesso.',
            showConfirmButton: false,
            timer: 3500,
        }).then(result => window.location.href = '../info-horarios/info-horarios.html')
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Não foi possível fazer a reserva.',
            showConfirmButton: false,
            timer: 2500,
        })
    }
}