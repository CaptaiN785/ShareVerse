const User = require("../../models/user");
require("dotenv").config()
const bcrypt = require("bcrypt")

exports.changePassword = async(req, res) => {

    try{
        
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.updateOne({email}, {password: hashedPassword});
        
        if(!user){
            return res.status(403).json({
                success:false, 
                message: "Invalid email id",
            })
        }
        res.status(200).json({
            success:true, 
            message: "Password updated successfully",
        })

    }catch(err){
        console.log("Errow while signup", err);
        res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }
}