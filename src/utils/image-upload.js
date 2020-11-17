const fileInput = document.getElementById("file-input")

fileInput.addEventListener("change", (event) => {
  const img = event.target.files[0]

  const formData = new FormData()

  formData.append("image", img)

  fetch("http://localhost:8080/upload", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(linkImg => localStorage.setItem("myreserve-img-perfil", linkImg))
    .then(() => {
      console.log("Enviado com sucesso!")
      Swal.fire({
        icon: 'success',
        title: 'Foto enviada com sucesso!',
        showConfirmButton: false,
        timer: 3500,
      }
      )
    })
    .catch(err => console.log("Erro ao enviar"))
})