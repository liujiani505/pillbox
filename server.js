//////////////////////////////////////////////////
// Dependencies
//////////////////////////////////////////////////
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");


//////////////////////////////////////////////////
// Database Connection
//////////////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(DATABASE_URL, CONFIG)
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))


//////////////////////////////////////////////////
// Models
//////////////////////////////////////////////////
const {Schema, model} = mongoose;

const pillsSchema = new Schema({
    name: String,
    description: String,
    color: String,
    shape: String,
    dosage: Number,
    after_food: Boolean,
    quantity: Number
});

const Pill = model("Pill", pillsSchema);


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



//////////////////////////////////////////////////
// Routes
//////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("Hello PillBox!")
})

// Seed Database
app.get("/pills/seed", (req, res) => {
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
app.get("/pills", async (req, res) =>{
    const pills = await Pill.find({});
    res.render("pills/index.ejs", { pills });
})


// Show Route
app.get("/pills/:id", (req, res) => {
    const id = req.params.id
    Pill.findById(id, (err, pill) => {
        res.render("pills/show.ejs", { pill })
    })
})

//////////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))