const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const passport = require('passport')

const authRouter = require('./routes/auth.route')
const patientRouter = require('./routes/patient.route')

const keys = require('./config/keys')
const path = require("path");

const app = express()

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('ERROR: ', error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(cors())
app.use(morgan("dev"))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.use('/api/auth', authRouter)
app.use('/api/patient', patientRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

module.exports = app
