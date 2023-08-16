
const {sendEmail} = require("../../utils/sendEmail");
const Otp = require("../../models/otp");

exports.resendOtp = async(req, res, next) => {
    try{
        
        const {otpId, email} = req.body;

        const otp = await Otp.findById({_id: otpId});
        
        if(!otp || new Date(otp.expireson) < new Date()){
            console.log("OTP expired")

            if(otp){
                console.log("Deleting previous otp")
                const xxx = await Otp.findByIdAndDelete({_id: otpId})
            }
        
            // sending again
        
            const reOtp = ("" + Math.random()).substring(2, 8);

            if(await sendEmail(email, reOtp)){
                
                const expireson = new Date();
                expireson.setMinutes(new Date().getMinutes() + 5);

                const otpResponse = await Otp.create({
                    email:email,
                    otp: reOtp,
                    createdon: new Date(),
                    expireson,
                });

                if(otpResponse){
                    return res.status(200).json({
                        success: true,
                        message: "Otp is resent",
                        otp: otpResponse
                    })
                }else{
                    throw new Error("Unable to send OTP")   
                }
            }else{
                throw new Error("Unable to send OTP ")   
            }
        }
        if(!otp){
            return res.status(400).json({
                success: false,
                message: "Invalid resend request",
            })
        }

        if(await sendEmail(otp.email, otp.otp)){
            res.status(200).json({
                success: true,
                message: "Otp is resent",
                otp: otp
            })
        }else{
            throw new Error("Unable to send OTP")   
        }
    }catch(err){
        console.log("Error while sending otp: ", err);
        res.status(500).json({
            success:false,
            message: "Internal server error!"
        })
    }
}