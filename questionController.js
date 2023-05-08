const Questions = require('./models/Questions')

class questionController {
  async getQuestions (req, res) {
    try {
      const testId = req.params.id
      const question = await Questions.Question.find().select("-key").where('test').equals(testId).sort({ position: 1 })
      res.json(question)
    } catch (error) {
      console.log(error)
    }
  }

  // async postAnswers (req, res) {
  //
  // }

  async postQuestionCreate (req, res) {
    try {
      const { type, test, position, question, answers, key } = req.body
      const newQuestion = new Questions.Question({
        type,
        test,
        position,
        question,
        answers,
        key
      })

      await newQuestion.save()
      return res.json({ message: 'Вопрос успешно создан' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Create error' })
    }
  }
}

module.exports = new questionController()
