const {Router}=require('express')
const router=Router()
const controller= require('../controllers/dashboard')
const authorization=require('../middleware/authorization')


router.get('/',authorization,controller.getUser)

module.exports=router