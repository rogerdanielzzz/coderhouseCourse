import { Router } from 'express';
//import ProductManager from "../../../ProductManager.js"
import UserManager from '../../Dao/UserManager.js';
import passport from 'passport';

export const dbM = new UserManager()

// Importar todos los routers;
export const router = Router();


router.post("/login", passport.authenticate("login"), async (req, res) => {
    console.log("entro")
    res.status(200).json({ result: true })
})

router.delete('/logout', (req, res) => {

    try {
        req.session.destroy(() => {
            req.logout((err)=>console.log(err))  
            res.status(200).json({ success: true, msg: "Session finalizada" })

        })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })

    }
})

router.post("/registro", passport.authenticate("signup"), async (req, res) => {

    if (req.user) res.status(200).json({ result: req.user })

})

router.get('/signup/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github', passport.authenticate('github'), async (req, res) => {
    if (req.user) res.redirect("../../products")
})






