const User = require('./models/User')
const Role = require('./models/Role')
const Questions = require('./models/Questions')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY_JWT

const generateAccessToken = (id, roles) => {
  const payload = { id, roles }
  return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {
  async signUp (req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400)
          .json({ message: 'Ошибка при регистрации', errors })
      }
      const { username, password } = req.body
      const candidate = await User.findOne({ username })
      if (candidate) {
        return res.status(400)
          .json({ message: 'Пользователь с таким именем уже существует' })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({ value: 'USER' })
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value]
      })
      await user.save()
      return res.json({ message: 'Пользователь успешно зарегистрирован' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Registration error' })
    }
  }

  async signIn (req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        return res.status(400)
          .json({ message: `Пользователь ${username} не найден` })
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` })
      }
      const token = generateAccessToken(user._id, user.roles)
      return res.json({ token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Login error' })
    }
  }

  async getUsers (req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      console.log(error)
    }
  }

  async getUser (req, res) {
    try {
      const user = await User.findById(req.params.id)
      user.set('password', undefined )
      res.json(user)
    } catch (error) {
      console.log(error)
    }
  }

  async getMe (req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const userId = jwt.verify(token, secret).id
      const user = await User.findById(userId)
      user.set('password', undefined )
      res.json(user)
    } catch (error) {
      console.log(error)
    }
  }

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
    await Text.save()
  }


}

module.exports = new authController()
