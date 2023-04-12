import fs from "fs"
import { CartModel } from "../db/models/Carts.model"

export default class CartManagerDB {

    createCart = async (arr) => {
        try {
            let lg = arr?.length
            await CartModel.create()
            if (lg > 0) {

            } else

                return "Cart Created"
        } catch (error) {
            console.log(error)
            return error
        }
    }

    getCarts = async () => {
        try {
            const data = await CartModel.find()
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    }

    getCartById = async (id) => {
        try {
            let cart = await CartModel.findById(id).populate("products")
            return cart

        } catch (error) {
            console.log(error)
            return error
        }


    }

    updateCart = async (cid, arr) => {

        let carts = await this.getCarts()
        if (Array.isArray(carts)) {

            let response = carts.filter((el) => el.id == cid)

            if (response.length > 0) {


                response[0].products = [...arr]
                let toModify = response[0]


                let toWrite = carts.filter((el) => el.id !== cid)
                toWrite.push(toModify)
                toWrite.sort((a, b) => {
                    if (a.id < b.id) {
                        return -1;
                    }
                    if (a.id > b.id) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                })

                try {
                    await fs.promises.writeFile(this.path, JSON.stringify(toWrite))
                    return toModify
                } catch (error) {
                    return error
                }
            } else return " No keys matches with cart id"

        }
        else {
            return "Error db "
        }

    }

}








