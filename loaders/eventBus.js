const { EventEmitter } = require("events")

// class EventBus extends EventEmitter { }

const eventBus = new EventEmitter({ captureRejections: true })

module.exports = eventBus