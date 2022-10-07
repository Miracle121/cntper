const express = require('express')
const {body} = require('express-validator')
const Criminalcodex = require('../controllers/criminalcodex')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,Criminalcodex.getCriminalcodex)
router.get('/:id',IsAuth,Criminalcodex.getCriminalcodexById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],Criminalcodex.createCriminalcodex)
router.put('/:id',IsAuth,Criminalcodex.updateCriminalcodex)
router.delete('/:id',IsAuth,Criminalcodex.deleteCriminalcodex)
router.get('/case/:id',IsAuth,Criminalcodex.getCriminalcodexBycaseid)

module.exports = router