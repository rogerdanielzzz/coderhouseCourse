import passport from "passport";
import bcrypt from "bcrypt"
import { Strategy as GitHubStrategy } from "passport-github2";

import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../db/models/User.model.js"
import { dbM } from "../controller/sessions.controller.js";
import env from "../config/config.js"



const { clientID, clientSecret, callbackURL } = env
let encryptRounds = 1


passport.use("login", new LocalStrategy({
    usernameField: "email",
    passReqToCallback: true
},
    async (req, email, password, done) => {
        try {

            let finded = await dbM.findeUserByEmail(email?.toString().toLowerCase())

            if (!finded.success) done(null, false)
            let user = JSON.parse(JSON.stringify(finded.success))
            if (bcrypt.compareSync(password, user.password)) {

                return done(null, user)

            }
            else {
                return done(null, false)
            }

        } catch (e) {
            return done(e, false)
        }
    }))

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        const {
            first_name,
            last_name,
            age,
        } = req.body
        if (first_name !== undefined && last_name !== undefined && email !== undefined && age !== undefined && password !== undefined) {

            try {
                let obj = {}
                obj.first_name = first_name.toString()
                obj.last_name = last_name.toString()
                obj.email = email.toString().toLowerCase()
                obj.age = parseFloat(age)
                obj.password = bcrypt.hashSync(password, encryptRounds);
                let newUser = await dbM.createUser(obj)
                if (!newUser.success) done({ error: "no se pudo crear" }, false)
                done(null, newUser.success)
            } catch (e) {
                done({ error: e.message }, false)
            }
        } else done({ error: "Faltan campos obligatorios" }, false)

    }
))


passport.use("github", new GitHubStrategy({
    clientID,
    clientSecret,
    callbackURL,
    scope: ['user:email']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let email = (profile.emails?.length > 0 ? profile.emails[0].value : profile._json.email)?.toString().toLowerCase()

            let finded = await dbM.findeUserByEmail(email)
            if (finded.success) done(null, finded.success)


            let user = await UserModel.create({
                first_name: profile.displayName.split(" ")[0],
                last_name: profile.displayName.split(" ")[1] || ' ',
                email: email,
                password: ' ',
                age: 0,
            })

            if (user) done(null, user)
            else {
                done(null, false)
            }

        } catch (e) {
            done(e, false)
        }
    }))
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {

    const user = await UserModel.findById(id);
    done(null, user)
    // done(err, user)

});