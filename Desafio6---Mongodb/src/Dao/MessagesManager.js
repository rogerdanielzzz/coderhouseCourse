import { MessagesModel } from "../db/models/Messages.model.js"

export default class MessageManager {

    newMsg = async ({ user, message }) => {
        try {
           let msg = await MessagesModel.create({user, message})
            return msg
        } catch (error) {
            console.log(error)
            return error
        }
    }

    getMsgs = async () => {
        try {
            const data = await MessagesModel.find()
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    }



}
