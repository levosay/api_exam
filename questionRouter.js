const Router = require('express')
const controller = require('./questionController')
const router = new Router

router.get('/questions', controller.getQuestions)

module.exports = router
