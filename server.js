//////////////////////////////////////////////////
// Dependencies
//////////////////////////////////////////////////
const express = require("express");
const middleware = require("./utils/middleware");

//////////////////////////////////////////////////
// Create Express app
//////////////////////////////////////////////////
const app = express();

//////////////////////////////////////////////////
// Register Middleware
//////////////////////////////////////////////////
middleware(app);

//////////////////////////////////////////////////
// Server Listener
//////////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))

