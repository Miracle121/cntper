const express = require('express')
const {body} = require('express-validator')
const typeofperson = require('../controllers/typeofperson')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofperson.getTypeofperson)
router.get('/:id',IsAuth,typeofperson.getTypeofpersonById)
router.post('/',IsAuth,typeofperson.createTypeofperson)
router.put('/:id',IsAuth,typeofperson.updateTypeofperson)
router.delete('/:id',IsAuth,typeofperson.deleteTypeofperson)

module.exports = router