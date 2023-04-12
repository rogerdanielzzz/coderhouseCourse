import { Router } from 'express';
import { dbInstance } from './api/product.router.js';
// Importar todos los routers;
export const router = Router();

router.get("/", async (req, res) => {

    try {
        const { limit } = req.query
        let productos = await dbInstance.getProducts()
        if (limit) arrProduct = arrProduct.slice(0, limit)
        res.render("home",{productos})
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






