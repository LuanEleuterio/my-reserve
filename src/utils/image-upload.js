const fileInput = document.getElementById("file-input")

fileInput.addEventListener("change", async (event) => {
  event.preventDefault()
  const img = event.target.files[0]

  const formData = new FormData()

  formData.append("file", img)

  axios.post("https://myreserve-pi.herokuapp.com/storage/upload", formData)
    .then(res => {
      localStorage.setItem("myreserve-usr-img", res.data)
      exibeAlertImg(true)
    })
    .catch(err => {
      console.log(err)
      exibeAlertImg(false)
    })

  /*
try {
  const linkImg = await fetch("http://localhost:8080/storage/upload", {
    method: "POST",
    body: formData
  })
    .then(res => {
      console(res.json())
      return res.json()
    })

  if (linkImg) {
    localStorage.setItem("myreserve-usr-img", linkImg)
    Swal.fire({
      icon: 'success',
      title: 'Foto enviada com sucesso!',
      showConfirmButton: false,
      timer: 3500,
    })
  }
} catch (err) {
  Swal.fire({
    icon: 'error',
    title: 'Não foi possível enviar a foto!',
    showConfirmButton: false,
    timer: 3500,
  })
  console.log("Erro ao enviar")
}*/
})

function exibeAlertImg(exibe) {
  if (exibe) {
    Swal.fire({
      icon: 'success',
      title: 'Foto enviada com sucesso!',
      showConfirmButton: false,
      timer: 3500,
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Não foi possível enviar a foto!',
      showConfirmButton: false,
      timer: 3500,
    })
  }
}