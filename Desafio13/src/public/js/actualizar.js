
const password = document.getElementById('password')
const verification = document.getElementById('verification')

const form = document.getElementById('formulario')





const resetForm = () => {

    password.value = '',
    verification.value = ''



}


form.onsubmit = async (e) => {
    e.preventDefault()
    const user = {
        email: email.value,
    }
    try {
        await axios.post("http://localhost:8080/api/sessions/recuperar", user)
        alert("Se Ha enviado un correo al mail especificaco")
    } catch (error) {
        console.log(error)
        alert(error.response.data.error)
    }
    resetForm()
}

