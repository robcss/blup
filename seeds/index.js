const mongoose = require("mongoose");
const municipalitiesDataset = require("./italy_munic_geocoded500.json");
const { randomInt, weightedRandom } = require("../utils/random");
const getImageSeeds = require("./getImageSeeds")

const Fountain = require("../models/fountain");
const Comment = require("../models/comment");
const Report = require("../models/report");

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


const municMaxIndex = municipalitiesDataset.length - 3 // avoid selecting the last two objects in the array

const seedsNumber = 20

const seedDB = async () => {

    await Fountain.deleteMany({});
    await Comment.deleteMany({});
    await Report.deleteMany({});

    const imagesSeeds = await getImageSeeds()

    for (let i = 0; i < seedsNumber; i++) {

        const munic = municipalitiesDataset[randomInt(municMaxIndex)]

        const address = {
            street: munic.indirizzo,
            city: munic.comune,
            state: munic.provincia,
            country: "Italia"
        }

        const geometry = munic.geometry

        const images = getRandomImages(imagesSeeds)

        const author = '60b8b72a56bb1632a05b6746' //John

        const fountain = new Fountain({ address, author, geometry, images })

        await fountain.save()
    }
}


const getRandomImages = (imagesSeeds) => {
    const imageCount = weightedRandom([[0, 50], [1, 25], [2, 20], [3, 5]]) //half probs of having no image

    const images = []

    for (let i = 1; i <= imageCount; i++) {
        const randomImage = imagesSeeds[randomInt(imagesSeeds.length - 1)]
        images.push(randomImage)
    }

    return images
}


seedDB().then(() => {
    console.log("DB seeded")
    mongoose.connection.close();
})


// const seedTest = async () => {
//     const fountain = new Fountain({
//         address: {
//             street: "Via Bari",
//             // number: 2,
//             // postcode: 00161,
//             city: "Roma",
//             state: "RM",
//             country: "Italia"
//         }
//     })

//     await fountain.save();
// }

// seedTest().then(() => {
//     mongoose.connection.close();
// })