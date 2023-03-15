const { Router } = require('express');
// Importar todos los routers;
const CartManager = require("../../CartManager")
const db = new CartManager("carrito.json")
const { productIdFinder } = require("../products/products.router")
const router = Router();

router.post("/", async (req, res) => {
    const { products } = req.body
    let arrParam
    try {
        if (Array.isArray(products)) arrParam = products
        let cart = await db.createCart(arrParam)
        res.status(200).json({ result: cart })
    } catch (e) {
        res.status(500).json({ err: e })
    }
})



router.get("/:cid", async (req, res) => {
    const { cid } = req.params
    if (cid) {

        try {
            let arrProduct = await db.getCartById(cid)
            res.status(200).json({ result: arrProduct })
        } catch (e) {
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid is empty" })
})


router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params

    if (cid && pid) {

        try {
            let cartFinder = await db.getCartById(parseInt(cid))

            if (!Array.isArray(cartFinder)) {
                res.status(500).json({ errr: "Cart Id doesnt exist" })
                return
            }
            let productFinder = await productIdFinder(parseInt(pid))
            if (productFinder.Error) {
                res.status(500).json({ errr: "Cant find a product with that id" })
                return

            }

            let product = {
                product: productFinder.id,
                quantity: 1
            }
            let finalArr
            let cartChecker = cartFinder.filter(el => el.product == parseInt(pid))
            if (cartChecker.length > 0) {

                product.quantity += cartChecker[0].quantity
                finalArr = cartFinder.filter(el => el.product !== parseInt(pid))
                finalArr.push(product)
            } else {

                finalArr = [...cartFinder]
                finalArr.push(product)
            }


            let result = await db.updateCart(parseInt(cid), finalArr)


            res.status(200).json({ result: result })
        } catch (e) {
            console.log(e)
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid and Pid must be provided" })

})

module.exports = router;
