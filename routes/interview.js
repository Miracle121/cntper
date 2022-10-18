const express = require('express')
const {body} = require('express-validator')
const interview = require('../controllers/interview')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,interview.getInterview)
router.get('/:id',IsAuth,interview.getInterviewById)
router.post('/',IsAuth,interview.createInterview)
router.put('/:id',IsAuth,interview.updateInterview)
router.delete('/:id',IsAuth,interview.deleteInterview)

router.get('/f/:id',IsAuth,interview.findeByPersonId)

// router.post('/fs/photos',IsAuth,interview.filedecoder)

module.exports = router