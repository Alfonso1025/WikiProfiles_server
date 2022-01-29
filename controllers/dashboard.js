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
    const user=db.query('SELECT * FROM users WHERE user_id=?',
    [userId],(err, result)=>{
    if(err) return res.status(404).send(' user could not be found')
    resolver.success(result, 'user found')
    })
        } 
    catch (error) {
            console.log(error)
        }
    }
}