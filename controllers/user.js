////////////////////////////////////////
// Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();


/////////////////////////////////////////
// Routes
/////////////////////////////////////////
// The Signup Routes
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    // create new user
    User.create(req.body, (err, user) => {
        res.redirect("/user/login")
    })
})

// The Login Routes
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    // get the data from the request body
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        // check if user exsits
        if (!user) {
            res.send("Sorry, user doesn't exist.")
        } else {
            // check if password matches
            const result = bcrypt.compareSync(password, user.password);
            if (result) {
                req.session.username = username;
                req.session.loggedIn = true;
                res.redirect("/pills");
            } else {
                res.send("Opps, wrong password.")
            }
        }
    })
})

// The logout route
router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.redirect("/")
    })
})



//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;