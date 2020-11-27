const btnLogout = document.querySelector(".logout-modal")


btnLogout.addEventListener("click", () => {
    localStorage.clear()
    window.location.href = "../login/login.html"
})