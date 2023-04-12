import fs from "fs"
import { ProductsModel } from "../db/models/Products.model.js"

export default class ProductManager {

    addProduct = async (productEn) => {
        const { title, description, code, price, status, stock, category, thumbnails } = productEn

        if (title !== undefined && description !== undefined && code !== undefined && price !== undefined && stock !== undefined && category !== undefined) {

            let titleValidated = title.toString()
            let descriptionValidated = description.toString()
            let codeValidated = code.toString()
            let priceValidated = parseFloat(price)
            let statusValidated = Boolean(status ? status : true)
            let stockValidated = parseInt(stock)
            let categoryValidated = category.toString()
            let thumbnailsValidated = thumbnails
            if (thumbnails && Array.isArray(thumbnails)) {
                for (let i = 0; i < thumbnails.length; i++) {
                    thumbnailsValidated[i] = thumbnails[i].toString();

                }
            }

            let product = {
                title: titleValidated,
                description: descriptionValidated,
                price: priceValidated,
                thumbnails: thumbnailsValidated,
                code: codeValidated,
                stock: stockValidated,
                status: statusValidated,
                category: categoryValidated
            }
            try {
                await ProductsModel.create(product)
                return "Product added"
            } catch (error) {
                console.log(error)
                return error
            }

        } else return "Error: Some fields are emptys"


    }

    getProducts = async () => {
        try {
            const data = await ProductsModel.find()
            return data
        } catch (error) {
            console.log(error)
            return error
        }

    }

    getProductById = async (id) => {


        try {
            let products = await ProductsModel.findById(id)
            if (products) return products
            else {
                return { Error: "Not found" }
            }
        } catch (error) {
            console.log(error)
            return error
        }

    }

    updateProduct = async (id, keysObject) => {
        try {
            const msg = await ProductsModel.findOneAndUpdate({ _id: id }, keysObject)
            return msg
        } catch (error) {
            return error
        }
    }

    deleteProduct = async (id) => {
        try {
            await ProductsModel.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
            return error
        }

    }
}
