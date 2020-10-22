const containerEnderecos = document.querySelector('.conteudo-enderecos')

function carregaEnderecos() {
    const allEnderecos = listaEnderecos;

    allEnderecos.forEach(values => {
        // enderecoContainer = document.createElement("a");
        endereco = document.createElement("div");

        iconLocation = document.createElement("i");
        logradouroInfo = document.createElement("p");

        cidadeInfo = document.createElement("p");    

        // enderecoContainer.setAttribute("class", "endereco-container");
        endereco.setAttribute("class", "localizacao-atual");

        iconLocation.setAttribute("class", "fas fa-map-marker-alt icon-location");
        logradouroInfo.setAttribute("class", "rua");
        logradouroInfo.textContent = values.logradouro;
       

        cidadeInfo.setAttribute("class", "sua-localizacao");
        cidadeInfo.textContent = values.cidade;

        // enderecoContainer.appendChild(endereco);
        endereco.appendChild(iconLocation);
        endereco.appendChild(logradouroInfo);
        endereco.appendChild(cidadeInfo);

        containerEnderecos.appendChild(endereco);

    });

}

window.addEventListener("load", carregaEnderecos)