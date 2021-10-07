////////////////////////////////////////
// Dependencies
////////////////////////////////////////
const express = require("express")
const Pill = require("../models/pill")


/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()


/////////////////////////////////////////
// Routes
/////////////////////////////////////////
// Seed Database
router.get("/seed", (req, res) => {
    // array of starter pills
    const startPills = [
        {name: "ibuprofen", color: "White", shape:"Capsule-shape", dosage: 400, after_food: true, quantity: 50}
    ]
    // Delete all pills
    Pill.remove({}, (err, data) => {
        // Seed Starter Pills
        Pill.create(startPills, (err, data) => {
            res.json(data);
        })
    })
})

// Index Route
router.get("/", async (req, res) => {
    const pills = await Pill.find({});
    res.render("pills/index.ejs", { pills });
})

// New Route
router.get("/new", (req, res) => {
    res.render("pills/new.ejs")
})

// Create Route
router.post("/", (req, res) => {
    req.body.name = req.body.name;
    req.body.color = req.body.color;
    req.body.shape = req.body.shape;
    req.body.beforeFood = req.body.beforeFood;
    req.body.afterFood = req.body.afterFood;
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
    req.body.name = req.body.name;
    req.body.color = req.body.color;
    req.body.shape = req.body.shape;
    req.body.beforeFood = req.body.beforeFood;
    req.body.afterFood = req.body.afterFood;
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