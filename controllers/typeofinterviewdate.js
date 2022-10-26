const Typeofinterviewdate = require('../models/typeofinterviewdate')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getTypeofinterviewdate= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Typeofinterviewdate.find().countDocuments()
     const data = await Typeofinterviewdate.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Суҳбат санаси турлари`,
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

exports.getTypeofinterviewdateById = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const result= await Typeofinterviewdate.findById(AgesId)
        if(!result){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`Суҳбат санаси турлари`,
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

exports.createTypeofinterviewdate = async(req,res,next)=>{
    const name = req.body.name
    const unixtime = req.body.unixtime
    const result = new Typeofinterviewdate({
        name:name,
        unixtime:unixtime,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message:`Суҳбат санаси турлари`,
        results: results,
        creatorId: req.userId,
    })
}

exports.updateTypeofinterviewdate = async(req,res,next)=>{ 
    const AgesId = req.params.id
    const name = req.body.name
    const unixtime = req.body.unixtime

    try {
    const result = await Typeofinterviewdate.findById(AgesId)
    if(!result){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    result.name= name
    result.unixtime=unixtime
    const data =await result.save()  
    res.status(200).json({
        message:`Суҳбат санаси турлари`,
        resultorder: data
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

exports.deleteTypeofinterviewdate = async(req,res,next)=>{
    const AgesId= req.params.id
    try {
        const deleteddata = await Typeofinterviewdate.findById(AgesId)
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
    const data=await Typeofinterviewdate.findByIdAndRemove(AgesId)
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