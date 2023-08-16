
const { populate } = require("dotenv");
const Server = require("../../models/servers")
const User = require("../../models/user")

exports.createServer = async(req, res) => {


    try{

        const {name} = req.body;
        const {id} = req.user;
        const type="public"
        const password = ""
        
        const server = await Server.create({
            name,
            type,
            password,
            createdat: new Date()
        })

        // checking if server already exists
        const servers = await User.findById(id, {servers: 1}).populate("servers");

        const serverExists = servers?.servers?.some(server => {return (server.name === name)}) || null;

        if(serverExists){
            return res.status(400).json({
                success:false,
                message: "Server already exists"
            })
        }

        const user = await User.findByIdAndUpdate(
            {_id: id}, 
            {$push : {servers : server._id}}, 
            {new:true})
            .populate("servers");

        res.status(200).json({
            message: "Server created successfully",
            success:true,
            servers: user.servers
        })
    }catch(err){
        console.log("Error while creating server: ", err);
        res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }

}