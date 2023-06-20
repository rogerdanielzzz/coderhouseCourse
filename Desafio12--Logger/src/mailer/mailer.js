import nodemailer from "nodemailer"
import env from "../config/config.js";

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: env.userEmail, // generated ethereal user
        pass: env.passwordEmail, // generated ethereal password
    },
});


export const emailSender = async (mailTo, subjectStr, htmlFunc) => {
    console.log(env.userEmail)
    console.log(mailTo)

    try {
        await transporter.sendMail({
            from: `"Prueba 🏋️" <${env.userEmail}>`, // sender address
            to: mailTo, // list of receivers
            subject: subjectStr, // Subject line
            html: htmlFunc, // html body
            dsn: {
                id: 'some random message specific id',
                return: 'headers',
                notify: ['failure', 'delay'],
                recipient: `${env.userEmail}`
            }
        });

        return { success: true }

    } catch (error) {
        console.log(error)
        return { err: "Can not send the email" }
    }



}

transporter.verify().then(() => console.log("ready for send email"))




