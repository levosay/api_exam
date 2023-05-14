const Router = require('express')
const controller = require('./questionController')
const router = new Router
// const authMiddleware = require('./middlewaree/authMiddleware')

// router.get('/questions', controller.getQuestions)
router.get('/questions/:id', controller.getQuestions)
router.post('/questions',controller.postQuestionCreate)
router.post('/answers', controller.postAnswers)
router.get('/topic', controller.getTopicQuestion)
router.post('/topic', controller.postTopicQuestion)

module.exports = router
