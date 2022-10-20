const Interview = require('../models/interview')
const User = require('../models/users')
const path = require('path')

const moment = require('moment')

exports.getInterview = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Interview.find().countDocuments()
        const data = await Interview.find()
            .populate("personsId")


            .skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `Сухбат рўйхати`,
            data: data,
            totalItems: totalItems
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getInterviewById = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const result = await Interview.findById(AgesId).populate("personsId")
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `ma'lumotlar topildi`,
            result: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createInterview = async (req, res, next) => {
    const personsId = req.body.personsId
    
    const textofconversation = req.body.textofconversation
    const dateofinterview = moment(req.body.dateofinterview, "DD/MM/YYYY")  //moment(req.body.dateofissue,"DD/MM/YYYY")
    const fingerprint = req.body.fingerprint
    const address = req.body.address
    const phone = req.body.phone
    let file

    if (req.files) {
         file = req.files.file
        if (file.mimetype.startsWith('image')) {
            file.name = `photo-${Date.now()}-${personsId}${path.parse(file.name).ext}`
            file.mv(`./public/interviews/${file.name}`, async (err) => {
                if (err) {
                    console.log(err);
                }
            })
        } else {
            res.status(200).json({
                message: `file is not photo`,
            })
        }
    }else{
        res.status(200).json({
            message: `add photo pls`,
        })
    }
    try {
        const result = new Interview({
            personsId: personsId,
            photos: file.name,
            textofconversation: textofconversation,
            dateofinterview: dateofinterview,
            fingerprint: fingerprint,
            phone: phone,
            address: address,
            creatorId: req.userId
        })
        const results = await result.save()
        res.status(200).json({
            message: `ma'lumotlar kiritildi`,
            results: results,
            creatorId: req.userId,
        })
    } catch (error) {
        next(error)
    }
}


exports.updateInterview = async (req, res, next) => {
    const AgesId = req.params.id
    const personsId = req.body.personsId
    const textofconversation = req.body.textofconversation
    const dateofinterview = moment(req.body.dateofinterview, "DD/MM/YYYY")  //moment(req.body.dateofissue,"DD/MM/YYYY")
    const fingerprint = req.body.fingerprint
    const phone = req.body.phone
    const address = req.body.address
    let file
    if(req.files){
         file = req.files.file
        if (file.mimetype.startsWith('image')) {
            file.name = `photo-${Date.now()}-${personsId}${path.parse(file.name).ext}`
            file.mv(`./public/interviews/${file.name}`, async (err) => {
                if (err) {
                    console.log(err);
                }
            })  
        } 
    }
      try {
        const result = await Interview.findById(AgesId)
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        result.personsId = personsId
        result.photos = file ? file.name:result.photos
        result.textofconversation = textofconversation
        result.dateofinterview = dateofinterview
        result.fingerprint = fingerprint
        result.phone = phone
        result.address = address
        const data = await result.save()
        res.status(200).json({
            message: `ma'lumotlar o'zgartirildi`,
            resultorder: data
        })
    } catch (err) {
        if (!err.statusCode) {
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    }  
}

exports.deleteInterview = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const deleteddata = await Interview.findById(AgesId)
        if (!deleteddata) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        if (deleteddata.creatorId.toString() !== req.userId) {
            const error = new Error('bu userni ochirishga imkoni yoq')
            error.statusCode = 403
            throw error
        }
        const data = await Interview.findByIdAndRemove(AgesId)
        res.status(200).json({
            message: 'Interview is deletes',
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.findeByPersonId = async (req, res, next) => {
    const personId = req.params.id
    try {
        const result = await Interview
            .find({ "personsId": personId })
            .populate("personsId")
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `ma'lumotlar topildi`,
            result: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }


}

