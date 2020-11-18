const containerClientes = document.querySelector('.conteudo-clientes')
const configHourRedirect = document.querySelector("#config-hour-redirect")
var id_justifica



function carregaClientes() {
    fetch("http://localhost:8080/reserva")
  .then( (res)=> res.json())
  .then( (data)=> {
    const reservas = data
    console.log(reservas)
 
    reservas.forEach(values => {
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
        clientes.setAttribute("data-value", values.id_reserva);

        fotoCliente.setAttribute("class", "foto-cliente");
        imgCliente.setAttribute("src", "../../img/userPerfil.png");

        infoCliente.setAttribute("class", "info-cliente");
        nomeCliente.setAttribute("class", "nome-cliente infos");
        nomeCliente.textContent = values.usuario.nome;

        dataInfo.setAttribute("class", "data infos");
        iconCalendar.setAttribute("class", "far fa-calendar-check col-1");
        dataText.setAttribute("class", "data")
        dataText.textContent = FormataStringData(values.data_reserva);

        hourInfo.setAttribute("class", "hourInfo infos")
        iconRelogio.setAttribute("class", "far fa-clock col-1");
        hourText.setAttribute("class", "horario")
        hourText.textContent = values.horario.horario_de.slice(-8,-3);

        containerIcons.setAttribute("class", "container-icons");
        numeroPessoas.setAttribute("class", "numero-pessoas");
        qtdPessoas.setAttribute("class", "quantidade-pessoa");
        iconPessoas.setAttribute("class", "fas fa-user-friends icon-pessoa");
        qtdPessoas.textContent = values.qtd_pessoa;

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
      })

      const blockClientes = document.getElementsByClassName("clientes");
      for (let i = 0; i < blockClientes.length; i++) {

        (function (index) {
            blockClientes[index].addEventListener("click", function () {
            modalCancel.style.display = "flex"
            modalBtnSubmit.disabled = true
            modalBtnSubmit.style.background = "#CCC"
            console.log(blockClientes[index].attributes[1].value)


           id_justifica = blockClientes[index].attributes[1].value


            
          })
        })(i)
      }

    });
    
}
function FormataStringData(d) {
  var dia  = d.split("-")[0];
  var mes  = d.split("-")[1];
  var ano  = d.split("-")[2];

  return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
}

const modalCancel = document.getElementById("myModal-cancel");
const modalBtnSubmit = document.getElementById("btnSubmitCancelar")
const txtModalCancel = document.getElementById("txtModalCancel")

modalCancel.addEventListener("click", function (e) {
    if (e.target.style.display == "flex" || e.target.id == "btn-cross-modal") {
      modalCancel.style.display = "none";
      txtModalCancel.value = ""
    }
  })

txtModalCancel.addEventListener("input",function(){

        modalBtnSubmit.disabled = false
        modalBtnSubmit.style.background = "#4361EE"
        if(txtModalCancel.value == ""){
            modalBtnSubmit.disabled = true
            modalBtnSubmit.style.background = "#CCC"
        }
})

modalBtnSubmit.addEventListener("click",function(){
    if(txtModalCancel.value == ""){
        
    }
    if(txtModalCancel.value != ""){
      const objteste = {
        fk_reserva: parseInt(id_justifica),
        justificativa: txtModalCancel.value
      }
      console.log(objteste)

      fetch("http://localhost:8080/cancel-justifica",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objteste)
      })
      .then(res =>{
        if(!res.ok){
          throw Error(res.statusText)
        }else{
          return res.json()
        }
      })
      .then(okCancel => {
          if(okCancel){
          exibeAlert(true)
        }else{
          exibeAlert(false)
        }
      })
      .catch(err=> exibeAlert(false))
    }
})

function exibeAlert(exibe) {
  if (exibe) {
    Swal.fire({
      icon: 'success',
      title: 'A reserva foi cancelada.',
      showConfirmButton: false,
      timer: 3500,
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Não foi possível cancelar essa reserva.',
      showConfirmButton: false,
      timer: 2500,
    })
  }
}


window.addEventListener("load", carregaClientes)

configHourRedirect.addEventListener("click", () => {
    window.location.href = "../configuracao-horario/configuracao-horario.html"
})