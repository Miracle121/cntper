const express = require('express')
const {body} = require('express-validator')
const zvaniya = require('../controllers/zvaniya')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,zvaniya.getZvaniya)
router.get('/:id',IsAuth,zvaniya.getZvaniyaById)
router.post('/',IsAuth,[body('name').trim().isLength({min:3})],zvaniya.createZvaniya)
router.put('/:id',IsAuth,zvaniya.updateZvaniya)
router.delete('/:id',IsAuth,zvaniya.deleteZvaniya)


module.exports = router