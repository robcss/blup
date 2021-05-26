const { MAPBOX_TOKEN } = require("../config")

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")

const mapboxGeocoder = mbxGeocoding({ accessToken: MAPBOX_TOKEN })

module.exports = mapboxGeocoder