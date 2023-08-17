import dotenv from "dotenv";
dotenv.config();

const env = {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    passwordDb: process.env.passwordDb,
    userDb: process.env.userDb,
    hostDb: process.env.hostDb,
    nameDb: process.env.nameDb,
    PORT: process.env.PORT,
    passwordEmail: process.env.passwordEmail,
    userEmail: process.env.userEmail,
    encryptExpiration: process.env.encryptExpiration,
    encryptKey: process.env.encryptKey,
    encryptRounds: parseInt(process.env.encryptRounds) || 1,
    API_URL: process.env.API_URL || "http://localhost:8080/",
    callbackURL: `${process.env.API_URL || "http://localhost:8080/"} + ${process.env.callbackURL}`,

}

export default env