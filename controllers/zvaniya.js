const Zvaniya = require('../models/zvaniya')
const User = require('../models/users')
const {validationResult} = require('express-validator')

exports.getZvaniya= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Zvaniya.find().countDocuments()
     const zvaniya = await Zvaniya.find().skip((page-1)*counts).limit(counts)
     res.status(200).json({
         message:`Daraja yuborildi`,
         zvaniya:zvaniya,
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

exports.getZvaniyaById = async(req,res,next)=>{
    const zvaniyaId= req.params.id
    try {
        const zvaniya= await Zvaniya.findById(zvaniyaId)
        if(!zvaniya){
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message:`ma'lumotlar topildi`,
            zvaniya:zvaniya
        })
    } catch (err) {
        if(!err.statusCode)
        {
            err.statusCode =500
        }
        next(err)
    }
}

exports.createZvaniya = async(req,res,next)=>{
    const name = req.body.name
    const zvaniya = new Zvaniya({
        name:name,
        creatorId: req.userId
    })
    const zvn = await zvaniya.save()
    res.status(200).json({
        message:`ma'lumotlar kiritildi`,
        zvn: zvn,
        creatorId: req.userId,
    })
}


exports.updateZvaniya = async(req,res,next)=>{ 
    const zvaniyaId = req.params.id
    const name = req.body.name
    try {
    const zvaniya = await Zvaniya.findById(zvaniyaId)
    if(!zvaniya){
        const error = new Error('Object  not found')
        error.statusCode = 404
        throw error
    }
    zvaniya.name= name
  
    const data =await zvaniya.save()  
    res.status(200).json({
        message:`ma'lumotlar o'zgartirildi`,
        zvaniya: data
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

exports.deleteZvaniya = async(req,res,next)=>{
    const zvaniyaId= req.params.id
    try {
        const deleteddata = await Zvaniya.findById(zvaniyaId)
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
    const data=await Zvaniya.findByIdAndRemove(zvaniyaId)
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