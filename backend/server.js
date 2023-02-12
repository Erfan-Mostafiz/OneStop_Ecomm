const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//Config
dotenv.config({ path: "backend/config/config.env" }); // recognize the config env

// Connecting to database
connectDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://127.0.0.1:${process.env.PORT}`)
})