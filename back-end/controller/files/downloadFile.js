
const File = require("../../models/files")
const User = require("../../models/user")
const Server = require("../../models/servers")

const {getStorage, ref, getDownloadURL } = require("firebase/storage")

// Steps to do
// create a uuid for file
// upload to storage with uuid + filename
// get confirmation
// paste the url in file schema with info
// then take file id and insert into files of server of a user.

exports.downloadFile = async(req, res) => {

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

        const file = await File.findById({_id: fileId});

        if(!file){
            return res.status(403).json({
                success:false,
                message: "File not found"
            })
        }

        // console.log(file);

        const storage = getStorage();
        const storageRef = ref(storage, file.fullpath);

        const url = await getDownloadURL(storageRef);
        
        res.status(200).json({
            success:true,
            message:"Download link generated successfully",
            url:url,
        })

    }catch(err){
        console.log("Error while downloadin file", err);
        res.status(500).json({
            success:false,
            message: "Internal server erorr."
        })
    }

}
