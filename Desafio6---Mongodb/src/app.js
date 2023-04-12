import express from "express";
import { __dirnaname } from "./utils.js"
import handlebars from "express-handlebars";
import { Server } from "socket.io"
import { router as ProductRouter, dbInstance , dbM } from "./routes/api/product.router.js"
import { router as CartRouter} from "./routes/api/cart.router.js"
import { router as viewsRouter } from "./routes/views.router.js"
import MessageManager from "./Dao/MessagesManager.js";
import "./db/db.config.js"
const msgInstance= new MessageManager()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirnaname + "/public"))
app.use('/api/products', ProductRouter);
app.use('/api/carts', CartRouter);

app.use('/', viewsRouter);

app.engine("handlebars", handlebars.engine())
app.set("views", __dirnaname + "/views")
app.set("view engine", "handlebars")

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log("Andando en puerto " + PORT)
})

const socketServer = new Server(httpServer)
let p = 0
socketServer.on('connection', async (socket) => {
    p += 1
    console.log(`${p} connected`)

    const products = await dbM.getProducts()
    const msgs = await msgInstance.getMsgs()

    socket.emit('productList', products)
    socket.emit('messages', msgs)

    socket.on('newMsg', async obj => {
        console.log("Entro a agregar");
        try {
            
            await msgInstance.newMsg(obj)
            const updateMsg = await msgInstance.getMsgs()
            socketServer.emit('messages', updateMsg)
        } catch (error) {
            return
        }
    })


    socket.on('addProduct', async product => {
        console.log("Entro a agregar");
        try {
            // let c= await dbInstance.addProduct(product)
            // const updatedProducts = await dbInstance.getProducts()
            await dbM.addProduct(product)
            const updatedProducts = await dbM.getProducts()
            console.log(updatedProducts);

            if (Array.isArray(updatedProducts)) socketServer.emit('productList', updatedProducts)
        } catch (error) {
            return
        }
    })

    socket.on('deleteProduct', async (idProduct) => {


        try {
            console.log("ite")
            await dbM.deleteProduct(idProduct)
            const updatedProducts = await dbM.getProducts()
            if (Array.isArray(updatedProducts)) socketServer.emit('productList', updatedProducts)

        } catch (error) {
            return
        }
    })

    socket.on('disconnect', (msg) => {
        p -= 1
        console.log(`${p} connected`)
        console.log(msg);
    })

})

