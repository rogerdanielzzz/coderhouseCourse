
const divProducts = document.getElementById('products-container')
const form = document.getElementById('formulario')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const code = document.getElementById('code')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const logout = document.getElementById('logout')
import env from "../../config/config.js"

logout.addEventListener('click', async (e) => {
    try {
        const { data } = await axios.delete(`${env.API_URL}api/sessions/logout/`)
        console.log(data)
        alert(data.msg)
        window.location.replace(`${env.API_URL}login`)

    } catch (error) {
        alert(error.message)
    }
})


const resetForm = () => {
    title.value = ''
    description.value = ''
    price.value = ''
    code.value = ''
    stock.value = ''
    category.value = ''

}

let deleteButton = document.querySelectorAll('.btn-success')
console.log(deleteButton)
deleteButton.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        const idProduct = e.target.getAttribute('data-id')
        console.log(idProduct)
        try {
            await axios.post(`${env.API_URL}api/carts/643de776b2189188a9bcdaf3/product/${idProduct}`)
            alert("Producto agregado")
        } catch (error) {
            alert(error.message)
        }
    })
})


