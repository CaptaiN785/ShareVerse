
const User = require("../../models/user")
const Server = require("../../models/servers")
// Steps to do
// create a uuid for file
// upload to storage with uuid + filename
// get confirmation
// paste the url in file schema with info
// then take file id and insert into files of server of a user.

exports.getFile = async(req, res) => {

    try{
    
        const {serverId} = req.body;
        const {id} = req.user;

        // Checking if server is owned by user.
        const serverData = await User.findById({_id: id}, {servers:1}).populate("servers");
        const serverExists = serverData.servers.some(server => {
            const sid = new String(server._id).replace("new ObjectId(\"", "").replace("\")");
            return (sid === serverId);
        })
        if(!serverExists){
            return res.status(403).json({
                success:false,
                message: "Invalid user and server request"
            })
        }
        
        const files = await Server.findById({_id: serverId}, {files:1}).populate("files");
        if(!files){
            return res.status(400).json({
                success:true,
                message:"No files in server",
                files: []
            })
        }
        
        res.status(200).json({
            success:true,
            message:"File fetched successfully",
            files: files.files
        })

    }catch(err){
        console.log("Error while fetching file", err);
        res.status(500).json({
            success:false,
            message: "Internal server erorr."
        })
    }

}
