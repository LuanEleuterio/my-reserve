var modalForm = document.querySelector('.modal-type-form')
var btnSign = document.querySelector("#btn-sign-up")
var noHaveAccount = document.querySelector("#no-have-account")


function openModalTypeForm() {
    modalForm.classList.add('mostrar')

    modalForm.addEventListener("click", (e) => {
        if (e.target.className == modalForm.className) {
            modalForm.classList.remove('mostrar')
        }
    })
}



btnSign.addEventListener("click", openModalTypeForm)

noHaveAccount.addEventListener("click", openModalTypeForm)