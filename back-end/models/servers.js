const mongoose = require("mongoose")


const serverSchame = mongoose.Schema({

    name:{
        type:String,
        required: true,
    },
    type:{
        type: String,
        enum: ['public', 'private'],
        default: "private"
    },
    files:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"File"
    }],
    password:{
        type:String
    },
    createdat:{
        type: Date,
    }
})

module.exports = mongoose.model("Server", serverSchame);