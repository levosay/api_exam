const { Schema, model } = require('mongoose')

const Topic = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  test: { type: Number, required: true, unique: true },
})

module.exports = model('Topic', Topic)
