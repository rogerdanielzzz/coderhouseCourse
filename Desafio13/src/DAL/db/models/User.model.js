import mongoose from "mongoose";




const UserSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },
    
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    last_connection:{
        type: Date,
    }

})

export const UserModel = mongoose.model("User", UserSchema)