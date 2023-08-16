const express = require("express")

const otpRoute = express.Router()

const {sendOtp} = require("../controller/otp/sendOtp");
const {resendOtp} = require("../controller/otp/resendOtp");
const {verifyOtp} = require("../controller/otp/verifyOtp");

otpRoute.post("/send", sendOtp);
otpRoute.post("/resend", resendOtp);
otpRoute.post("/verify", verifyOtp);

module.exports = otpRoute;