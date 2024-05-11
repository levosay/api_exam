const Questions = require('./models/Questions')
const Topic = require('./models/Topic')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const secret = process.env.SECRET_KEY_JWT

class questionController {
  async getQuestions (req, res) {
    try {
      const testId = req.params.id
      const question = await Questions.Question
        .find()
        .select('-key')
        .where('test')
        .equals(testId)
        .sort({ position: 1 })
      res.json(question)
    } catch (error) {
      console.log(error)
    }
  }

  async postAnswers (req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const userId = jwt.verify(token, secret).id
      const user = await User.findById(userId)

      const { topicId, questionData, time } = req.body
      const topic = await Topic.findOne({test: topicId})

      const countQuestions = Object.keys(questionData).length
      let countQuestionsPass = 0
      const hintData = []

      for (const field in questionData) {
        const answerReview = {}
        const passAnswer = await Questions.Question.findById(field)
        const userAnswer = questionData[field].answers
        const questionType = passAnswer.type

        switch (questionType) {
          case 'text': {
            answerReview.title = passAnswer.question
            answerReview.userAnswer = userAnswer[0]
            answerReview.passAnswer = passAnswer.key

            if (userAnswer[0].toLowerCase() === passAnswer.key.toLowerCase()) {
              countQuestionsPass += 1
              answerReview.pass = true
            }
            else {
              answerReview.pass = false
            }

            hintData.push(answerReview)
            break
          }
          case 'checkbox': {
            answerReview.title = passAnswer.question
            answerReview.userAnswer = userAnswer.join(', ')
            answerReview.passAnswer = passAnswer.key

            if (userAnswer.join(' ') === passAnswer.key) {
              countQuestionsPass += 1
              answerReview.pass = true
            }
            else {
              answerReview.pass = false
            }

            hintData.push(answerReview)
            break
          }
          case 'radio': {
            answerReview.title = passAnswer.question
            answerReview.userAnswer = userAnswer.join(', ')
            answerReview.passAnswer = passAnswer.key

            if (userAnswer.join(' ') === passAnswer.key) {
              countQuestionsPass += 1
              answerReview.pass = true
            }
            else {
              answerReview.pass = false
            }

            hintData.push(answerReview)
            break
          }
          case 'sequence': {
            answerReview.title = passAnswer.question
            answerReview.userAnswer = userAnswer[0]
            answerReview.passAnswer = passAnswer.key

            const userAnswerStr = userAnswer[0].split(',')
              .sort((a, b) => a - b)
              .join('')
            const passAnswerStr = passAnswer.key.split(',')
              .sort((a, b) => a - b)
              .join('')

            if (userAnswerStr === passAnswerStr) {
              countQuestionsPass += 1
              answerReview.pass = true
            }
            else {
              answerReview.pass = false
            }

            hintData.push(answerReview)
            break
          }
        }
      }

      const points = Math.floor(countQuestionsPass * 100 / countQuestions)
      const date = `${new Date().toLocaleDateString()} ${new Date().toTimeString()
        .match(/^\d.:\d.:\d./)['0']}`

      user.exams = [
        ...user.exams, {
          review: hintData,
          date,
          points,
          topic,
          time
        }
      ]

      await user.save()

      return res.json(points)
    } catch (error) {
      console.log(error)
    }
  }

  async postQuestionCreate (req, res) {
    try {
      const { questions, test } = req.body

      const topic = await Topic.findOne({ test })
      if (!topic) {
        return res.status(400)
          .json({ message: 'Тема не найдена "test"' })
      }

      for (let i = 0; i < questions.length; i++) {
        const { type, test, position, question, answers, key } = questions[i]

        const newQuestion = new Questions.Question({
          type,
          test,
          position,
          question,
          answers,
          key
        })

        await newQuestion.save()
      }

      return res.json({ message: questions.length > 1 ? 'Вопросы успешно созданы' :'Вопрос успешно создан' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: `Create error: ${error}` })
    }
  }

  async getTopicQuestion (req, res) {
    try {
      const topic = await Topic.find().sort({ test: 1 })

      res.json(topic)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Find error' })
    }
  }

  async postTopicQuestion (req, res) {
    try {
      const { title, description, test } = req.body
      const newTopic = new Topic({
        title,
        description,
        test
      })

      await newTopic.save()
      return res.json({ message: 'Тема успешно создана' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Create error' })
    }
  }
}

module.exports = new questionController()
