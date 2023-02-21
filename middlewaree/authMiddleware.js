const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY_JWT

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: 'Пользователь не авторизован' })
    }

    req.user = jwt.verify(token, secret)
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: 'Пользователь не авторизован' })
  }
}
