const express = require("express");
const cors = require("cors");

// Environment vars
const port = 5000;
const db_name = "character-rpg";

require("./config/mongoose.config")(db_name);

// app is a function but it also has key value pairs on it like an object.
const app = express();

// req.body undefined without this!
app.use(express.json());
app.use(cors()); // allows cross-origin requests (across ports in our case)
require("./routes/character.route")(app);

app.listen(port, () =>
    console.log(`Listening on port ${port} for REQuests to RESpond to.`)
);