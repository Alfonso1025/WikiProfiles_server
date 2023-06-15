const db=require('../services/db')
const Resolver=require('../services/resolver')

module.exports={
    getUser:(req,res)=>{
    const resolver=Resolver(res)
    try {
     //get id from req.user which comes from the
     // jwtoken on the authorization middleware
   const userId= req.user

     //get the user that matches with the id
    const user=db.query('SELECT * FROM Users WHERE user_id=?',
    [userId],(err, result)=>{
    if(err) return resolver.internalServerError(err, err.message)
    console.log('result', result)
    return resolver.success(result, 'user found')
    })
        } 
    catch (error) {
            console.log(error)
            return resolver.internalServerError(error, error.message)

        }
    }
}