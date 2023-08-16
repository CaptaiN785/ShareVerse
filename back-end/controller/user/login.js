const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config()
const User = require("../../models/user")

exports.login = async(req, res) => {

    const invalidRes = {
        success:false,
        message: "Invalid username or password"
    }

    try{
        
        // on auth change to req.user
        const {username, password} = req.body;

        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json(invalidRes);
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            return res.status(400).json(invalidRes);
        }

        // Now username and password are valid
        // Generate a jwt token
        const payloadData = {
            name: user.name,
            username: username,
            email: user.email,
            id: user._id
        }
        const token = jwt.sign(payloadData, process.env.JWT_SECRET, {expiresIn: "24h"})
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly:true
        }
        const userObject = user.toObject();
        userObject.password = undefined;
        userObject.token = token;
        res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user:userObject,
            message:"User Logged in successfully!"
        })

    }catch(err){
        console.log("Error while login in.", err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

}