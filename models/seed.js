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
        {name: "ibuprofen", stock: 20, type: "capsule", time: "10:45 am", dosage: 2
        }
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

