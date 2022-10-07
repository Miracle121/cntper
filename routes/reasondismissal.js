const express = require('express')
const {body} = require('express-validator')
const reasondismissal = require('../controllers/reasondismissal')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,reasondismissal.getReasondismissal)
router.get('/:id',IsAuth,reasondismissal.getReasondismissalById)
router.post('/',IsAuth,reasondismissal.createReasondismissal)
router.put('/:id',IsAuth,reasondismissal.updateReasondismissal)
router.delete('/:id',IsAuth,reasondismissal.deleteReasondismissal)

module.exports = router