import UserManager from '../DAL/Dao/UserManager.js';

export const dbM = new UserManager()

export const loginController= async (req, res) => {
    console.log("entro")
    res.status(200).json({ result: true })
}

export const logoutController= async  (req, res) => {

    try {
        req.session.destroy(() => {
            req.logout((err)=>console.log(err))  
            res.status(200).json({ success: true, msg: "Session finalizada" })

        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, error: error.message })

    }
}

export const signUpController= async (req, res) => {

    if (req.user) res.status(200).json({ result: req.user })

}








