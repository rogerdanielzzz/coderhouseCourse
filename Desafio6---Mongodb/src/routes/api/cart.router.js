import { Router } from 'express';
// Importar todos los routers;
import CartManagerDB from '../../Dao/CartManagerDB.js';
import CartManagerFS from '../../Dao/CartManagerFS.js';
import { productIdFinderDBM } from './product.router.js';
export const dbM = new CartManagerDB()
const db = new CartManagerFS("carts.json")

export const router = Router();

router.post("/", async (req, res) => {
    const { products } = req.body
    try {
        let cart= await dbM.createCart(products)
        
        res.status(200).json({ result: cart })
    } catch (e) {
        res.status(500).json({ err: e })
    }
})


router.get("/:cid", async (req, res) => {
    const { cid } = req.params
    if (cid) {

        try {
            let arrProduct = await dbM.getCartById(cid)
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
    
            let result = await dbM.updateCart(cid, pid)

            res.status(200).json({ result: result })
        } catch (e) {
            console.log(e)
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid and Pid must be provided" })

})

