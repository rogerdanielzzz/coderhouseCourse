import UserManager from '../DAL/Dao/UserManager.js';
import { emailSender } from "../mailer/mailer.js"
import { passwordRecovery } from "../mailer/templates/passwordRecovery.js"
import env from "../config/config.js"
import jwt from 'jsonwebtoken'

export const dbM = new UserManager()

export const loginController = async (req, res) => {
    res.status(200).json({ result: true })
}

export const logoutController = async (req, res) => {

    try {

        await dbM.lastConectionUpdater(req.user._id)
        req.session.destroy(() => {
            req.logout((err) => console.log(err))
            res.status(200).json({ success: true, msg: "Session finalizada" })

        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, error: error.message })

    }
}

export const passwordRecoveryController = async (req, res) => {

    try {

        const finded = await dbM.findeUserByEmail(req.body.email)
        let user = finded.success
        if (!user) return res.status(404).json({ success: false, error: "No se encontro usuario con ese email" })

        let token = jwt.sign({ email: user.email, _id: user._id }, env.encryptKey, {
            expiresIn: env.encryptExpiration
        });

        await emailSender(user.email, "Recupera contraseña", passwordRecovery(user.first_name, token))

        return res.status(200).json({ msg: "Email Enviado", success: true })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })

    }
}

export const passwordUpdaterController = async (req, res) => {

    try {
        const { token, password } = req.body
        jwt.verify(token, env.encryptKey, async (err, decoded) => {

            if (err) {
                return res.status(400).json({ expired: true, success: false, error: "El link ha expirado, o es invalido" });
            } else {
                try {
                    await dbM.passwordChanger(decoded._id, password)

                    return res.status(201).json({ success: true, msg: "La contraseña ha sido actualizada", });
                } catch (error) {
                    return res.status(500).json({ success: false, error: error.message })
                }

            }
        })


    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })

    }
}

export const signUpController = async (req, res) => {

    if (req.user) res.status(200).json({ result: req.user })

}








