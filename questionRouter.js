const Router = require('express')
const controller = require('./questionController')
const router = new Router

router.get('/questions', controller.getQuestions)
router.get('/questions/:id', controller.getQuestions)

// controller.test_check()
// controller.test_text()
// controller.test_sequence()

module.exports = router
