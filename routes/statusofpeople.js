const express = require('express')
const {body} = require('express-validator')
const statusofpeople = require('../controllers/statusofpeople')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,statusofpeople.getStatusofpeople)
router.get('/:id',IsAuth,statusofpeople.getStatusofpeopleById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],statusofpeople.createStatusofpeople)
router.put('/:id',IsAuth,statusofpeople.updateStatusofpeople)
router.delete('/:id',IsAuth,statusofpeople.deleteStatusofpeople)

module.exports = router