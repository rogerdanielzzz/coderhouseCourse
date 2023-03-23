const socketClient = io()
const divProducts = document.getElementById('products-container')
const form = document.getElementById('formulario')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const code = document.getElementById('code')
const stock = document.getElementById('stock')
const category = document.getElementById('category')




const resetForm = () => {
    title.value = ''
    description.value = ''
    price.value = ''
    code.value = ''
    stock.value = ''
    category.value = ''

}

socketClient.on('productList', products => {
    console.log(products)
    const productList = products.map(product => {
        let thum = ""
        product.thumbnails && product.thumbnails.map(el => {
            thum += `<li>${el}</li>`
        })

        return `
        <div class="card m-2" style="width: 18rem;">
        <img src="https://res.cloudinary.com/hdsqazxtw/image/upload/v1642799651/WWW/Group_1.jpg" class="card-img-top"
            alt="coderhouse">
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p>Id producto: ${product.id}</p>
            <p class="card-text">Description: ${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>imagenes url:</p>
            
            <ul>
                ${thum}
            </ul>
            
            <p>Codigo: ${product.code}</p>
            <p>Stock: ${product.stock}</p>
            <p>Activo: ${product.status}</p>
            <button class="btn btn-danger" data-id="${product.id}">Eliminar</button><hr>
        </div>
    </div>
        `
    }).join(' ')
    divProducts.innerHTML = productList

    let deleteButton = document.querySelectorAll('.btn-danger')
    console.log(deleteButton)
    deleteButton.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const idProduct = e.target.getAttribute('data-id')
            socketClient.emit('deleteProduct', idProduct)
        })
    })



})


form.onsubmit = (e) => {
    e.preventDefault()

    const product = {
        title: title.value,
        description: description.value,
        price: price.value,
        code: code.value,
        stock: stock.value,
        category: category.value

    }

    socketClient.emit('addProduct', product)
    resetForm()
}
