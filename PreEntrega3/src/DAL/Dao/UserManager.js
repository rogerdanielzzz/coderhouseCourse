import { UserModel as User } from "../db/models/User.model.js"

export default class UserManager {
    createUser = async (userPar) => {

        let user = await User.create(userPar)
        return {
            success: user ? user : false
        }


    }
    findeUserByEmail = async (email) => {

        let user = await User.findOne({ email: email })
        return {
            success: user ? user : false
        }
    }
}

