const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const serverless = require('serverless-http')
const authRouter = require('./authRouter')
const questionRouter = require('./questionRouter')
const MONGO_URL = process.env.MONGO_URL || ''
const BASE_NETLIFY = process.env.BASE_NETLIFY || ''
const app = express()

app.options('*', cors())
app.use(express.json())
app.use(`${BASE_NETLIFY}/auth`, authRouter)
app.use(`${BASE_NETLIFY}/exam`, questionRouter)

mongoose.connect(MONGO_URL)

module.exports.handler = serverless(app);
