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

  async test_text () {
    const Text = new Questions.Text({
      type: 'text',
      question: 'wdsasdas',
      test: 1,
      position: 2
    })
    await Text.save()
  }

  async test_check () {
    const Check = new Questions.Check({
      type: 'checkbox',
      question: 'dfgdfgdf',
      test: 1,
      position: 4,
      answers: ['1994', '2077', '1812', '2023']
    })
    await Check.save()
  }

  async test_sequence () {
    const Sequence = new Questions.Sequence({
      type: 'sequence',
      question: 'sdfsdfsdf',
      test: 1,
      position: 5,
      answers: ['1994', '2077', '1812', '2023']
    })
    await Sequence.save()
  }
}

module.exports = new questionController()
