///////////////////////////////////////
// Dependencies
///////////////////////////////////////
const mongoose = require("./connection");
const Pill = require("./pill")


///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

mongoose.connection.on("open", () => {
    // array of starter pills
    const startPills = [
        {name: "ibuprofen", color: "White", shape:"Capsule-shape", dosage: 400, after_food: true, quantity: 50}
    ]
    // Delete all pills
    Pill.deleteMany({}, (err, data) => {
        // Seed Starter Pills
        Pill.create(startPills, (err, data) => {
            console.log(data);
            // close the database connection
            mongoose.connection.close();
        })
    })
});
