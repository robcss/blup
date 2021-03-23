const express = require("express")
const path = require('path');
const mongoose = require("mongoose")
const ejsMate = require('ejs-mate')

const Fountain = require("./models/fountain")

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

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/fountains", async (req, res) => {
    const fountains = await Fountain.find({})
    res.render("fountains/index", { fountains })
})


const port = 3100
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})