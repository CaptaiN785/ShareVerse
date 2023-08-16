
const File = require("../../models/files")
const User = require("../../models/user")
const Server = require("../../models/servers")

const {getStorage, ref, deleteObject} = require("firebase/storage")

// Steps to do
// create a uuid for file
// upload to storage with uuid + filename
// get confirmation
// paste the url in file schema with info
// then take file id and insert into files of server of a user.

exports.deleteFile = async(req, res) => {

    try{
    
        const { serverId, fileId} = req.body;
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

        const file = await File.findByIdAndDelete({_id: fileId});

        if(!file){
            return res.status(200).json({
                success:true,
                message: "File already deleted!"
            })
        }

        // console.log(file);

        const storage = getStorage();
        const storageRef = ref(storage, file.fullpath);

        const snapshot = await deleteObject(storageRef);

        const serverSnapshot = await Server.findByIdAndUpdate(
            {_id: serverId},
            {$pull: {files: file._id}},
            {new: true}
        )
        
        res.status(200).json({
            success:true,
            message:"File deleted successfully",
            server: serverSnapshot
        })

    }catch(err){
        console.log("Error while deleting file", err);
        res.status(500).json({
            success:false,
            message: "Internal server erorr."
        })
    }

}
