const containerClientes = document.querySelector('.conteudo-clientes')
const configHourRedirect = document.querySelector("#config-hour-redirect")

function carregaClientes() {
    const allClientes = listaClientes;

    allClientes.forEach(values => {
        clienteContainer = document.createElement("a");
        clientes = document.createElement("div");

        fotoCliente = document.createElement("div");
        imgCliente = document.createElement("img");

        infoCliente = document.createElement("div");
        nomeCliente = document.createElement("p");

        dataInfo = document.createElement("div");
        iconCalendar = document.createElement("i");
        dataText = document.createElement("p");

        hourInfo = document.createElement("div");
        iconRelogio = document.createElement("i");
        hourText = document.createElement("p");

        containerIcons = document.createElement("div");
        numeroPessoas = document.createElement("div");
        qtdPessoas = document.createElement("p");
        iconPessoas = document.createElement("i");

        infoDeletar = document.createElement("div");
        iconRemove = document.createElement("i");

        clienteContainer.setAttribute("class", "cliente-container");
        clientes.setAttribute("class", "clientes");

        fotoCliente.setAttribute("class", "foto-cliente");
        imgCliente.setAttribute("src", values.img_url);

        infoCliente.setAttribute("class", "info-cliente");
        nomeCliente.setAttribute("class", "nome-cliente infos");
        nomeCliente.textContent = values.name;

        dataInfo.setAttribute("class", "data infos");
        iconCalendar.setAttribute("class", "far fa-calendar-check col-1");
        dataText.setAttribute("class", "data")
        dataText.textContent = values.date;

        hourInfo.setAttribute("class", "hourInfo infos")
        iconRelogio.setAttribute("class", "far fa-clock col-1");
        hourText.setAttribute("class", "horario")
        hourText.textContent = '16:30';

        containerIcons.setAttribute("class", "container-icons");
        numeroPessoas.setAttribute("class", "numero-pessoas");
        qtdPessoas.setAttribute("class", "quantidade-pessoa");
        iconPessoas.setAttribute("class", "fas fa-user-friends icon-pessoa");
        qtdPessoas.textContent = values.totalPessoas;

        infoDeletar.setAttribute("class", "info-deletar");
        iconRemove.setAttribute("class", "fas fa-trash-alt icon-remove");

        clienteContainer.appendChild(clientes);
        clientes.appendChild(fotoCliente);
        fotoCliente.appendChild(imgCliente);

        clientes.appendChild(infoCliente);
        infoCliente.appendChild(nomeCliente);
        infoCliente.appendChild(dataInfo);
        dataInfo.appendChild(iconCalendar);
        dataInfo.appendChild(dataText);

        infoCliente.appendChild(hourInfo);
        hourInfo.appendChild(iconRelogio);
        hourInfo.appendChild(hourText);

        clientes.appendChild(containerIcons);
        containerIcons.appendChild(numeroPessoas);
        numeroPessoas.appendChild(qtdPessoas);
        numeroPessoas.appendChild(iconPessoas);

        containerIcons.appendChild(infoDeletar);
        infoDeletar.appendChild(iconRemove);

        containerClientes.appendChild(clienteContainer);

    });

}
const modalCancel = document.getElementById("myModal-cancel");
const blockClientes = document.getElementsByClassName("clientes");

function modalCancelReserva(){
    
for (let i = 0; i < blockClientes.length; i++) {

    (function (index) {
        blockClientes[index].addEventListener("click", function () {
        modalCancel.style.display = "flex"
        console.log(i)
      })
    })(i)
  }

}

modalCancel.addEventListener("click", function (e) {
    if (e.target.style.display == "flex" || e.target.id == "btn-cross-modal") {
      modalCancel.style.display = "none";
    }
  
  })

window.addEventListener("load", carregaClientes)
window.addEventListener("load", modalCancelReserva)

configHourRedirect.addEventListener("click", () => {
    window.location.href = "../configuracao-horario/configuracao-horario.html"
})