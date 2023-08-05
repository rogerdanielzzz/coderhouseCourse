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
    PORT: process.env.PORT,
    passwordEmail: process.env.passwordEmail,
    userEmail: process.env.userEmail,
    encryptExpiration: process.env.encryptExpiration,
    encryptKey: process.env.encryptKey,
    encryptRounds: parseInt(process.env.encryptRounds) || 1
}

export default env