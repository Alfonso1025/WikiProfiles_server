module.exports=function(req, res, next){
    const {userName, userEmail, userPassword}=req.body
    
    function validateEmail(email){
        return   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }
    if(req.path==="/registeruser"){
        if(![userName, userEmail, userPassword].every(Boolean)){
            return res.json('missing credentials')
        }
        else if(!validateEmail(userEmail)){
            return res.json('invalid email')
        }
    }
    else if(req.path==='/login'){
        if(![userEmail, userPassword].every(Boolean)){
            return res.json('missing credentials')
        }
        else if(!validateEmail(userEmail)){
            return res.json('invalid email')
        }
        
    }
    next()
}