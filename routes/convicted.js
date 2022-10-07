const express = require('express')
const {body} = require('express-validator')
const convicted = require('../controllers/convicted')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,convicted.getConvicted)
router.get('/:id',IsAuth,convicted.getConvictedById)
router.post('/',IsAuth,convicted.createConvicted)
router.put('/:id',IsAuth,convicted.updateConvicted)
router.delete('/:id',IsAuth,convicted.deleteConvicted)

module.exports = router