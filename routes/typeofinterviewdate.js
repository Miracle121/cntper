const express = require('express')
const {body} = require('express-validator')
const typeofinterviewdate = require('../controllers/typeofinterviewdate')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,typeofinterviewdate.getTypeofinterviewdate)
router.get('/:id',IsAuth,typeofinterviewdate.getTypeofinterviewdateById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],typeofinterviewdate.createTypeofinterviewdate)
router.put('/:id',IsAuth,typeofinterviewdate.updateTypeofinterviewdate)
router.delete('/:id',IsAuth,typeofinterviewdate.deleteTypeofinterviewdate)


module.exports = router