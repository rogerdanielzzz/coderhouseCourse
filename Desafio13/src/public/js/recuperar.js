
const email = document.getElementById('email')
const form = document.getElementById('formulario')
import env from "../../config/config"





const resetForm = () => {

    email.value = ''


}


form.onsubmit = async (e) => {
    e.preventDefault()
    const user = {
        email: email.value,
    }
    try {
        await axios.post(`${env.API_URL}api/sessions/recuperar`, user)
        alert("Se Ha enviado un correo al mail especificaco")
    } catch (error) {
        console.log(error)
        alert(error.response.data.error)
    }
    resetForm()
}

