const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    username: {
        type:String,
        require: true
    },
    joinedon:{
        type:Date,
    },
    servers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Server"
    }]
})

module.exports = mongoose.model("User", userSchema);