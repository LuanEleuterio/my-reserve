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

const showData = (result)=>{
    for(const campo in result){
        if(document.querySelector("#"+campo)){
            document.querySelector("#"+campo).value = result[campo]
        }
    }
}

cep.addEventListener("blur",(e)=>{
    let search = cep.value.replace("-","")
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
    .then(response =>{ response.json()
        .then( data => showData(data))
    })
    .catch(e => console.log('Deu Erro: '+ e,message))
})
// localização por CEP - end