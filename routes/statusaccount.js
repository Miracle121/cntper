const express = require('express')
const statusaccount = require('../controllers/statusaccount')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,statusaccount.getStatusaccount)
router.get('/:id',IsAuth,statusaccount.getStatusaccount)

router.post('/',IsAuth,statusaccount.createStatusaccount)
router.put('/:id',IsAuth,statusaccount.updateStatusaccount)
router.delete('/:id',IsAuth,statusaccount.deleteStatusaccount)


module.exports = router