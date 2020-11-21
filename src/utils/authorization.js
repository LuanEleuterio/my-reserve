
window.addEventListener("load", () => {
    if (localStorage.getItem("myreserve-usr-l") != "LOG") {
        window.location.href = '../login/login.html'
    }
})