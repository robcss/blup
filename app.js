const express = require("express")
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/fountain-finder', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.get("/", (req, res) => {
    res.send("Hey")
})


const port = 3100
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})