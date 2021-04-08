const express = require("express")
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require("mongoose")
const ejsMate = require('ejs-mate')

const ExpressError = require("./utils/ExpressError")

const fountains = require("./routes/fountains")
const comments = require("./routes/comments")

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
app.use(express.text())

app.use(express.static(path.join(__dirname, 'public')))



app.use("/fountains", fountains)
app.use("/fountains/:id/comments", comments)

app.get("/", (req, res) => {
    res.render("home")
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


const port = 3100
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})