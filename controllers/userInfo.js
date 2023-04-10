const User = require("../models/user");
const userInfo = require("../models/userInfo");

const renderUserInfo = async(req, res) => {

  const userEmail = req.session.email;
  // console.log("this is it");

  // console.log(userEmail);
  // console.log("this is it");


  // const data = await userInfo.find({userID:"642a05e8a223835dc58a9126"})
  // const data1 = await User.findOne({_id:"642a05e8a223835dc58a9126"})
  // console.log(data)
  // console.log(data1)
  res.render("userInfo");
};

const saveUserInfo = async (req, res) => {
  const { email } = req.body;
  const username = email;
  const result = { username: username };

  const userId = await User.findOne(result);

  const userID = userId._id.toString();
  const userIDs = userID.split(" ")[1];

  const { name, address, startDate, endDate } = req.body;

  try {
    // update the user object in the 'users' collection based on their email
    const result = await userInfo.updateOne(
      { userID },
      { $set: { name, address, startDate, endDate } },
      { upsert: true }
    );

    // send a success response
    res.status(200).json({
      message: "User info saved to database",
      userId: result.upsertedId || result.modifiedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to save user info to database",
    });
  }
};

module.exports = { renderUserInfo, saveUserInfo };
