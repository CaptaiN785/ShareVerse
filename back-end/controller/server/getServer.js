const User = require("../../models/user")

exports.getServer = async(req, res) => {
    try{
        const {id} = req.user;
        const servers = await User.findById(id, {servers: 1}).populate("servers");

        if(!servers){
            return res.status(400).json({
                success:false,
                message: "Invalid user access"
            })
        }
        res.status(200).json({
            success:true,
            message:"Server fetched!",
            servers: servers?.servers
        })
    }catch(err){
        console.log("Error while fetching servers: ", err);
        res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }
}