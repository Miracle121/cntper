const express = require('express')
const {body} = require('express-validator')
const Typeofliability = require('../controllers/typeofliability')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,Typeofliability.getTypeofliability)
router.get('/:id',IsAuth,Typeofliability.getTypeofliabilityById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],Typeofliability.createTypeofliability)
router.put('/:id',IsAuth,Typeofliability.updateTypeofliability)
router.delete('/:id',IsAuth,Typeofliability.deleteTypeofliability)

module.exports = router