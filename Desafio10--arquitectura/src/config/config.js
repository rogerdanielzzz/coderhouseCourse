import dotenv from "dotenv";
dotenv.config();

const env = {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    passwordDb: process.env.passwordDb,
    userDb: process.env.userDb,
    hostDb: process.env.hostDb,
    nameDb: process.env.nameDb,
}

export default env