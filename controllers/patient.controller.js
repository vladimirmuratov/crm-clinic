const errorHandler = require('../utils/errorHandler')
const Patient = require('../models/Patient')

module.exports.getAll = async function (req, res) {
    try {
        const patients = await Patient.find({user: req.user.id})
        res.status(200).json(patients)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const patient = new Patient({
        user: req.user.id,
        name: req.body.name,
        date: req.body.date,
        amount: +req.body.amount,
        birthday: req.body.birthday,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        auto: req.body.auto,
        passport: req.body.passport,
        oms: req.body.oms,
        contract: req.body.contract,
        info: req.body.info
    })
    try {
        await patient.save()
        res.status(201).json(patient)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const payload = req.body

    try {
        const patient = await Patient.findOneAndUpdate(
            {_id: req.params.id},
            {$set: payload},
            {new: true}
        )
        res.status(200).json(patient)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.delete = async function (req, res) {
    try{
        await Patient.deleteOne({_id: req.params.id})
        res.status(200).json({message: 'Данные удалены'})
    }catch (e) {
        errorHandler(res, e)
    }
}
