const passport = require("passport");
const User = require("../models/user");


const renderRegister = async (req, res) => {
  res.render("register");
};

const saveUser = (req, res) => {
  console.log(req.body.username)
  User.register({ username: req.body.username },req.body.password,(err, userk) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("login");
        });
      }
    }
  );
};


module.exports = {
  renderRegister,
  saveUser,
};
