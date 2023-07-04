import { ProductsModel } from "../db/models/Products.model.js"
import { CartModel } from "../db/models/Carts.model.js"


export default class CartManagerDB {

    createCart = async (arr) => {

        let lg = arr?.length
        let cart

        if (lg > 0) {
            cart = await CartModel.create({ products: [] })
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                let prod = await ProductsModel.findById(element)

                if (prod) cart.products.push({ item: prod._id })
            }
            await cart.save()
        } else {
            cart = await CartModel.create({ products: [] })
        }
        return cart

    }

    getCarts = async () => {
        const data = await CartModel.find().populate("products.item")
        return data

    }

    getCartById = async (id) => {
        let cart = await CartModel.findById(id).populate("products.item")
        return cart
    }

    cartCleaner = async (id) => {
        let cart = await CartModel.findById(id)
        cart.products = []
        await cart.save()
        return cart

    }

    updateCart = async (cid, pid) => {

        let cart = await this.getCartById(cid)
        let pro = await ProductsModel.findById(pid)
        if (!pro || !cart) throw new Error("No keys matches with cart id")

        if (cart.products.some(el => el.item._id.toString() == pid)) {
            let modified = await this.updatePidQty(cid, pid)
            return modified

        } else {

            cart.products.push({
                item: pro._id
            })

            await cart.save()
            return cart

        }
    }


    updateCartByArr = async (cid, arr) => {

        let cart = await CartModel.findById(cid)
        if (!cart) throw new Error("No se encontro carro con ese Id")
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            let prod = await ProductsModel.findById(element)
            if (prod) cart.products.push({ item: prod._id })
        }
        await cart.save()
        return cart

    }


    updateCartByArrWithQty = async (cid, arr) => {

        let cart = await CartModel.findById(cid)
        if (!cart) throw new Error("No se encontro carro con ese Id")
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index]._id;
            let prod = await ProductsModel.findById(element)
            if (prod) cart.products.push({ item: prod._id, qty: arr[index].qty })
        }
        await cart.save()
        return cart

    }

    deleteProductCart = async (cid, pid) => {

        let cart = await CartModel.findById(cid)
        if (!cart) throw new Error("No se encontro carro con ese Id")
        let pep = await CartModel.updateOne({ _id: cid }, { $pull: { products: { item: pid } } })
        if (pep.modifiedCount) return "Producto eliminado"
        else throw new Error("No existe ese producto en el carrito")

    }

    updatePidQty = async (cid, pid) => {

        const cart = await CartModel.findById(cid);
        const productIndex = cart.products.findIndex(
            (product) => product.item.toString() === pid
        );

        if (productIndex !== -1) {
            cart.products[productIndex].qty += 1;
            await cart.save();
            return cart;
        } else {
            throw new Error(`Product with ID ${pid} not found in cart`);
        }

    }

}
