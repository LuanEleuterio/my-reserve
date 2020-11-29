const btnLogout = document.querySelector(".logout-modal")


btnLogout.addEventListener("click", () => {
    localStorage.removeItem("myreserve-usr-token")
    localStorage.removeItem("myreserve-usr-l")
    localStorage.removeItem("myreserve-usr-email")
    localStorage.removeItem("myreserve-usr-type")
    window.location.href = "../login/login.html"
})