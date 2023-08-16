const Otp = require("../../models/otp");

exports.verifyOtp = async(req, res) => {
    try{
        
        const {otpId, otp} = req.body;

        const otpRes = await Otp.findById({_id: otpId});

        if(!otpRes || new Date(otpRes.expireson) < new Date()){
            console.log("OTP expired")
            if(otp){
                console.log("Deleting previous otp")
                const xxx = await Otp.findByIdAndDelete({_id: otpId})
            }
            return res.status(400).json({
                success:false,
                message: "Otp is expired!"
            })           
        }

        if(otpRes.otp !== otp){
            return res.status(401).json({
                success:false,
                message: "Invalid Otp"
            }) 
        }
        return res.status(200).json({
            success:true,
            message: "Otp verified successfully"
        })
    }catch(err){
        console.log("Error while verifying otp: ", err);
        res.status(500).json({
            success:false,
            message: "Internal server error!"
        })
    }
}