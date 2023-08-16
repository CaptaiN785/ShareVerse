const express = require("express")
const fileUpload = require("express-fileupload")
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")

// Extracting the port number from environment variable
const PORT = process.env.PORT || 4321;

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// Adding userRoutes
const {auth} = require("./middleware/auth")
const userRoute = require("./routes/userRoute")
const serverRoute = require("./routes/serverRoute")
const fileRoute = require("./routes/fileRoutes")
const otpRoute = require("./routes/otpRoute")
app.use("/user", userRoute);
app.use("/server", auth, serverRoute);
app.use("/file", auth, fileRoute);
app.use("/otp", otpRoute);

// Initializing the firebase storage and firestore database
const {connectDatabase} = require("./config/database")
const {connectStorage} = require("./config/storage")

connectDatabase()
connectStorage()

const {sendOtp} = require("./utils/sendEmail")

app.listen(PORT, () => {
    console.log("App is listening at port: ", PORT);
})

// https://firebase.google.com/docs/storage/web/delete-files
