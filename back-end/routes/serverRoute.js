const express = require("express")

const serverRoute = express.Router()

const {createServer} = require("../controller/server/createServer")
const {getServer} = require("../controller/server/getServer")
const {deleteServer} = require("../controller/server/deleteServer")

serverRoute.post("/create", createServer);
serverRoute.post("/delete", deleteServer);
serverRoute.post("/get", getServer);


module.exports = serverRoute;