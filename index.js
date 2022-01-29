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

app.use('/profiles',require('../Server/routes/profile'))
app.use('/users',require('../Server/routes/users'))
app.use('/dashboard',require('../Server/routes/dashboard'))