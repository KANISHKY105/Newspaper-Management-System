const User = require("../models/user");
const userInfo = require("../models/userInfo");

const renderUserInfo = (req, res) => {
  res.render("userInfo");
};

const saveUserInfo = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  console.log(email);
  const username = email;
  console.log(typeof username);
  const result = { username: username };

  console.log(typeof result);
  console.log(result);

  const userId = await User.findOne(result);
  console.log(userId);

  const userID = userId._id.toString();
  const userIDs = userID.split(" ")[1];

  console.log(userIDs);

  console.log("This is important");

  const { name, address, startDate, endDate } = req.body;
  console.log(userID);
  console.log(name);
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
