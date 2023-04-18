import mongoose from "mongoose";

const secret= "GHwZCkTMJabQLuyu"

mongoose
.connect(`mongodb+srv://rogerperezcol:${secret}@cluster0.wffmt7d.mongodb.net/EcomerceApi?retryWrites=true&w=majority`)
.then(()=> console.log("conect to db")).catch(e=> console.log(e))