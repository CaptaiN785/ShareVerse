
const File = require("../../models/files")
const User = require("../../models/user")
const Server = require("../../models/servers")
const fs = require("fs")
const {getStorage, ref, uploadBytes} = require("firebase/storage")
const { getPath } = require("../../utils/getPath")

// Steps to do
// create a uuid for file
// upload to storage with uuid + filename
// get confirmation
// paste the url in file schema with info
// then take file id and insert into files of server of a user.

exports.uploadFile = async(req, res) => {

    try{
    
        const {name, serverId} = req.body;
        const {id} = req.user;
        const fileFromRequest = req.files.file;

        const file = fs.readFileSync(fileFromRequest.tempFilePath)

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
        
        
        const filePath = getPath(id, serverId, fileFromRequest.name);

        const storage = getStorage();
        const storageRef = ref(storage, filePath);

        // // 'file' comes from the Blob or File API
        const snapshot = await uploadBytes(storageRef, file);

        if(!snapshot){
            throw Error("Error while uploading to storage.")
        }

        const fileSnapshot = await File.create({
            name,
            uploadedat: new Date(),
            fullpath: snapshot.metadata.fullPath,
        })

        if(!fileSnapshot){
            throw Error("Error while adding file to database.")
        }

        const serverSnapshot = await Server.findByIdAndUpdate(
            {_id: serverId},
            {$push: {files: fileSnapshot._id}},
            {new: true})
        
        res.status(200).json({
            success:true,
            message:"File uploaded successfully",
            file: fileSnapshot
        })

    }catch(err){
        console.log("Error while uploading file", err);
        res.status(500).json({
            success:false,
            message: "Internal server erorr."
        })
    }

}
