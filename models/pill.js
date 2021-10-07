//////////////////////////////////////////////////
// Dependency
//////////////////////////////////////////////////
const mongoose = require("./connection")

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
    beforeFood: Boolean,
    afterFood: Boolean,
    quantity: Number
});

const Pill = model("Pill", pillsSchema);

module.exports = Pill;