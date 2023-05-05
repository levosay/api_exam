const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const questionRouter = require('./questionRouter')
const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL
const app = express()

app.use(express.json())
app.use('/auth', authRouter)
app.use('/exam', questionRouter)

const start = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGO_URL)
    app.listen(PORT, () => console.log(`server started on ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()
