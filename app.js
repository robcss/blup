const express = require("express")
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require("mongoose")
const ejsMate = require('ejs-mate')

const Fountain = require("./models/fountain")

mongoose.connect('mongodb://localhost:27017/fountain-finder', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/fountains", async (req, res) => {
    const fountains = await Fountain.find({})
    res.render("fountains/index", { fountains })
})

app.get("/fountains/new", async (req, res) => {
    res.render("fountains/new")
})

app.post("/fountains", async (req, res) => {
    const { address } = req.body
    const newFountain = new Fountain({ address })
    await newFountain.save()

    res.redirect(`/fountains/${newFountain._id}`)
})

app.get("/fountains/:id", async (req, res) => {
    const { id } = req.params

    const fountain = await Fountain.findById(id)
    res.render("fountains/show", { fountain })
})

app.get("/fountains/:id/edit", async (req, res) => {
    const { id } = req.params

    const fountain = await Fountain.findById(id)
    res.render("fountains/edit", { fountain })
})


app.put("/fountains/:id", async (req, res) => {
    const { id } = req.params
    const { address } = req.body

    const fountain = await Fountain.findByIdAndUpdate(id, { address })

    res.redirect(`/fountains/${fountain._id}`)
})


app.delete("/fountains/:id", async (req, res) => {
    const { id } = req.params

    await Fountain.findByIdAndDelete(id)

    res.redirect("/fountains")
})


app.use((err, req, res, next) => {
    res.send(err)
})

const port = 3100
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})