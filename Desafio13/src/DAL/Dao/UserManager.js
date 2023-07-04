import { UserModel as User } from "../db/models/User.model.js"

export default class UserManager {
    createUser = async (userPar) => {

        let user = await User.create(userPar)
        return {
            success: user ? user : false
        }


    }
    findeUserByEmail = async (email) => {

        let user = await User.findOne({ email: email.toLowerCase() })
        return {
            success: user ? user : false
        }
    }

    passwordChanger = async (userId, passwordEncrypted) => {
        let user = await User.findById(userId)
        if (!user) throw new Error("No se encontro usuario")
        if (user.password === passwordEncrypted) throw new Error("La contraseña no puede ser la misma")
        user.password = passwordEncrypted
        user.save()
        return user
    }
}

