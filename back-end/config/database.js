const mongoose = require("mongoose")
require("dotenv").config()

exports.connectDatabase = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected!")
    })
    .catch(err => {
        console.log("Error while connecting database: ", err)
    })
}