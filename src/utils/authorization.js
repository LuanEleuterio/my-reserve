
window.addEventListener("load", () => {
    let userLogged = localStorage.getItem("myreserve-usr-l")
    let userToken = localStorage.getItem("myreserve-usr-token")
    let redirectLogin = (userLogged !== "LOG" || userLogged == null) || (userToken === "" || userToken == null)

    if (redirectLogin) {
        window.location.href = '../login/login.html'
    }
})