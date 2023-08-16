const { initializeApp } = require("firebase/app");
require("dotenv").config()
var firebaseApp;
const connectStorage = () => {
    try{
        const config = {
            apiKey: process.env.apiKey,
            authDomain:process.env.authDomain,
            projectId:process.env.projectId,
            storageBucket:process.env.storageBucket,
            messagingSenderId:process.env.messagingSenderId,
            appId:process.env.appId,
            measurementId:process.env.measurementId
        }
        firebaseApp = initializeApp(config);
        console.log("Storage connected!")
    }catch(err){
        console.log("Error while connecting storage", err);
    }
}

module.exports = {firebaseApp, connectStorage};