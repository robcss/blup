const { EventEmitter } = require("events")

class EventBus extends EventEmitter {

    _getCaller(stack) {
        return stack.split("\n")[2].match(/at\s(.*)\s/)[1]
    }

    _getFile(stack) {
        return stack.split("\n")[2].match(/\((.*)\)/)[1].split("\\").pop()
    }

    createPayload(payload) {
        const stack = new Error().stack
        return {
            origin: {
                caller: this._getCaller(stack),
                file: this._getFile(stack)
            },
            payload
        }
    }
}

const eventBus = new EventBus({ captureRejections: true })

module.exports = eventBus