// requiring our models and passport as we've configured
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const ejs = require("ejs");

const User = require("./models/user");
const connectDB = require("./db/connect");


const loginRouter = require("./routes/login");  // routes section
const registerRouter = require("./routes/register");
const adminRouter = require("./routes/admin");
const userInfoRouter = require("./routes/userInfo.js");

const session = require("express-session"); // auth section
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { isAuth, isAdmin } = require("./middleware/authMiddleware");

const notFoundMiddleware = require("./middleware/not-found");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// app.use(isAdmin);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


// routes
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/admin", adminRouter);
app.use("/userInfo",isAuth, userInfoRouter);










app.get('/',isAuth, (req,res) =>{
    res.render("home")
});

app.post('/', (req,res) =>{
  console.log(req.body);

});

app.use(notFoundMiddleware);

// db connection
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

// this is a test comment 