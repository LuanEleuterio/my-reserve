const fileInput = document.getElementById("file-input")

fileInput.addEventListener("change", (event) => {
  const img = event.target.files[0]

  const formData = new FormData()

  formData.append("image", img)

  fetch("http://localhost:8080/upload", {
    method: "POST",
    body: formData
  })
  .then(() => console.log("Enviado com sucesso!"))
  .catch(err => console.log("Erro ao enviar"))
})