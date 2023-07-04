
const password = document.getElementById('password')
const verification = document.getElementById('verification')

const form = document.getElementById('formulario')
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');





const resetForm = () => {

    password.value = '',
        verification.value = ''



}



form.onsubmit = async (e) => {
    e.preventDefault()
    if (!token) {
        alert("no exite token")
        return
    }
    if (password.value !== verification.value) {
        alert("La contraseña no coincide")
        return
    }
    const user = {
        password: password.value,
        token,
    }
    try {
        await axios.put("http://localhost:8080/api/sessions/blanquear", user)
        alert("Se Ha actualizado la contraseña")
    } catch (error) {
        console.log(error)
        if (error?.response?.data?.error) alert(error.response.data.error)
        else alert("ha ocurrido un error")

        if (error?.response?.data?.expired) window.location.replace('http://localhost:8080/recuperar')


    }
    resetForm()
}

