const Questions = require('./models/Questions')

class questionController {
  async getQuestions (req, res) {
    try {
      const testId = req.params.id
      const texts = await Questions.Text.find().where('test').equals(testId)
      const checks = await Questions.Check.find().where('test').equals(testId)
      res.json([...texts, ...checks])
    } catch (error) {
      console.log(error)
    }
  }

  async postQuestionText (req, res) {
    try {
      const { type, test, position, question, key } = req.body
      const newQuestion = new Questions.Text({
        type,
        test,
        position,
        question,
        key
      })

      await newQuestion.save()
      return res.json({ message: 'Вопрос успешно создан' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Create error' })
    }
  }

  async postQuestionCheck (req, res) {
    try {
      const { type, test, position, question, answers, key } = req.body
      const newQuestion = new Questions.Check({
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

  async postQuestionSequence (req, res) {
    try {
      const { type, test, position, question, answers, key } = req.body
      const newQuestion = new Questions.Sequence({
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
