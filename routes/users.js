const {Router}=require('express')
const router=Router()
const controller= require('../controllers/users')
const authorization = require('../middleware/authorization')
const validateInput=require('../middleware/validateInput')

router.use(validateInput)
router.get('/test', controller.test)
router.post('/registeruser',controller.registerUser)
router.post('/signin',controller.login)
router.get('/isverified',authorization,controller.isVerified)

module.exports=router