import { Router } from 'express';
import {
    createCart,
    getCart,
    cartUpdater,
    cartCleaner,
    addProductToCart,
    deleteProductFromCart,
    incrementProduct
} from '../../controller/cart.controller.js';
export const router = Router();

router.post("/", createCart)

router.get("/:cid", getCart)

router.put("/:cid", cartUpdater)

router.delete("/:cid", cartCleaner)

router.post("/:cid/product/:pid", addProductToCart)

router.delete("/:cid/product/:pid", deleteProductFromCart)

router.put("/:cid/product/:pid", incrementProduct)

