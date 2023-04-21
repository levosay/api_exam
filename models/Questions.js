const { Schema, model } = require('mongoose')

const Answer = new Schema({
  title: { type: String, required: true },
  key: { type: Boolean, required: true }
})

const Check = new Schema({
  type: { type: String, required: true },
  question: { type: String, required: true },
  answers: [Answer]
})

const Text = new Schema({
  type: { type: String, required: true },
  question: { type: String, required: true },
  key: { type: String, required: true }
})

module.exports = {
  Check: model('Check', Check),
  Text: model('Text', Text),
}
