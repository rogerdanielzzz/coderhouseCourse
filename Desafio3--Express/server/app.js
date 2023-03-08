const express = require("express")
//Clase importada e instancida
const ProductManager = require("../ProductManager.js")
const db = new ProductManager("db.json")

server = express()
server.use(express.urlencoded({ extended: true }))
//Rutas

// Endpoint para traer todos los productos o la cantidad indicada por query
server.get("/products", async (req, res) => {

    try {
        const { limit } = req.query
        let arrProduct = await db.getProducts()
        if (limit) arrProduct = arrProduct.slice(0, limit)
        res.status(200).json(arrProduct)
    } catch (e) {
        res.status(500).json({ errr: e })
    }
})

// Endpoint para traer el producto solicitado by id en el params
server.get("/products/:pid", async (req, res) => {
    const { pid } = req.params
    if (pid) {
        try {
          
            let arrProduct = await db.getProductById(pid)
            res.status(200).json(arrProduct)
        } catch (e) {
            res.status(500).json({ error: e })
        }
    } else res.status(400).json({ error: "Debe enviar un id de producto por params" })

})


module.exports = server

