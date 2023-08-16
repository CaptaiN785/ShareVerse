const uuid = require("uuid")

exports.getPath = (id, serverId, name) => {
    // create a uuid
    const uid = uuid.v4()
    return id + "/" + serverId + "/" + uid + "-" + name;
}
