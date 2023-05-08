const { Schema, model } = require('mongoose')

const Answer = new Schema({
  title: { type: String },
  userAnswer: { type: String },
  passAnswer: { type: String },
  pass: { type: Boolean }
})

const Exams = new Schema({
  review: { type: Array(Answer) },
  date: { type: String, required: true },
  points: { type: Number, required: true }
})

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
  exams: { type: Array(Exams) }
})

module.exports = model('User', User)
