const user = require("../models/user");

const renderAdmin = async(req, res)=>{
    const allUsers = await user.find({});
    res.send({allUsers, nbHits: allUsers.length});
}

module.exports = {
    renderAdmin,
}