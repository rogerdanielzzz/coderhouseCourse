const fs = require("fs")

class ProductManager {
    constructor(path) {
        this.path = path
    }
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        let products = await this.getProducts()
        if (Array.isArray(products)) {
            if (title && description && price && thumbnail && code && stock) {
                let validator = products.some((el) => el.code == code)
                if (!validator) {
                    let product = {
                        id: products.length > 0 ? (products[products.length - 1].id + 1) : 1,
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        stock: stock,
                    }
                    products.push(product)
                    try {
                        await fs.promises.writeFile(this.path, JSON.stringify(products))
                        return "Product added"
                    } catch (error) {
                        return error
                    }



                } else {
                    let msgE = "Error: The code must be unique"
                    return msgE
                }
            } else return "Error: Some fields are emptys"
        }

    }

    getProducts = async () => {
        console.log("entro sucios")
        if (fs.existsSync(this.path)) {
            try {
                const data = await fs.promises.readFile(this.path, "utf-8")
                return JSON.parse(data)
            } catch (error) {
                return error
            }
        } else return []

    }

    getProductById = async (id) => {
        let products = await this.getProducts()
        if (Array.isArray(products)) {
            let response = products.filter((el) => el.id == id)
            if (response.length > 0) return response[0]
            else {
                return {Error: "Not found"}
            }
        } else return "Error json file"

    }

    updateProduct = async (id, keysObject) => {
        let products = await this.getProducts()
        if (Array.isArray(products)) {
            let response = products.filter((el) => el.id == id)
            let keysModified = 0
            if (response.length > 0) {
                let toModify = response[0]
                for (const key in keysObject) {
                    if (Object.hasOwnProperty.call(keysObject, key)) {
                        const newValor = keysObject[key];
                        if (toModify[key]) {
                            toModify[key] = newValor
                            keysModified += 1
                        }
                    }
                }

                if (keysModified > 0) {

                    let toWrite = products.filter(el => el.id !== id)
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
                        return `Product with id: ${id} has been updated in ${keysModified} fields of ${Object.keys(keysObject).length} entered keys`
                    } catch (error) {
                        return error
                    }
                } else return " No keys matches with the db fields to modify"

            }
            else {
                return "Error: Not found"
            }


        } else return "Error json file"


    }

    deleteProduct = async (id) => {
        let products = await this.getProducts()
        if (Array.isArray(products)) {
            let exist = products.some((el) => el.id == id)
            if (exist) {
                let response = products.filter((el) => el.id !== id)
                try {
                    await fs.promises.writeFile(this.path, JSON.stringify(response))
                    return "Product Deleted"
                } catch (error) {
                    return error
                }
            } else {
                return "Error: Id Not found"
            }

        } else return "Error json file"



    }

}



module.exports= ProductManager


