const {Router}=require('express')
const router=Router()
const authorization=require('../middleware/authorization')
const controller= require('../controllers/profile')



router.post('/:name',authorization,controller.createProfile)
router.get('/:id',authorization,controller.getProfile)
router.delete('/:id',authorization,controller.deleteProfile)

module.exports=router