import { UserModel as User } from "../db/models/User.model.js"
import bcrypt from 'bcrypt'
import env from "../../config/config.js"
import moment from 'moment-timezone'
moment.tz.setDefault('America/Argentina/Buenos_Aires');

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

    passwordChanger = async (userId, password) => {
        let user = await User.findById(userId)
        if (!user) throw new Error("No se encontro usuario")
        if (bcrypt.compareSync(password, user.password)) throw new Error("La contraseña no puede ser la misma")
        console.log(password, env.encryptRounds)
        user.password = bcrypt.hashSync(password, env.encryptRounds);
        await user.save()
        return user
    }
    lastConectionUpdater = async (userId) => {
        let user = await User.findById(userId)
        if (!user) throw new Error("No se encontro usuario")
        const actualTime = moment.tz('America/Argentina/Buenos_Aires').format();
        user.last_connection = actualTime;
        console.log(actualTime)
        await user.save()
        return user
    }
}

