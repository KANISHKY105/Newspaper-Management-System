const express = require("express");
const router = express.Router();

const { renderUserInfo, saveUserInfo } = require("../controllers/userInfo");

router.route("/")
.get(renderUserInfo)
.post(saveUserInfo);

module.exports = router;
