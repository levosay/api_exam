const Router = require('express')
const controller = require('./questionController')
const router = new Router
const authMiddleware = require('./middlewaree/authMiddleware')

// router.get('/questions', controller.getQuestions)
router.get('/questions/:id', authMiddleware, controller.getQuestions)
router.post('/questions', authMiddleware,controller.postQuestionCreate)
router.post('/answers', authMiddleware, controller.postAnswers )

module.exports = router
