const express = require('express')
const {body} = require('express-validator')
const typeofcrime = require('../controllers/typeofcrime')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofcrime.getTypeofcrime)
router.get('/:id',IsAuth,typeofcrime.getTypeofcrimeById)
router.post('/',IsAuth,typeofcrime.createTypeofcrime)
router.put('/:id',IsAuth,typeofcrime.updateTypeofcrime)
router.delete('/:id',IsAuth,typeofcrime.deleteTypeofcrime)

module.exports = router