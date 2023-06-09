// requiring our models and passport as we've configured
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const ejs = require("ejs");
const socketio = require('socket.io')


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
app.use("/userInfo", userInfoRouter);




app.get('/', isAuth, (req, res) => {
  console.log(req.query)

  res.render("home", { username: req.query.username });
});

app.post('/', (req,res) =>{
  // console.log(req.body);
  res.send("done")

});

app.get('/chats', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

app.use(notFoundMiddleware);

// db connection
const port = process.env.PORT || 3000;
const socketPort = process.env.PORT || 9000;



const expressServer = app.listen(socketPort);
const io = socketio(expressServer);

io.of('chats').on('connection',(socket)=>{
    socket.emit('messageFromServer',{data:"Welcome to the socketio server"});
    socket.on('messageToServer',(dataFromClient)=>{
        console.log(dataFromClient)
    })
    socket.on('newMessageToServer',(msg)=>{
        // console.log(msg)
        io.of('chats').emit('messageToClients',{text:msg.text})
    })
})










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