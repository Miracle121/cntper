const express = require('express')
const {body} = require('express-validator')
const cntpeople = require('../controllers/cntpeople')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,cntpeople.getCntpeople)
router.get('/:id',IsAuth,cntpeople.getCntpeopleById)
router.post('/',IsAuth,cntpeople.createCntpeople)
router.put('/:id',IsAuth,cntpeople.updateCntpeople)
router.delete('/:id',IsAuth,cntpeople.deleteCntpeople)

module.exports = router