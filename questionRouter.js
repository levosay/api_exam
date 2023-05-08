const Router = require('express')
const controller = require('./questionController')
const router = new Router

// router.get('/questions', controller.getQuestions)
router.get('/questions/:id', controller.getQuestions)
router.post('/questions', controller.postQuestionCreate)

module.exports = router
