const db=require('../services/db')
const bcrypt = require('bcrypt')
const jwtGenerator=require('../services/jwtGenerator')
const Resolver=require('../services/resolver')


module.exports={
    test:(req,res)=>{
        console.log('test working')
        res.send('hello')
    },

    registerUser:async(req,res)=>{

        const resolver=Resolver(res)

        try {
        //get data from req.body
           const {userName, userEmail, userPassword}=req.body

        //Check if user alreday exist on db by email
        const user=db.query("SELECT * FROM users WHERE user_email=?",
        [userEmail], async(err,result)=>{

            if(err) console.log(err)
            else if(result.length!=0) res.status(404).send('email already exist')

            //Encrypt password with bcrypt
            const saltRound =10
            const salt= await bcrypt.genSalt(saltRound)
            const bcryptPassword= await bcrypt.hash(userPassword, salt)

            //insert new user to db   
            const newUser=  db.query("INSERT INTO users (user_name,user_email,user_password) VALUES(?,?,?)",
            [userName,userEmail,bcryptPassword], (err,result)=>{
            if(err)  console.log(err)
            console.log(result)

            //produce token and return it
            const token =jwtGenerator(result.insertId)
            resolver.success(token,"user created succesfully") 
            
            
           })

        })
        
        
        }
        
         catch (error) {
            console.log(error)
        }
    },
    login:async(req,res)=>{

        const resolver=Resolver(res)

        try {

            //recibe credentials: email and password
            const {userEmail,userPassword}=req.body

            //check that user exists by checking that the email exist on db
            const user= db.query('SELECT * from users WHERE user_email=?',
            [userEmail], (err,result)=>{
            if(result.length===0) return res.status(404).send('user does not exist')
             
            //check that password is valid
            console.log(result)
            const validPassword=  bcrypt.compare(userPassword,result[0].user_password)
            if(!validPassword) return res.status(404).send('your passport is incorrect')
            
            //produce token
            
            const token = jwtGenerator(result[0].user_id)
            resolver.success(token,'loged in succesfully')
        })
                 
        } 
        catch (error) {
            console.log(error)
            }
    },
    isVerified:(req,res)=>{
        try {
            res.json(true)
        } catch (error) {
            console.log(error)
            res.status(500).send('server error')
        }
    }
}