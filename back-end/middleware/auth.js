
const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.auth = async(req, res, next) => {

    try{
        const token = req.headers.authorization?.replace("Bearer ","") || null;
        if(!token){
            return res.status(403).json({
                success:false,
                message:"Please login again!"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next()
    }catch(err){
        if(err.name === "TokenExpiredError"){
            return res.status(403).json({
                success:false,
                message: "Token expired"
            })
        }
        res.status(500).json({
            success:false,
            message: "Internal server error!"
        })
        console.log(err);
    }
}