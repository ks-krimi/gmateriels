const userModel = require('../models/User')
const jwt = require('jsonwebtoken')
const { errorsRegister, errorsLogin } = require('../utils/errors.utils')

const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
}

module.exports.register = async (req, res) => {
  const { nom, prenom, email, password, level } = req.body
  try {
    const user = await userModel.create({
      nom,
      prenom,
      email,
      password,
      level
    })
    const token = await createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge })
    res.status(201).json({ user: user._id })
  } catch (err) {
    const errors = errorsRegister(err)
    res.status(200).send({ errors })
    // res.send(err)
  }
}

module.exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await userModel.login(email, password)
    const token = await createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = errorsLogin(err)
    res.status(200).send({ errors })
  }
}

module.exports.logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.status(301).redirect('/')
}
