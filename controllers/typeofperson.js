const Typeofperson = require('../models/typeofperson')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getTypeofperson= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Typeofperson.find().countDocuments()
     const data = await Typeofperson.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Тип людей`,
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

exports.getTypeofpersonById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Typeofperson.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
            result:result
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createTypeofperson = async(req,res,next)=>{
    const name = req.body.name
    const result = new Typeofperson({
        name:name,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`ma'lumotlar kiritildi`,
        results: results,
        creatorId: req.userId,
    })
}

exports.updateTypeofperson= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    try {
    const result = await Typeofperson.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
    const data =await result.save()  
    res.status(200).json({
        message:`ma'lumotlar o'zgartirildi`,
        resultorder: data
    })
    } catch (err) {
        // if(!err.statusCode){
        //     const error = new Error('Intenall error11111')
        //     error.statusCode = 500
        //     throw error
        // }
        next(err)
    }
}

exports.deleteTypeofperson = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Typeofperson.findById(AgesId)
    if(!deleteddata){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    if(deleteddata.creatorId.toString()!==req.userId){
        const error = new Error('bu userni ochirishga imkoni yoq')
        error.statusCode =403
        throw error
    }
    const data=await Typeofperson.findByIdAndRemove(AgesId)
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