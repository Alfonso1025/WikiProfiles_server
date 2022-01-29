const jwt=require('jsonwebtoken')
require('dotenv').config()

    function jwtGenerator(id){
      console.log('jwt',id)
      //return error and break program if id is undefined
      
        const payload={
            user:id
        }
      return  jwt.sign(payload, process.env.jwtSecret,{expiresIn:60*60} )
    }
    
    module.exports=jwtGenerator