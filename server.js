//////////////////////////////////////////////////
// Dependencies
//////////////////////////////////////////////////
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const PillRouter = require("./controllers/pill");
const UserRouter = require("./controllers/user");
const session = require("express-session");
const MongoStore = require("connect-mongo")

//////////////////////////////////////////////////
// Create Express app
//////////////////////////////////////////////////
const app = express();


//////////////////////////////////////////////////
// Middleware
//////////////////////////////////////////////////
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
}))
app.use("/pills", PillRouter);
app.use("/user", UserRouter);

//////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.render("index.ejs")
})


//////////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))