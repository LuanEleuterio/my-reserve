const user = document.getElementById("email-login")
const passwordUser = document.getElementById("password-login")
const submitLogin = document.getElementById("submit-login")

submitLogin.addEventListener("click", () => {
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
        .then(res => res.json())
        .then(token => {
            localStorage.setItem("myreserve-usr-token", token.senha)
            localStorage.setItem("myreserve-usr-email", token.login)
            localStorage.setItem("myreserve-usr-l", "LOG")

            return token
        })
        .catch(err => console.log("Erro ao fazer login", err))

    return dadosLogin
}

function redirectToUserOrEstab(typeUsr) {
    if (typeUsr === "USER") {
        window.location.href = '../home/home.html'
    } else if (typeUsr === "ESTAB") {
        window.location.href = '../home-restaurante/home-restaurante.html'
    }
}