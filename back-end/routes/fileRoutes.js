const express = require("express")

const fileRoute = express.Router()

const {uploadFile} = require("../controller/files/uploadFile")
const {deleteFile} = require("../controller/files/deleteFile")
const {downloadFile} = require("../controller/files/downloadFile")
const { getFile } = require("../controller/files/getFile")

fileRoute.post("/upload", uploadFile);
fileRoute.post("/delete", deleteFile);
fileRoute.post("/download", downloadFile);
fileRoute.post("/get", getFile);
fileRoute.get("/", async(req, res) => {
    res.json({
        message: "Welcome to file section"
    })
})

module.exports = fileRoute;