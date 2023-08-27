const jwt=require('jsonwebtoken')
const Resolver = require('../services/resolver')
require('dotenv').config()

module.exports= async(req, res, next)=>{
    const resolver = Resolver(res)
    
     try {
        const jwtToken = req.header("token")
        
        console.log('this is the token',jwtToken)
        if(!jwtToken) return resolver.unauthorized(null, 'no_token')

        const payload= jwt.verify(jwtToken, process.env.jwtSecret)
        console.log(payload)
        req.user=payload.user
       
        
        next();
    } catch (error) {
        console.error('this is the error from authorization middleware',error.message)
        return resolver.unauthorized(error, error.message)
    } 
}