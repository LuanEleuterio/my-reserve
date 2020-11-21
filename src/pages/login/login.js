const user = document.getElementById("email-login")
const passwordUser = document.getElementById("password-login")
const submitLogin = document.getElementById("submit-login")

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

    const dadosLogin = fetch("http://localhost:8080/login/auth", {
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
