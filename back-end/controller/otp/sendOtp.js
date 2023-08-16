
const {sendEmail} = require("../../utils/sendEmail");
const Otp = require("../../models/otp");
const User = require("../../models/user")

exports.sendOtp = async(req, res) => {
    try{
        
        const {email} = req.body;
        
        if(req.query?.reset){
            console.log("Verifying user")
            const user = await User.findOne({email})
            if(!user){
                return res.status(403).json({
                    success:false,
                    message: "Invalid email id"
                });
            }
        }

        const otp = ("" + Math.random()).substring(2, 8);

        if(await sendEmail(email, otp)){
            
            const expireson = new Date();
            expireson.setMinutes(new Date().getMinutes() + 5);

            const otpResponse = await Otp.create({
                email,
                otp: otp,
                createdon: new Date(),
                expireson,
            });

            if(otpResponse){
                res.status(200).json({
                    success: true,
                    message: "Otp is sent",
                    otp: otpResponse
                })
            }else{
                throw new Error("Unable to send OTP")   
            }
        }else{
            throw new Error("Unable to send OTP ")   
        }
    }catch(err){
        console.log("Error while sending otp: ", err);
        res.status(500).json({
            success:false,
            message: "Internal server error!"
        })
    }
}