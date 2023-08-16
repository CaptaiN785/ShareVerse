const nodemailer = require("nodemailer");
require("dotenv").config()

exports.sendEmail = async(to, otp) => {

    try{
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS
            }
        });
    
        const info = await transporter.sendMail({
            from: `ShareVerse<${process.env.MAIL_ID}>`, // sender address
            to: to, 
            subject: "OTP Verification for ShareVerse", // Subject line
            html: `<h3><p>Your OTP is: </p><b>${otp}</b></h3>`, // html body
        });
        return true;

    }catch(err){
        console.log("Error while sending OTP in util function: ", err);
        return false;
    }
}