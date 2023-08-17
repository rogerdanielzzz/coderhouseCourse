
const divProducts = document.getElementById('products-container')
const form = document.getElementById('formulario')
const email = document.getElementById('email')
const contraseña = document.getElementById('contraseña')
import env from "../../config/config"



const resetForm = () => {
    email.value = ''
    contraseña.value = ''
}

form.onsubmit = async (e) => {
    e.preventDefault()

    const user = {
        email: email.value,
        password: contraseña.value,
    }



    try {
        const { data } = await axios.post(`${env.API_URL}api/sessions/login`, user)
        console.log(data)
        window.location.replace(`${env.API_URL}products`)
        resetForm()
    } catch (error) {
        console.log(error.response)
        alert(error.response.data)
    }


}
