const cities = require("./italy_munic.json")
const { randomInt } = require("../utils")


const citiesMaxIndex = cities.length - 3 // avoid selecting the last two objects in the array

const seedsNumber = 50

for (let i = 0; i < seedsNumber; i++) {
    const randIndex = randomInt(citiesMaxIndex)
    const city = cities[randIndex]
    console.log(city)
}
