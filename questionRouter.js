const Router = require('express')
const controller = require('./questionController')
const router = new Router

router.get('/questions', controller.getQuestions)
router.get('/questions/:id', controller.getQuestions)
router.post('/test-text', controller.postQuestionText)
router.post('/test_check', controller.postQuestionCheck)
router.post('/test_sequence', controller.postQuestionSequence)

module.exports = router
