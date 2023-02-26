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
                return "Error: Not found"
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

const test = async () => {
    const db = new ProductManager("db.json")
    console.log("get")
    console.log(await db.getProducts())
    console.log("Add Success case")
    console.log(await db.addProduct("Manzana", "Fruta", "100", "url.com", "ccc111", "2"))
    console.log(await db.addProduct("Pera", "Fruta", "100", "url.com", "aaa111", "2"))
    console.log(await db.addProduct("Pomelo", "Fruta", "100", "url.com", "bbb222", "2"))
    console.log("Add Error case")
    console.log(await db.addProduct("Sanndia", "Fruta", "100", "url.com", "aaa111", "2"))
    console.log("Get Id Success Case")
    console.log(await db.getProductById(2))
    console.log("Get id error case")
    console.log(await db.getProductById(25))
    console.log("Delete Success Case")
    let largo = await db.getProducts()
    console.log(" Length de array de productos antes de llamar el metodo "+largo.length)
    console.log(await db.deleteProduct(2))
    let despues = await db.getProducts()
    console.log( "Lenght despues " + despues.length)
    console.log("Delete Error Case")
    console.log(await db.deleteProduct(25))

    console.log("Update ")
    console.log("Objeto antes de metodo llamado con metodo get ")
    console.log(await db.getProductById(1))
    console.log(await db.updateProduct(1, { title: "Fresa" }))
    console.log("Objeto despues ")
    console.log(await db.getProductById(1))

    console.log("get resultado final")
    console.log(await db.getProducts())


}

test()



