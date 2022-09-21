const express = require('express')
const {body} = require('express-validator')
const education = require('../controllers/education')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,education.getEducation)
router.get('/:id',IsAuth,education.getEducationById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],education.createEducation)
router.put('/:id',IsAuth,education.updateEducation)
router.delete('/:id',IsAuth,education.deleteEducation)

module.exports = router