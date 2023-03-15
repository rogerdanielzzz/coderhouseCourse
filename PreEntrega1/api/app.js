const express = require("express")
//Clase importada e instancida
const {router} = require("./products/products.router.js")
const cartsRoutes = require("./carts/carts.router.js")


server = express()
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
//Rutas
server.use('/products', router);
server.use('/carts', cartsRoutes);

// Endpoint para traer todos los productos o la cantidad indicada por query


module.exports = {
    server,
    
}


