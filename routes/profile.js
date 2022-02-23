const {Router}=require('express')
const router=Router()
const authorization=require('../middleware/authorization')
const controller= require('../controllers/profile')
const multer=require('multer')
const upload=multer({dest:'uploads/'})



router.post('/:name' ,upload.single('image'), authorization,controller.createProfile)
router.get('/gettwittid/:name',controller.getTwittId)
router.get('/twitt/:id',controller.getIndividualTwitt)
router.get('/', authorization,controller.getProfile)
router.delete('/:id',authorization,controller.deleteProfile)
router.post('/image/:name',upload.single('image'),controller.uploadImage)
router.get('/image/:key',controller.downloadImage)
module.exports=router