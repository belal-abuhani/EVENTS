const mongoose = require('mongoose')
// const { string } = require('prop-types')

const eventSchema = mongoose.Schema({
    name :String
})

const Event = mongoose.model('Event', eventSchema)
module.exports.Event = Event