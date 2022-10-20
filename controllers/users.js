const Districts = require('../models/districts')
const Region = require('../models/regions')
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const path = require('path')

exports.getUsers = async (req, res, next) => {

    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await User.find().countDocuments()
        const users = await User.find()
            .populate('regionId', 'name')
            .populate('districtsId', 'name')
            .populate('mfyId', 'name')
            .populate('gender', 'name')
            .populate('accountstatus', 'name')
            .populate('accountrole', 'name')
            .populate('zvaniya', 'name')
            .skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `Userlar royxati`,
            users: users,
            totalItems: totalItems
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getUsersById = async (req, res, next) => {
    const userId = req.params.id
    try {
        const users = await User.findById(userId)
            .populate('regionId', 'name')
            .populate('districtsId', 'name')
            .populate('mfyId', 'name')
            .populate('gender', 'name')
            .populate('accountstatus', 'name')
            .populate('accountrole', 'name')
            .populate('zvaniya', 'name')

        if (!users) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `ma'lumotlar topildi`,
            data: users
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

}

exports.CreateUsers = async (req, res, next) => {

    try {
        const file = req.files.file
        const name = req.body.name
        const secondname = req.body.secondname
        const middlename = req.body.middlename
        const position = req.body.position
        const regionId = req.body.regionId
        const districtsId = req.body.districtsId
        const mfyId = req.body.mfyId    // || "616ab9acb6baea42eeb58717"
        const gender = req.body.gender
        const email = req.body.email
        const password = req.body.password
        const accountstatus = req.body.accountstatus
        const accountrole = req.body.accountrole
        const zvaniya = req.body.zvaniya
        const phone = req.body.phone

        if (file.mimetype.startsWith('image')) {
            file.name = `photo-${email}${path.parse(file.name).ext}`
            file.mv(`./public/usersphoto/${file.name}`, async (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
        const hashpass = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashpass,
            name: name,
            secondname: secondname,
            middlename: middlename,
            photos: file.name,
            position: position,
            regionId: regionId,
            districtsId: districtsId,
            mfyId: mfyId,
            gender: gender,
            accountstatus: accountstatus,
            accountrole: accountrole,
            zvaniya: zvaniya,
            phone: phone,
            creatorId: req.userId
        })

        const users = await user.save()
        res.status(201).json({
            message: 'User bazaga kiritildi',
            users: users
        })
    } catch (err) {

        next(err)
    }
}

exports.UpdateUsers = async (req, res, next) => {
   
    const userId = req.params.id
    // const file = req.files.file
    const name = req.body.name
    const secondname = req.body.secondname
    const middlename = req.body.middlename
    const position = req.body.position
    const regionId = req.body.regionId
    const districtsId = req.body.districtsId
    const mfyId = req.body.mfyId
    const gender = req.body.gender
    const email = req.body.email
    const password = req.body.password
    const accountstatus = req.body.accountstatus
    const accountrole = req.body.accountrole
    const zvaniya = req.body.zvaniya
    const phone = req.body.phone
    let file
    if (req.files) {
        file = req.files.file
        if (file.mimetype.startsWith('image')) {
            file.name = `photo-${email}${path.parse(file.name).ext}`
            file.mv(`./public/usersphoto/${file.name}`, async (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    }
    try {
        const user = await User.findById(userId)
        if (!user) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }

        const hashpass = await bcrypt.hash(password, 12)
        user.name = name
        user.secondname = secondname
        user.middlename = middlename        
        user.photos = file ? file.name : user.photos
        user.position = position
        user.regionId = regionId
        user.districtsId = districtsId
        user.gender = gender
        user.mfyId = mfyId
        user.email = email
        user.password = hashpass
        user.accountstatus = accountstatus
        user.accountrole = accountrole
        user.zvaniya = zvaniya
        user.phone = phone
        const data = await user.save()
        res.status(200).json({
            message: `ma'lumotlar o'zgartirildi`,
            data: data
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

exports.DeleteUsers = async (req, res, next) => {
    const usersId = req.params.id
    try {
        const deleteddata = await User.findById(usersId)

        if (!deleteddata) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        // if(deleteddata.creatorId.toString()!==req.userId){
        //     const error = new Error('bu userni ochirishga imkoni yoq')
        //     error.statusCode =403
        //     throw error
        // }
        const data = await User.findByIdAndRemove(usersId)
        res.status(200).json({
            message: 'Region is deletes',
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

}

exports.UserFilter = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    const regId = req.get('regId') || null
    const districtsId = req.get('distId') || null
    const mfyId = req.get('mfyId') || null
    const accountstatus = req.get('mfyId') || null
    const accountrole = req.get('mfyId') || null
    const zvaniya = req.get('mfyId') || null

    let oredercount
    try {

        let query = {}

        if (regId)
            query.regionId = regId;
        if (districtsId)
            query.districtsId = districtsId
        if (mfyId)
            query.mfyId = mfyId
        if (accountstatus)
            query.accountstatus = accountstatus
        if (accountrole)
            query.accountrole = accountrole
        if (zvaniya)
            query.zvaniya = zvaniya
        totalItems = await User.find(query).countDocuments()


        oredercount = await User.find(query)
            .populate('regionId', 'name')
            .populate('districtsId', 'name')
            .populate('mfyId', 'name')
            .populate('gender', 'name')
            .populate('accountstatus', 'name')
            .populate('accountrole', 'name')
            .populate('zvaniya', 'name')
            .skip((page - 1) * counts).limit(counts)

        res.status(200).json({
            message: `Ҳимоя ордерларини рўйхатга олиш`,
            users: oredercount,
            totalItems: totalItems
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.Usersearch = async (req, res, next) => {
    const search = req.query.search || null
    const page = req.query.page || 1
    const counts = 20
    let bigQuery = {}
    let or_list = []
    if (search) {
        or_list.push({
            'name': { "$regex": search, "$options": "i" }
        })
        or_list.push({
            'secondname': { "$regex": search, "$options": "i" }
        })
        or_list.push({
            'middlename': { "$regex": search, "$options": "i" }
        })
        or_list.push({
            'email': { "$regex": search, "$options": "i" }
        })
    }
    if (search)
        bigQuery = {
            $or: or_list
        }
    const users = await User.find(bigQuery)
        .populate('regionId', 'name')
        .populate('districtsId', 'name')
        .populate('mfyId', 'name')
        .populate('gender', 'name')
        .populate('accountstatus', 'name')
        .populate('accountrole', 'name')
        .populate('zvaniya', 'name')
        .skip((page - 1) * counts).limit(counts)
    const totalItems = await User.find(bigQuery).countDocuments()
    res.status(200).json({
        message: `Xodimlar ro'yxati`,
        users: users,
        totalItems: totalItems
    })


}