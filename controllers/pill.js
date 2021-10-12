////////////////////////////////////////
// Dependencies
////////////////////////////////////////
const express = require("express")
const Pill = require("../models/pill")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()


////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if(req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login");
    }
})


/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// Index Route
router.get("/", async (req, res) => {
    const pills = await Pill.find({username: req.session.username});
    const username = req.session.username;
    res.render("pills/index.ejs", { pills, username});
})

// New Route
router.get("/new", (req, res) => {
    res.render("pills/new.ejs")
})

// Create Route
router.post("/", (req, res) => {
    console.log(req.body)
    req.body.name = req.body.name;
    req.body.stock = req.body.stock;
    req.body.quantity = req.body.quantity;
    req.body.time = req.body.time;
    req.body.username = req.session.username
    Pill.create(req.body, (err, pill) => {
        res.redirect("/pills")
    })
})

// Edit Route
router.get("/:id/edit", (req, res) => {
    const id = req.params.id;
    Pill.findById(id, (err, pill) => {
        res.render("pills/edit.ejs", { pill })
    })
})

// Update Route
router.put("/:id", (req, res) => {
    const id = req.params.id;
    req.body.stock = req.body.stock;
    req.body.quantity = req.body.quantity;
    req.body.time = req.body.time;
    req.body.name = req.body.name;
    Pill.findByIdAndUpdate(id, req.body, {new: true}, (err, fruit) => {
        res.redirect("/pills");
    })
})

// Destroy Route
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Pill.findByIdAndRemove(id, (err, pill) =>{
        res.redirect("/pills")
    })
})

// Show Route
router.get("/:id", (req, res) => {
    const id = req.params.id
    Pill.findById(id, (err, pill) => {
        res.render("pills/show.ejs", { pill })
    })
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router