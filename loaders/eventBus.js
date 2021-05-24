const { EventEmitter } = require("events")

class EventBus extends EventEmitter {

    _getCaller(stack) {
        return stack.split("\n")[3].match(/at\s(.*)\s/)[1]
    }

    _getFile(stack) {
        return stack.split("\n")[3].match(/\((.*)\)/)[1].split("\\").pop()
    }

    createEvent(name, payload) {
        const stack = new Error().stack

        return {
            name,
            origin: {
                caller: this._getCaller(stack),
                file: this._getFile(stack)
            },
            payload
        }
    }

    send(name, payload) {
        const event = this.createEvent(name, payload)
        this.emit(event.name, event)
    }

    receive(name, callback) {
        this.on(name, callback)
    }

    log(event) {
        console.log(`Event "${event.name}" emitted from ${event.origin.caller} at ${event.origin.file}`)
    }
}

const eventBus = new EventBus({ captureRejections: true })

module.exports = eventBus