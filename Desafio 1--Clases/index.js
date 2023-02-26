class ProductManager {
    constructor() {
        this.products = []
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        let id = this.products.length + 1
        if (title && description && price && thumbnail && code && stock) {
            let validator = this.products.some((el) => el.code == code)
            if (!validator) {
                let product = {
                    id: id,
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                }
                this.products.push(product)
            }else {
                console.log("Error: The code must be unique")
            }
        } else console.log("Error: Some fields are emptys")
    }

    getProducts(){
        return this.products
    }
    getProductById(id){
        let response = this.products.filter((el)=> el.id==id )
        if (response.length>0) return response
        else{
            return "Error: Not found"
        }
    }
} 