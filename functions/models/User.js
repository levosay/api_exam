const { Schema, model } = require('mongoose')

const Answer = new Schema({
  title: { type: String },
  userAnswer: { type: String },
  passAnswer: { type: String },
  pass: { type: Boolean }
})

const Topic = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  test: { type: Number, required: true, unique: true },
})

const Exams = new Schema({
  review: { type: Array(Answer) },
  date: { type: String, required: true },
  points: { type: Number, required: true },
  topic: { type: Topic },
  time: { type: String },
})

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: 'Role' }],
  exams: { type: Array(Exams) }
})

module.exports = model('User', User)
