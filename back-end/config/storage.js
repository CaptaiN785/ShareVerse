const { initializeApp } = require("firebase/app");

var firebaseApp;
const connectStorage = () => {
    try{   
        const firebaseConfig = require("../firebaseStorageKey.json")
        firebaseApp = initializeApp(firebaseConfig);
        console.log("Storage connected!")
    }catch(err){
        console.log("Error while connecting storage", err);
    }
}

module.exports = {firebaseApp, connectStorage};