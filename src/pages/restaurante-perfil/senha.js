const modalCategoria = document.getElementById("categoria-option")
const btnModalEstab = document.getElementById("submit-salvar")

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
  fetch("http://localhost:8080/categoria")
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

  fetch(`http://localhost:8080/restaurante/${localStorage.getItem('myreserve-usr-identifier')}`)
    .then((res) => res.json())
    .then((data) => {

      document.getElementById("foto-restaurante").setAttribute("src", "../../../myreserve/" + data.img_estabelecimento)
      document.getElementById("categoria-option").value = data.categoria.id_categoria

      document.getElementById("name").value = data.nome
      document.getElementById("cnpj").value = data.cnpj
      document.getElementById("email").value = data.email
      document.getElementById("story").value = data.descricao
      document.getElementById("horarioDe").value = data.hora_funcionamento.slice(0, 5)
      document.getElementById("horarioAte").value = data.hora_funcionamento.slice(-5)


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
      hora_funcionamento: document.getElementById("horarioDe").value + " às " + document.getElementById("horarioAte").value,
      descricao: document.getElementById("story").value
    }
  }

  fetch(`http://localhost:8080/restaurante/${localStorage.getItem('myreserve-usr-identifier')}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(objEstab)
  }).then(res => {
    if (!res.ok) {
      throw Error(res.statusText)
    } else {
      exibeAlertMobileRest(true)
      return res.json()
    }
  }).catch(err => {
    exibeAlertMobileRest(false)
    console.log(err)
  })
})

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