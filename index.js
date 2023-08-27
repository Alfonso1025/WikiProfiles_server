const express= require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')

//app.use(cors())
app.listen(process.env.PORT, ()=>{
    console.log('app is running in port', process.env.PORT)
})
const whiteList= ['http://localhost:3002']
const options={
    origin:(origin, callback)=>{
        if(whiteList.indexOf(origin)|| -1){
            callback(null,true)
        }else{
            callback(new Error('not allowed'))
        }
    }
}
app.use(cors(options)) 
app.use(express.json())
app.get('/',(req, res)=>{
    console.log('hello world')
    res.send('hello worls')
})
app.use('/profiles',require('./routes/profile'))
app.use('/users',require('./routes/users'))
app.use('/dashboard',require('./routes/dashboard'))