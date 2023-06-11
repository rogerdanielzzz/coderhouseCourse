import { ProductsModel } from "../db/models/Products.model.js"

export default class ProductManager {

    getProducts = async (limit, page, sort, filterQuery) => {

        let options = { limit: 10, page: 1 }
        if (limit) options.limit = limit
        if (page) options.page = page
        if (sort) options.sort = { price: sort }
        const data = await ProductsModel.paginate(filterQuery, options)

        let obj = {
            payload: data.docs,
            totalPages: data.totalPages,
            prevPage: data.prevPage,
            nextPage: data.nextPage,
            page: data.page,
            hasPrevPage: data.hasPrevPage,
            hasNextPage: data.hasNextPage,
            prevLink: data.prevPage ? `localhost:8080/api/products?limit=${options.limit}&page=${data.prevPage}` : null,
            nextLink: data.nextPage ? `localhost:8080/api/products?limit=${options.limit}&page=${data.nextPage}` : null,
        }
        return obj

    }

    getProductById = async (id) => {
        let products = await ProductsModel.findById(id)
        if (!products) throw new Error("Not found")
        return products
    }

    addProduct = async (productEn) => {
        await ProductsModel.create(productEn)
        return "Product added"
    }

    updateProduct = async (id, keysObject) => {

        const toUpdate = await ProductsModel.findOneAndUpdate({ _id: id }, keysObject)

        if (!toUpdate) throw new Error("Product Not found")

        const updated = await ProductsModel.findById(id)
        return updated

    }

    deleteProduct = async (id) => {
        let deleted = await ProductsModel.findByIdAndDelete(id)
        if (!deleted) throw new Error("Not found")
        return
    }
}
