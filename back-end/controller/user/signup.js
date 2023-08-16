const User = require("../../models/user");
require("dotenv").config()
const bcrypt = require("bcrypt")

exports.signup = async(req, res) => {

    try{
        
        const {username, name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userExist = await User.findOne({$or: [{username}, {email}]});

        if(userExist){
            return res.status(400).json({
                success:false,
                message: "Username or email already exists"
            })            
        }

        const user = await User.create({
            username, 
            name, 
            email, 
            password: hashedPassword,
            joinedon: new Date()
        })

        user.password = undefined;

        res.status(200).json({
            success:true, 
            message: "User created successfully",
            data:user
        })
    }catch(err){
        console.log("Errow while signup", err);
        res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }
}