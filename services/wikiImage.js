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

const downloaded=async (imagekey)=>{

    const downloadParams={
        Key:imagekey,
        Bucket:bucketName
    }
    try {
        const imageFs=   await s3.getObject(downloadParams)
        return imageFs.createReadStream()
    } catch (error) {
        console.log(error)
    }
}
//1 getImage obtains the image by web scrapping the wikipedia page.

const getImage= async (name)=>{

    const list=[]
    const url=`http://en.wikipedia.org/wiki/${name}`
    
     
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
     
     streamToString:async(key)=>{
        const stream= await downloaded(key)
        const chunks = [];
        
        return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    })
     }
}


