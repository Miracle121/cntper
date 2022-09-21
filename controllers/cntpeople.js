const Cntpeople = require('../models/cntpeople')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getCntpeople= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Cntpeople.find().countDocuments()
     const data = await Cntpeople.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Ro'yxatga olingan shaxslar`,
         data:data,
         totalItems:totalItems
     })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    } 
}

exports.getCntpeopleById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Cntpeople.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Ro'yxatga olingan shaxslar`,
            data:result
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createCntpeople = async(req,res,next)=>{
    const name = req.body.name
    const birth = req.body.birth
    const photo = req.body.photo
    const country = req.body.country
    const passport = req.body.passport
    const personal_code = req.body.personal_code
    const gender= req.body.gender
    const nationality = req.body.nationality
    const phone = req.body.phone
    const result = new Cntpeople({
        name:name,
        birth:birth,
        photo:photo,
        country:country,
        passport:passport,
        personal_code:personal_code,
        gender:gender,
        nationality:nationality,
        phone:phone,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Ro'yxatga olingan shaxslar`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updateCntpeople = async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    const birth = req.body.birth
    const photo = req.body.photo
    const country = req.body.country
    const passport = req.body.passport
    const personal_code = req.body.personal_code
    const gender= req.body.gender
    const nationality = req.body.nationality
    const phone = req.body.phone
    try {
    const result = await Cntpeople.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
    result.birth=birth
    result.photo=photo
    result.country=country
    result.passport=passport
    result.personal_code=personal_code
    result.gender=gender
    result.nationality=nationality
    result.phone=phone
    const data =await result.save()  
    res.status(200).json({
        message:`Ro'yxatga olingan shaxslar`,
        data: data
    })
    } catch (err) {
        if(!err.statusCode){
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.deleteCntpeople = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Cntpeople.findById(AgesId)
    if(!deleteddata){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    if(deleteddata.creatorId.toString()!==req.userId){
        const error = new Error('Royxatga olingan shaxslar')
        error.statusCode =403
        throw error
    }
    const data=await Cntpeople.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'Region is deletes',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}