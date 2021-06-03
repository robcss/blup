const mongoose = require("mongoose");
const municipalitiesDataset = require("./italy_munic_geocoded500.json");
const { randomInt, randArrayElem, weightedRandom } = require("../utils/random");
const getImageSeeds = require("./getImageSeeds")
const authorSeeds = require("./authorSeeds")
const commentSeeds = require("./commentSeeds")

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

const seedsNumber = 100

const seedDB = async () => {

    await Fountain.deleteMany({});
    await Comment.deleteMany({});
    await Report.deleteMany({});

    const imagesSeeds = await getImageSeeds()
    const authors = authorSeeds.local

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

        const author = randArrayElem(authors)

        const { verificationCount, verifications } = getRandomVerifications(authors)

        const comments = await getRandomComments(commentSeeds, authors)

        const fountain = new Fountain({ address, author, geometry, images, verificationCount, verifications, comments })

        await fountain.save()
    }
}


const getRandomImages = (imagesSeeds) => {
    const imageCount = weightedRandom([[0, 50], [1, 25], [2, 20], [3, 5]]) //half probs of having no image

    const images = []

    for (let i = 1; i <= imageCount; i++) {
        const randomImage = randArrayElem(imagesSeeds)
        images.push(randomImage)
    }

    return images
}

const getRandomVerifications = (authors) => {
    const verificationCount = randomInt(authors.length) * randomInt(1) //half probs of having no verif

    const verifications = authors.slice(0, verificationCount)

    return { verificationCount, verifications }
}

const getRandomComments = async (commentSeeds, authors) => {
    const commentCount = randomInt(2)

    const comments = []

    for (let i = 1; i <= commentCount; i++) {
        const newComment = new Comment({
            body: randArrayElem(commentSeeds),
            author: randArrayElem(authors)
        })

        await newComment.save()

        comments.push(newComment._id)
    }

    return comments
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