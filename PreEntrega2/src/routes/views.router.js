import { Router } from 'express';
import { dbM as dbInstance } from './api/product.router.js';
// Importar todos los routers;
export const router = Router();

router.get("/", async (req, res) => {

    try {
        const { limit } = req.query
        let on = await dbInstance.getProducts()
        let productos= JSON.parse(JSON.stringify(on.payload))
        
        console.log(productos.length)
        res.render("home",{productos})
    } catch (e) {
        res.send(500).json({ error:e })
    }
})
router.get("/products", async (req, res) => {

    try {
        const { limit, page, sort } = req.query
        let on = await dbInstance.getProducts(limit, page, sort)
        let productos= JSON.parse(JSON.stringify(on))
        
        res.render("products",{ data:productos, productos: productos.payload})
    } catch (e) {
        res.send(500).json({ error:e })
    }
})

router.get("/realtimeproducts", async (req, res) => {

    try {
        
        res.render("realTimeProducts")
    } catch (e) {
        res.send(500).json({ error:e })
    }
})

router.get("/chat", async (req, res) => {

    try {
        
        res.render("chat")
    } catch (e) {
        res.send(500).json({ error:e })
    }
})






