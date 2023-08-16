const express = require("express")

const userRoute = express.Router()

const {signup} = require("../controller/user/signup")
const {login} = require("../controller/user/login")
const {changePassword} = require("../controller/user/changePassword")

userRoute.post("/signup", signup)
userRoute.post("/login", login)
userRoute.post("/change-password", changePassword)
userRoute.get("/", async(req, res) => {
    res.status(200).json({
        success:true,
        message: "Welcome to ShareVerse"
    })
})

module.exports = userRoute;