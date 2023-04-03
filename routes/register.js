const express = require("express");
const router = express.Router();

const { renderRegister, saveUser } = require("../controllers/register");

router.route("/")
.get(renderRegister)
.post(saveUser);

module.exports = router;
