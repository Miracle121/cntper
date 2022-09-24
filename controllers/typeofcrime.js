const Typeofcrime = require('../models/typeofcrime')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getTypeofcrime= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Typeofcrime.find().countDocuments()
     const data = await Typeofcrime.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`тип преступления`,
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

exports.getTypeofcrimeById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Typeofcrime.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`тип преступления`,
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

exports.createTypeofcrime = async(req,res,next)=>{
    const name = req.body.name
    const result = new Typeofcrime({
        name:name,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`тип преступления`,
        results: results,
        creatorId: req.userId,
    })
}

exports.updateTypeofcrime= async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    try {
    const result = await Typeofcrime.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
    const data =await result.save()  
    res.status(200).json({
        message:`тип преступления`,
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

exports.deleteTypeofcrime = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Typeofcrime.findById(AgesId)
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
    const data=await Typeofcrime.findByIdAndRemove(AgesId)
    res.status(200).json({
        message:'тип преступления',
        data:data   
    })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode =500
        }
        next(err)
    }
}