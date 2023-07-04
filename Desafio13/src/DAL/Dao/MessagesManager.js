import { MessagesModel } from "../db/models/Messages.model.js"

export default class MessageManager {

    newMsg = async ({ user, message }) => {

        let msg = await MessagesModel.create({ user, message })
        return msg

    }

    getMsgs = async () => {
        const data = await MessagesModel.find()
        return data
    }



}
