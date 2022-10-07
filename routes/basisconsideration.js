const express = require('express')
const {body} = require('express-validator')
const basisconsideration = require('../controllers/basisconsideration')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,basisconsideration.getBasisconsideration)
router.get('/:id',IsAuth,basisconsideration.getBasisconsiderationById)
router.post('/',IsAuth,basisconsideration.createBasisconsideration)
router.put('/:id',IsAuth,basisconsideration.updateBasisconsideration)
router.delete('/:id',IsAuth,basisconsideration.deleteBasisconsideration)

module.exports = router