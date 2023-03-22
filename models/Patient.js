const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    amount: {
        type: Number
    },
    birthday: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    auto: {
        type: String
    },
    passport: {
        type: String
    },
    oms: {
        type: String
    },
    contract: {
        type: String
    },
    info: {
        type: String
    }
})

module.exports = mongoose.model('patients', patientSchema)
