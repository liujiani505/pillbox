//////////////////////////////////////////////////
// Dependency
//////////////////////////////////////////////////
const mongoose = require("./connection")

//////////////////////////////////////////////////
// Model
//////////////////////////////////////////////////
const {Schema, model} = mongoose;

const pillsSchema = new Schema({
    name: String,
    stock: Number,
    type: String,
    time: String,
    dosage: Number,
    username: String,
});

const Pill = model("Pill", pillsSchema);

//////////////////////////////////////////////////
// Export Model
//////////////////////////////////////////////////
module.exports = Pill;