const { Schema, model } = require('mongoose')

const Check = new Schema({
  type: { type: String, required: true },
  test: { type: Number, required: true },
  position: { type: Number, required: true },
  question: { type: String, required: true },
  answers: {type: Array(String), required: true},
  key: {type: String, required: true},
})

const Text = new Schema({
  type: { type: String, required: true },
  test: { type: Number, required: true },
  position: { type: Number, required: true },
  question: { type: String, required: true },
  key: {type: String, required: true},
})

const Sequence = new Schema({
  type: { type: String, required: true },
  test: { type: Number, required: true },
  position: { type: Number, required: true },
  question: { type: String, required: true },
  answers: {type: Array(String), required: true},
  key: {type: String, required: true},
})

module.exports = {
  Check: model('Check', Check),
  Text: model('Text', Text),
  Sequence: model('Sequence', Sequence),
}
