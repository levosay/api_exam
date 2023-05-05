const Questions = require('./models/Questions')

class questionController {
  async getQuestions (req, res) {
    try {
      const texts = await Questions.Text.find()
      const checks = await Questions.Check.find()
      res.json([...texts, ...checks])
    } catch (error) {
      console.log(error)
    }
  }

  async test_text () {
    const Text = new Questions.Text({
      type: 'text',
      question: 'Вопросы???',
      key: 'да'
    })
    await Text.save()
  }

  async test_check () {
    const Text = new Questions.Check({
      type: 'Check',
      question: 'Вопросы???',
      answers: [
        {
          key: true,
          title: '1994',
        },
        {
          key: false,
          title: '2077',
        },
        {
          key: false,
          title: '1812',
        },
        {
          key: false,
          title: '2023',
        },
      ]
    })
  }
}

module.exports = new questionController()
