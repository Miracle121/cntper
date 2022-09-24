const express = require('express')
const {body} = require('express-validator')
const nationality = require('../controllers/nationality')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,nationality.getNationality)
router.get('/:id',IsAuth,nationality.getNationalityById)
router.post('/',IsAuth,nationality.createNationality)
router.put('/:id',IsAuth,nationality.updateNationality)
router.delete('/:id',IsAuth,nationality.deleteNationality)

module.exports = router