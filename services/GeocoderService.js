const mapboxGeocoder = require("../loaders/mapboxGeocoder")

class GeocoderService {

    composeQuery(address) {
        const query = `${address.number} ${address.street} ${address.postcode} ${address.city} ${address.state} ${address.country}`
        return query
    }


    async geocode(query) {
        const geoJSONData = await mapboxGeocoder.forwardGeocode({
            query,
            limit: 1
        }).send()

        return geoJSONData
    }

    async geocodeFromAddress(address) {
        const query = this.composeQuery(address)
        const geoJSONData = await this.geocode(query)
        return geoJSONData
    }

    getGeometry(geoJSONData) {
        return geoJSONData.body.features[0].geometry
    }

}

module.exports = new GeocoderService