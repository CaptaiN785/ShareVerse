
const mongoose = require("mongoose")


const fileSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    uploadedat: {
        type:Date,
        required:true,
    },
    fullpath:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("File", fileSchema);