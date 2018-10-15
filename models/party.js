const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partySchema = Schema({
  title: { type: String, required: true },
  description: {type: String},
  highlights: [{type: String}],
  img: {type: String},
  price:{
          type: Number,
          min :[ 0, 'Price can\'t be less than 0. This ain\'t no charity!']
  },
  note: {type: String}
})

const Party = mongoose.model('Party', partySchema)

module.exports = Party
