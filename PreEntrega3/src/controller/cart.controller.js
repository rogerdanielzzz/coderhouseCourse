
import CartManagerDB from '../Dao/CartManagerDB.js';
export const dbM = new CartManagerDB()


export const createCart = async (req, res) => {
    const { products } = req.body
    try {
        let cart = await dbM.createCart(products)

        res.status(200).json({ result: cart })
    } catch (e) {
        res.status(500).json({ err: e })
    }
}

export const getCart = async (req, res) => {
    const { cid } = req.params
    if (cid) {

        try {
            let arrProduct = await dbM.getCartById(cid)
            res.status(200).json({ status: "success", payload: arrProduct })
        } catch (e) {
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid is empty" })
}

export const cartUpdater = async (req, res) => {
    const { cid } = req.params
    const { products } = req.body

    if (cid && products) {
        try {
            let result = await dbM.updateCartByArr(cid, products)
            res.status(200).json({ status: "success", payload: result })
        } catch (e) {
            console.log(e)
            res.status(500).json({ status: "error", errr: e })
        }
    } else res.status(400).json({ status: "error", err: "Cid and Array must be provided" })
}

export const cartCleaner = async (req, res) => {
    const { cid } = req.params
    if (cid) {

        try {
            let arrProduct = await dbM.cartCleaner(cid)
            res.status(200).json({ status: "success", payload: arrProduct })
        } catch (e) {
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid is empty" })
}

export const addProductToCart = async (req, res) => {
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

}

export const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params

    if (cid && pid) {
        try {
            let result = await dbM.deleteProductCart(cid, pid)
            res.status(200).json({ result: result })
        } catch (e) {
            console.log(e)
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid and Pid must be provided" })
}

export const incrementProduct = async (req, res) => {
    const { cid, pid } = req.params

    if (cid && pid) {
        try {
            let result = await dbM.updatePidQty(cid, pid)
            res.status(200).json({ status: "success", payload: result })
        } catch (e) {
            console.log(e)
            res.status(500).json({ errr: e })
        }
    } else res.status(400).json({ err: "Cid and Pid must be provided" })
}
