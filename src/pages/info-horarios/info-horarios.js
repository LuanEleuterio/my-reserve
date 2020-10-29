const btnHourMobile = document.getElementsByClassName("btn-hour-mobile");

for (let i = 0; i < btnHourMobile.length; i++) {

    (function (index) {
        btnHourMobile[index].addEventListener("click", function () {
            window.location.href = '../confirmar-reserva/confirmar-reserva.html'
        })
    })(i)
}


