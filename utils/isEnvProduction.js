const { NODE_ENV } = require("../config")

module.exports = () => {
    return NODE_ENV === "production"
}