import nodemailer from "nodemailer";
import { emailTemplete } from "./emailTemplete.js";


export async function sendEmail(to,subject, userName = '' , token){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.SENDEREMAIL,
            pass: process.env.EMAILPASS,
        },
    });

    const info =  await transporter.sendMail({
        from: `RM Shop <${process.env.SENDEREMAIL}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html: emailTemplete(to,userName, token), // html body
    });

    return info;
}



