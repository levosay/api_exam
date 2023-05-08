const { Schema, model } = require('mongoose')

const Question = new Schema({
  type: { type: String, required: true },
  test: { type: Number, required: true },
  position: { type: Number, required: true },
  question: { type: String, required: true },
  answers: { type: Array(String), required: false },
  key: { type: String, required: true }
})

module.exports = {
  Question: model('Question', Question)
}
