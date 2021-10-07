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

router.post("/signup", (req, res) => {
    res.send("signup")
})

// The Login Routes
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    res.send("login")
})

