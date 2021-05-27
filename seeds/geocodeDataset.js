const fs = require("fs")
const seedrandom = require('seedrandom')

const seedString = "geocoded500"
const rng = seedrandom(seedString)

const predictableRandomInt = (n) => {
    return Math.floor(rng() * n);
}

const GeocoderService = require("../services/GeocoderService")

const municipalitiesDataset = require("./italy_munic.json")

const municMaxIndex = municipalitiesDataset.length - 3 // avoid selecting the last two objects in the array

const municToGecode = 500

const geocodedMunicipalities = []

const geocodeDataset = async () => {

    for (let i = 0; i < municToGecode; i++) {
        const randIndex = predictableRandomInt(municMaxIndex)

        const munic = municipalitiesDataset[randIndex]

        const address = {
            street: munic.indirizzo,
            city: munic.comune,
            state: munic.provincia,
            country: "Italia"
        }

        const geoData = await GeocoderService.geocodeFromAddress(address)

        munic.geometry = GeocoderService.getGeometry(geoData)

        geocodedMunicipalities.push(munic)
    }
}

geocodeDataset().then(() => {
    console.log("Sucessfully geocoded")
    fs.writeFileSync(`italy_munic_${seedString}.json`, JSON.stringify(geocodedMunicipalities))
    console.log("Json file written")
})


