const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const keys = require('../config/keys')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({login: req.body.login})

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if (passwordResult) {
            const token = jwt.sign({
                userId: candidate._id,
                login: candidate.login
            }, keys.jwt, {expiresIn: 3600})

            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(401).json({message: 'Пароль не верен'})
        }
    } else {
        res.status(404).json({message: 'Такой пользователь не найден'})
    }
}

module.exports.register = async function (req, res) {
    const candidate = await User.findOne({login: req.body.login})

    if (candidate) {
        res.status(409).json({message: 'Такой логин уже существует'})
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            login: req.body.login,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }

}
