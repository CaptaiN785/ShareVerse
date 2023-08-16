const mongoose = require("mongoose")


const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdon:{
        type:Date,
        required:true,
    },
    expireson:{
        type:Date,
        required:true,
    }
})

module.exports = mongoose.model("Otp", otpSchema);