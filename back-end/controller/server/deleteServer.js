
const File = require("../../models/files")
const User = require("../../models/user")
const Server = require("../../models/servers")

const {getStorage, ref, deleteObject} = require("firebase/storage")

exports.deleteServer = async(req, res) => {
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

        const serverResult = await Server.findById({_id: serverId}).populate("files")

        serverResult.files.forEach((file) => {
            try{
                const fid = new String(file._id).replace("new ObjectId(\"", "").replace("\")");
                
                File.findByIdAndDelete({_id: fid})
                .then(deleteFile => {
                    const storage = getStorage();
                    const storageRef = ref(storage, deleteFile.fullpath);
                    deleteObject(storageRef)
                    .then(() => {
                        console.log("File deleted")
                    })
                    .catch(err => {
                        console.log(err);
                    })
                });

            }catch(err){
                console.log("File not found")
            }
        })

        const serverSnapshot = await Server.findByIdAndDelete({_id: serverId})
        
        const userSnapshot = await User.findByIdAndUpdate(
            {_id: id},
            {$pull: {servers: serverId}},
            {new: true}
        )
        userSnapshot.password = undefined;
        res.status(200).json({
            success:true,
            message:"File deleted successfully",
            server: userSnapshot
        })

    }catch(err){
        console.log("Error while deleting server", err);
        res.status(500).json({
            success:false,
            message: "Internal server erorr."
        })
    }

}
