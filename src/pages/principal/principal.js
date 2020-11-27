var modalForm = document.querySelector('.modal-type-form')
var btnSign = document.querySelector("#btn-sign-up")
var noHaveAccount = document.querySelector("#no-have-account")
var fazerLogin = document.querySelector("#principal-login")
var fazerLoginBtn = document.querySelector("#principal-login-btn")
var fazerCadUser = document.querySelector("#sign-up-cliente")
var fazerCadEstab = document.querySelector("#sign-up-estab")


function openModalTypeForm() {
    modalForm.classList.add('mostrar')

    modalForm.addEventListener("click", (e) => {
        if (e.target.className == modalForm.className) {
            modalForm.classList.remove('mostrar')
        }
    })
}

if (btnSign != null) {
    btnSign.addEventListener("click", openModalTypeForm)
}

if (noHaveAccount != null) {
    noHaveAccount.addEventListener("click", openModalTypeForm)
}

if (fazerLogin != null) {
    fazerLogin.addEventListener("click", () => {
        window.location.href = './src/pages/login/login.html'
    })
}

if (fazerLoginBtn != null) {
    fazerLoginBtn.addEventListener("click", () => {
        window.location.href = './src/pages/login/login.html'
    })
}

if (fazerCadUser != null) {
    fazerCadUser.addEventListener("click", () => {
        window.location.href = './src/pages/cadastro-user/cad-user.html'
    })
}

if (fazerCadEstab != null) {
    fazerCadEstab.addEventListener("click", () => {
        window.location.href = './src/pages/cadastro-empresa/cad-empresa.html'
    })
}