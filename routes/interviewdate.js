const express = require('express')
const {body} = require('express-validator')
const interviewdate = require('../controllers/interviewdate')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,interviewdate.getInterviewdate)
router.get('/:id',IsAuth,interviewdate.getInterviewdateById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],interviewdate.createInterviewdate)
router.put('/:id',IsAuth,interviewdate.updateInterviewdate)
router.delete('/:id',IsAuth,interviewdate.deleteInterviewdate)

module.exports = router