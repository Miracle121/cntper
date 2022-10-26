const express = require('express')
const {body} = require('express-validator')
const cntpeople = require('../controllers/cntpeople')
const IsAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',IsAuth,cntpeople.getCntpeople)
router.get('/:id',IsAuth,cntpeople.getCntpeopleById)
router.post('/',IsAuth,cntpeople.createByUseingFileUploads)
router.put('/:id',IsAuth,cntpeople.updateCntpeople)
router.delete('/:id',IsAuth,cntpeople.deleteCntpeople)
router.get('/f/filter',IsAuth,cntpeople.findperson)

router.get('/f/filterbyname',IsAuth,cntpeople.findpersonByName)
router.get('/f/filterbyreg',IsAuth,cntpeople.findpersonByRegId)
router.get('/f/:id',IsAuth,cntpeople.findByCreatorId)

// router.post('/f/fileuploading',IsAuth,cntpeople.createByUseingFileUploads)





// router.post('/f/formone1',IsAuth,cntpeople.formone)


module.exports = router