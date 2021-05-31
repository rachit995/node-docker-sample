const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body
    const hashPassword = await bcrypt.hash(password, 12)
    const user = await User.create({
      username,
      password: hashPassword
    })
    res.status(201).json({
      status: 'success',
      data: {
        user
      }
    })
  } catch (err) {
    res.status(500).json({
      status: 'error'
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({
      username,
    })
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }
    const isCorrect = await bcrypt.compare(password, user.password)
    if (isCorrect) {
      res.status(200).json({
        status: 'success',
        data: {
          user
        }
      })
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Incorrect username or password'
      })
    }
  } catch (err) {
    res.status(500).json({
      status: 'error'
    })
  }
}

