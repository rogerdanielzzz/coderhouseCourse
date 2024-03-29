import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnails: [{
        //Ver
        type: String,
    }],
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        //Ver
        type: Boolean,
        default: true,
    },
    category: {
        type: String,
        required: true
    }

})

export const ProductsModel = mongoose.model("Product", ProductSchema)