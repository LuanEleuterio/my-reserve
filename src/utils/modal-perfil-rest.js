const modalPerfilRest = document.querySelector('.modal-conteiner-perfil-rest')
const btnPerfilRest = document.querySelector('#btn-perfil-rest')


function openModalPerfil() {
    modalPerfilRest.classList.add('mostrar');
    console.log(btnPerfilRest)
    console.log(modalPerfilRest)
    modalPerfilRest.addEventListener("click", (e) => {
        modalPerfilRest.classList.remove('mostrar')
    })
}

btnPerfilRest.addEventListener("click", openModalPerfil)

