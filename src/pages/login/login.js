const user = document.getElementById("email-login")
const passwordUser = document.getElementById("password-login")
const submitLogin = document.getElementById("submit-login")
const fazerCadUser = document.querySelector("#sign-up-cliente")
const fazerCadEstab = document.querySelector("#sign-up-estab")

submitLogin.addEventListener("click", (e) => {
    e.preventDefault()
    const bodyLogin = {
        login: user.value,
        senha: passwordUser.value
    }

    const chamaLogin = new Promise((resolve, reject) => {
        resolve(fazLogin(bodyLogin))
    })

    const tentaLogin = async () => {
        try {
            const dados = await chamaLogin;

            redirectToUserOrEstab(dados.isUserOrEstab)

        }
        catch (err) {
            console.log(err)
        }
    }
    tentaLogin()
})

function fazLogin(obj) {

    const dadosLogin = fetch("https://myreserve-pi.herokuapp.com/login/auth", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(res => {
            if (!res.ok) {
                throw Error(res.statusText)
            } else {
                return res.json()
            }

        })
        .then(token => {
            console.log(token)
            localStorage.setItem("myreserve-usr-token", token.senha)
            localStorage.setItem("myreserve-usr-email", token.login)
            localStorage.setItem("myreserve-usr-identifier", token.id)
            localStorage.setItem("myreserve-usr-l", "LOG")
            localStorage.setItem("myreserve-usr-type", token.isUserOrEstab)
            return token
            //exibeAlert(true)
        })
        .catch(err => {
            exibeAlert(false)
            console.log("Erro ao fazer login", err)
        })

    return dadosLogin
}

function redirectToUserOrEstab(typeUsr) {

    if (typeUsr === "USER") {
        window.location.href = '../home/home.html'
    } else if (typeUsr === "ESTAB") {
        window.location.href = '../home-restaurante/home-restaurante.html'
    }

}

function exibeAlert(exibe) {
    if (exibe) {
        Swal.fire({
            icon: 'success',
            title: 'Deu tudo certo!',
            text: "Seu cadastro foi realizado.",
            showConfirmButton: false,
            timer: 3500,
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Opss... Ocorreu algum problema!',
            text: "Dados de login incorretos, tente novamente",
            showConfirmButton: false,
            timer: 4500,
        })
    }
}

window.addEventListener("load", () => {
    let userLogged = localStorage.getItem("myreserve-usr-l")
    let userToken = localStorage.getItem("myreserve-usr-token")
    let userType = localStorage.getItem("myreserve-usr-type")
    if ((userLogged != "" || userLogged != null) && (userToken != "" || userToken != null)) {
        if (userType === "USER") {
            window.location.href = '../home/home.html'
        } else if (userType === "ESTAB") {
            window.location.href = '../home-restaurante/home-restaurante.html'
        }
    }
})

var modalForm = document.querySelector('.modal-type-form')
var noHaveAccount = document.querySelector("#no-have-account")


function openModalTypeForm() {
    modalForm.classList.add('mostrar')

    modalForm.addEventListener("click", (e) => {
        if (e.target.className == modalForm.className) {
            modalForm.classList.remove('mostrar')
        }
    })
}

if (noHaveAccount != null) {
    noHaveAccount.addEventListener("click", openModalTypeForm)
}

if (fazerCadUser != null) {
    fazerCadUser.addEventListener("click", () => {
        window.location.href = '../cadastro-user/cad-user.html'
    })
}

if (fazerCadEstab != null) {
    fazerCadEstab.addEventListener("click", () => {
        window.location.href = '../cadastro-empresa/cad-empresa.html'
    })
}