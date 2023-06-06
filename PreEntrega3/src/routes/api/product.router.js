import { Router } from 'express';
//import ProductManager from "../../../ProductManager.js"
import ProductManagerDB from '../../Dao/ProductManagerDB.js';
import {
getProducts,
getOneProductById,
createProduct,
productDeleter,
productUpdater
}from "../../controller/product.controller.js"

// Importar todos los routers;
export const router = Router();

router.get("/",getProducts)

// Endpoint para traer el producto solicitado by id en el params
router.get("/:pid", getOneProductById)

router.post("/",createProduct)

router.put("/:pid",productUpdater)

router.delete("/:pid", productDeleter)






