import fs from "fs"
import { ProductsModel } from "../db/models/Products.model.js"
import { CartModel } from "../db/models/Carts.model.js"


export default class CartManagerDB {

    createCart = async (arr) => {
        try {
            let lg = arr?.length
            let cart
            let prod
            if (lg > 0) {
                cart = await CartModel.create({ products: [] })
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index];
                    prod = await ProductsModel.findById(element)
                    if (prod) cart.products.push({ item: prod._id, qty: prod.qty })
                }
                await cart.save()
            } else {
                cart = await CartModel.create({ products: [] })
            }
            return cart
        } catch (error) {
            console.log(error)
            return error
        }
    }

    getCarts = async () => {
        try {
            const data = await CartModel.find().populate("products.item")
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    getCartById = async (id) => {
        try {
            let cart = await CartModel.findById(id).populate("products.item")
            return cart
        } catch (error) {
            console.log(error)
            return error
        }


    }

    updateCart = async (cid, pid) => {

        let cart = await this.getCartById(cid)
        let pro = await ProductsModel.findById(pid)
        if (!pro || !cart) return " No keys matches with cart id"




        cart.products.push({
            item: pro._id
        })


        try {
            await cart.save()
            return cart
        } catch (error) {
            console.log(error)
            return error
        }


    }

}
