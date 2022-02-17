const cheerio=require('cheerio')
const axios=require('axios')
const S3=require('aws-sdk/clients/s3')
require('dotenv').config()

//enviroment variables
const bucketName=process.env.AWS_BUCKET_NAME
const region='us-east-2'
const accessKeyId=process.env.access_key_S3
const secretAccessKey=process.env.secret_key_S3

//s3 bucket instance 
const s3= new S3({
    region,
    accessKeyId,
    secretAccessKey
    
})


//1 getImage obtains the image by web scrapping the wikipedia page.

const getImage= async (name)=>{

    const list=[]
    const url=`http://en.wikipedia.org/wiki/${name}`
    const test='test'
     
   const response= await axios.get(url).then(res=>{

        const html=res.data
        const $= cheerio.load(html)

        const img=  $(".infobox-image").map(function(){
           
            list.push( $(this).find('img').attr('src'))
            
            
        })
        
    }) 
 
    return list
    
}
//2 uploadImage uploads the image to the s3 bucket
module.exports={
     upload:async(name)=>{

        const identifier=name 
        const [imgUrl]= await getImage(name)
        const uploadParams={
            Bucket:bucketName,
            Body:imgUrl,
            Key:identifier
        }
     return s3.upload(uploadParams).promise()
     
     },
     download:async(imageKey)=>{
        
        const downloadParams={
            Key:imageKey,
            Bucket:bucketName
        }
         try {
        const downloadFromS3=async()=>{

          return  await s3.getObject(downloadParams, (err,data)=>{
                if(err) console.log(err)
                else console.log(data)
            })
        }
         
        
        var image=await downloadFromS3()
        console.log(image)
         }
          catch (error) {
             console.log('this is the error',error)
         }
        
      
     }
}


