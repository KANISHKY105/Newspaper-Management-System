const passport = require("passport");
const User = require("../models/user");

const renderLogin = async (req, res) => {
  res.render("login");
};

const logUser = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });


  // console.log( req.body.username,req.body.password)


  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.render("userInfo")
      });
    }
  });
}


module.exports = {
  renderLogin,
  logUser,
};
