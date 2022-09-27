const express = require('express')
const {body} = require('express-validator')
const Criminalcase = require('../controllers/criminalcase')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,Criminalcase.getCriminalcase)
router.get('/:id',IsAuth,Criminalcase.getCriminalcaseById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],Criminalcase.createCriminalcase)
router.put('/:id',IsAuth,Criminalcase.updateCriminalcase)
router.delete('/:id',IsAuth,Criminalcase.deleteCriminalcase)

module.exports = router