import { Router } from 'express';
import { dbM as dbProduct } from '../controller/product.controller.js';
import { dbM as dbCart } from "../controller/cart.controller.js";
import { adminValidator, userValidator } from "../middlewares/auth.middleware.js"


// Importar todos los routers;
export const router = Router();


router.get("/products", userValidator, async (req, res) => {

    if (!req?.user?.email) return res.redirect("/login")



    try {
        const { limit, page, sort } = req.query
        let on = await dbProduct.getProducts(limit, page, sort)
        let productos = JSON.parse(JSON.stringify(on))
        res.render("products", {
            hasNextPage: productos.hasNextPage,
            hasPrevPage: productos.hasPrevPage,
            nextLink: productos.nextLink ? `http://localhost:8080/products?page=${productos.page + 1}&limit=${limit ? limit : 10}` : null,
            prevLink: productos.prevLink ? `http://localhost:8080/products?page=${productos.page - 1}&limit=${limit ? limit : 10}` : null,
            productos: productos.payload,
            name: req.user.first_name,
            role: req.user.role ? req.user.role : "user"

        })
    } catch (e) {
        res.send(500).json({ error: e.message })
    }
})

router.get("/products/:pid", async (req, res) => {
    if (!req?.user?.email) return res.redirect("/login")

    try {
        const { pid } = req.params
        let on = await dbProduct.getProductById(pid)
        let productos = JSON.parse(JSON.stringify(on))
        res.render("detail", {
            producto: productos
        })
    } catch (e) {
        res.send(500).json({ error: e.message })
    }
})

router.get("/carts/:cid", async (req, res) => {
    if (!req?.user?.email) return res.redirect("/login")

    try {
        const { cid } = req.params
        let on = await dbCart.getCartById(cid)
        let productos = JSON.parse(JSON.stringify(on))
        res.render("carts", {
            productos: productos.products
        })
    } catch (e) {
        res.send(500).json({ error: e.message })
    }
})

router.get("/login", async (req, res) => {

    if (req?.user?.email) return res.redirect("/products")
    try {

        res.render("login")
    } catch (e) {
        res.send(500).json({ error: e.message })
    }
})

router.get("/registro", async (req, res) => {
    if (req?.user?.email) return res.redirect("/products")

    try {

        res.render("registro")
    } catch (e) {
        res.send(500).json({ error: e.message })
    }
})
router.get("/chat", async (req, res) => {

    if (!req?.user?.email) return res.redirect("/login")

    try {

        res.render("chat")
    } catch (e) {
        res.send(500).json({ error: e.message })
    }
})









