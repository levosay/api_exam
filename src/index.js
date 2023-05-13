const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const questionRouter = require('./questionRouter')
// const PORT = process.env.PORT || 5000
const MONGO_URL = 'mongodb+srv://levosay:oTk1EvUK72GwOSkg@cluster0.q04abek.mongodb.net/?retryWrites=true&w=majority'
const app = express()
const serverless = require('serverless-http')

app.use(express.json())
app.use('/auth', authRouter)
app.use('/exam', questionRouter)

mongoose.connect(MONGO_URL)
app.listen(5000, () => console.log(`server started on ${5000}`))
module.exports.handler = serverless(app)

// const start = async () => {
//   try {
//     mongoose.set('strictQuery', false)
//     await mongoose.connect(MONGO_URL)
//     app.listen(PORT, () => console.log(`server started on ${PORT}`))
//   } catch (error) {
//     console.log(error)
//   }
// }
//
// start()
