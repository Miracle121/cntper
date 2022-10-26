const Cntpeople = require('../models/cntpeople')
const path = require('path')
const User = require('../models/users')
const {validationResult, body} = require('express-validator')
const  moment = require('moment')

exports.getCntpeople= async(req,res,next)=>{
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Cntpeople.find().countDocuments()
     const data = await Cntpeople.find()
     .populate('typeofperson', 'name')
     .populate('gender', 'name')
     .populate('nationality', 'name')
     .populate('regionId', 'name')
     .populate('districtsId', 'name')
     .populate('mfyId', 'name')
     .populate('typeofcrime', 'name')
     .populate('statusofpeople', 'name')
     .populate({
        path:'criminalstatus',
        populate:[
            {
                path: 'criminalcase',
                select: 'name'
            },
            {
                path: 'criminalcodex',
                select: 'name'
            },

        ]
     })
     .populate('creatorId','name')       
     .skip((page-1)*counts).limit(counts)
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
        .populate('typeofperson', 'name')
        .populate('gender', 'name')
        .populate('nationality', 'name')
        .populate('regionId', 'name')
        .populate('districtsId', 'name')
        .populate('mfyId', 'name')
        .populate('typeofcrime', 'name')
        .populate('statusofpeople', 'name')
        .populate({
        path:'criminalstatus',
        populate:[
            {
                path: 'criminalcase',
                select: 'name'
            },
            {
                path: 'criminalcodex',
                select: 'name'
            },

        ]
        })
        .populate('creatorId','name')

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

//Ishlatilmayapti hozir hammasi form dataga otganligi uchun
exports.createCntpeople = async(req,res,next)=>{

    const typeofperson= req.body.typeofperson
    const typeofcrime = req.body.typeofcrime      
    const name = req.body.name
    const birth = moment(req.body.birth,"DD/MM/YYYY")
    const photo = req.body.photo
    const country = req.body.country
    const passport = req.body.passport
    const personal_code = req.body.personal_code
    const gender= req.body.gender
    const nationality = req.body.nationality
    const phone = req.body.phone
    const regionId = req.body.regionId
    const districtsId = req.body.districtsId
    const mfyId = req.body.mfyId
    const address = req.body.address
    const workplace= req.body.workplace
    const basisconsideration = req.body.basisconsideration
    const dateofregistration =  moment(req.body.dateofregistration,"DD/MM/YYYY")
    const detailsoffence = req.body.detailsoffence
    const reasonsoffence = req.body.reasonsoffence
    const prerequisitecondition = req.body.prerequisitecondition

    const statusofpeople = req.body.statusofpeople
    const criminalstatus = req.body.criminalstatus
    // const criminalcase = req.body.criminalcase
    // const criminalcodex = req.body.criminalcodex

    try {
        const result = new Cntpeople({
            typeofperson:typeofperson,
            typeofcrime:typeofcrime,
            name:name,
            birth:birth,
            photo:photo,
            country:country,
            passport:passport,
            personal_code:personal_code,
            gender:gender,
            nationality:nationality,
            phone:phone,
            regionId:regionId,
            districtsId:districtsId,
            mfyId:mfyId,
            address:address,
            workplace:workplace,
            basisconsideration:basisconsideration,
            dateofregistration:dateofregistration,
            detailsoffence:detailsoffence,
            reasonsoffence:reasonsoffence,
            prerequisitecondition:prerequisitecondition,
            statusofpeople:statusofpeople,
            criminalstatus:criminalstatus,
            // criminalcase:criminalcase,
            // criminalcodex:criminalcodex,
            creatorId: req.userId
        })
        const results = await result.save()
        res.status(200).json({
            message:`Ro'yxatga olingan shaxslar`,
            data: results,
            creatorId: req.userId,
        })        
    } catch (error) {
        next(error)        
    }  
}

exports.updateCntpeople = async(req,res,next)=>{ 
    const AgesId= req.params.id
    const name= req.body.name
    const birth =moment(req.body.birth  ,"DD/MM/YYYY")
    const personal_code = req.body.personal_code
    const passport= req.body.passport
    const phone= req.body.phone
    const nationality= req.body.nationality
    const gender= req.body.gender
    const country= req.body.country
    const regionId= req.body.regionId
    const districtsId= req.body.districtsId
    const mfyId= req.body.mfyId
    const address= req.body.address
    const workplace= req.body.workplace
    const typeofperson= req.body.typeofperson
    const typeofcrime= req.body.typeofcrime
    const basisconsideration= req.body.basisconsideration
    const detailsoffence= req.body.detailsoffence
    const reasonsoffence= req.body.reasonsoffence
    const prerequisitecondition= req.body.prerequisitecondition
    const statusofpeople= req.body.statusofpeople
    const convicted= req.body.convicted
    const criminalstatus= req.body.criminalstatus ? JSON.parse(req.body.criminalstatus) : null
    const dateofregistration=  moment(req.body.dateofregistration  ,"DD/MM/YYYY") 
    let file   = null
    if(req.files){
         file = req.files.file      
         if(file.mimetype.startsWith('image')){        
            file.name = `photo-${personal_code}${path.parse(file.name).ext}`    
            file.mv(`./public/peoplephoto/${file.name}`,async(err)=>{
                if(err){
                    console.log(err);
                }
            })
            }
        else{
            res.status(422).json({
                message:`file is not photo format`,
            })   
        }
    }   
    try {
        const result = await Cntpeople.findById(AgesId)
        if(!result){
            res.satatus(404).json({
                message:`M'lumot topilmadi`,
            })
        }        
        result.name= name
        result.birth=birth      
        result.photo= file ? file.name : result.photo
        result.country=country
        result.passport=passport
        result.personal_code=personal_code
        result.gender=gender
        result.nationality=nationality
        result.phone=phone
        result.regionId=regionId
        result.districtsId=districtsId
        result.mfyId=mfyId
        result.address=address
        result.workplace=workplace
        result.basisconsideration=basisconsideration
        result.dateofregistration=dateofregistration
        result.detailsoffence=detailsoffence
        result.reasonsoffence=reasonsoffence
        result.prerequisitecondition=prerequisitecondition
        result.statusofpeople=statusofpeople       
        result.typeofperson=typeofperson
        result.typeofcrime=typeofcrime
        result.convicted=convicted
        result.criminalstatus=criminalstatus
        const data =await result.save()         
        res.status(200).json({
            message:`Ro'yxatga olingan shaxslar`,
            data: data,
            creatorId: req.userId,
        })               
    } 
    catch (err) {
        res.status(500).json({
            message:`Ro'yxatga olishda xatolik`,
            data: err,
            creatorId: req.userId,
        })
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

exports.findperson= async(req,res,next)=>{
    
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    const name = req.get('name') || null
    const passport = req.get('passport') || null
    const personal_code = req.get('personal_code') || null
    const phone = req.get('phone') || null
    let que = {}
    let queorder = {}
    let oredercount
    if (name) {
        que.name = name
        queorder.name = name
    }
    if (passport) {
        que.passport = passport
        queorder.passport = passport
    }
    if (personal_code) {
        que.personal_code = personal_code
        queorder.personal_code = personal_code
    }
    if (phone) {
        que.phone = phone
        queorder.phone = phone
    }

    try {
        
        totalItems = await Cntpeople.find(que).countDocuments()
        oredercount = await Cntpeople.find(que)         
            .skip((page - 1) * counts)
            .limit(counts)

        res.status(200).json({
            message: `Фуқарони топилди`,
            oreders: oredercount,
            totalItems: totalItems 
            
        })

    } catch (err) {
       
        next(err)
    }

}

exports.findpersonByName= async(req,res,next)=>{
    
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    const name = req.get('name') || null
    let que = {}
    let queorder = {}
    let oredercount
    if (name) {
        que.name = name
        queorder.name = name
    }
    console.log(que);
   
    try {
        
        totalItems = await Cntpeople.find(que).countDocuments()
        oredercount = await Cntpeople.find(que)  
        .populate('typeofperson', 'name')
        .populate('gender', 'name')
        .populate('nationality', 'name')
        .populate('regionId', 'name')
        .populate('districtsId', 'name')
        .populate('mfyId', 'name')
        .populate('typeofcrime', 'name')
        .populate('statusofpeople', 'name')
        .populate({
           path:'criminalstatus',
           populate:[
               {
                   path: 'criminalcase',
                   select: 'name'
               },
               {
                   path: 'criminalcodex',
                   select: 'name'
               },
   
           ]
       })       
            .skip((page - 1) * counts)
            .limit(counts)

        res.status(200).json({
            message: `Фуқарони топилди`,
            oreders: oredercount,
            totalItems: totalItems 
            
        })

    } catch (err) {
       
        next(err)
    }

}

exports.findpersonByRegId= async(req,res,next)=>{    
    // console.log("keldi");
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    const name = req.get('name') || null
    const regionId = req.get('regionId') || null
    const districtsId = req.get('districtsId') || null
    const mfyId = req.get('mfyId') || null
    const phone = req.get('phone') || null
    let que = {}
    let queorder = {}
    let oredercount
    if (name) {
        que.name = name
        queorder.name = name
        
    }
    if (regionId) {
        que.regionId = regionId
        queorder.regionId = regionId
    }
    if (districtsId) {
        que.districtsId = districtsId
        queorder.districtsId = districtsId
    }
    if (mfyId) {
        que.mfyId = mfyId
        queorder.mfyId = mfyId
    }
    // if (phone) {
    //     que.phone = phone
    //     queorder.phone = phone
    // }
    // console.log(que);

    try {
        
        totalItems = await Cntpeople.find(que).countDocuments()
        oredercount = await Cntpeople.find(que) 

            .skip((page - 1) * counts)
            .limit(counts)
        res.status(200).json({
            message: `Фуқарони топилди`,
            oreders: oredercount,
            totalItems: totalItems             
        })
    } catch (err) {
       
        next(err)
    }
}

exports.createByUseingFileUploads = async(req,res,next)=>{
    
    const name= req.body.name
    const birth =moment(req.body.birth  ,"DD/MM/YYYY")
    const personal_code = req.body.personal_code
    const passport= req.body.passport
    const phone= req.body.phone
    const nationality= req.body.nationality
    const gender= req.body.gender
    const country= req.body.country
    const regionId= req.body.regionId
    const districtsId= req.body.districtsId
    const mfyId= req.body.mfyId
    const address= req.body.address
    const workplace= req.body.workplace
    const typeofperson= req.body.typeofperson
    const typeofcrime= req.body.typeofcrime
    const basisconsideration= req.body.basisconsideration
    const detailsoffence= req.body.detailsoffence
    const reasonsoffence= req.body.reasonsoffence
    const prerequisitecondition= req.body.prerequisitecondition
    const statusofpeople= req.body.statusofpeople
    const convicted= req.body.convicted
    const criminalstatus= JSON.parse(req.body.criminalstatus)  

    const dateofregistration=  moment(req.body.dateofregistration  ,"DD/MM/YYYY") 
    const file = req.files.file
    
    if(file.mimetype.startsWith('image')){
        file.name = `photo-${personal_code}${path.parse(file.name).ext}`     
    file.mv(`./public/peoplephoto/${file.name}`,async(err)=>{
       if(err){
           console.log(err);
       }
   })
    try {
           const result = new Cntpeople({
            typeofperson:typeofperson,
            typeofcrime:typeofcrime,
            name:name,
            birth:birth,
            photo:file.name,
            country:country,
            passport:passport,
            personal_code:personal_code,
            gender:gender,
            nationality:nationality,
            phone:phone,
            regionId:regionId,
            districtsId:districtsId,
            mfyId:mfyId,
            address:address,
            workplace:workplace,
            basisconsideration:basisconsideration,
            dateofregistration:dateofregistration,
            detailsoffence:detailsoffence,
            reasonsoffence:reasonsoffence,
            prerequisitecondition:prerequisitecondition,
            statusofpeople:statusofpeople,
            criminalstatus:criminalstatus,
            convicted:convicted,
            creatorId: req.userId
        })
        const results = await result.save()
        res.status(200).json({
            message:`Ro'yxatga olingan shaxslar`,
            data: results,
            creatorId: req.userId,
        })            
    } 
    catch (err) {
        res.status(500).json({
            message:`Ro'yxatga olishda xatolik`,
            data: err,
            creatorId: req.userId,
        })
        next(err)
    }
        
    }
    else{
        res.status(422).json({
            message:`file is not photo format`,
        })   
    }

    
}

exports.findByCreatorId= async(req,res,next)=>{
    const creatorId= req.params.id
    // console.log(creatorId);
    const page = req.query.page ||1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
     totalItems = await Cntpeople.find().countDocuments()
     const data = await Cntpeople.find({'creatorId':creatorId})
     .populate('typeofperson', 'name')
     .populate('gender', 'name')
     .populate('nationality', 'name')
     .populate('regionId', 'name')
     .populate('districtsId', 'name')
     .populate('mfyId', 'name')
     .populate('typeofcrime', 'name')
     .populate('statusofpeople', 'name')
     .populate({
        path:'criminalstatus',
        populate:[
            {
                path: 'criminalcase',
                select: 'name'
            },
            {
                path: 'criminalcodex',
                select: 'name'
            },

        ]
    })
    .skip((page-1)*counts).limit(counts)
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