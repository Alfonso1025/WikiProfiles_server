const db=require('../services/db')
const imageDownloader=require('node-image-downloader')
const connectWiki=require('../services/connectWiki')
const connectTwitt=require('../services/connectTwitt')
const wikiImage=require('../services/wikiImage')
const scrappImage=require('../services/wikiLogo')



module.exports={
    
    
    createProfile:async(req,res)=>{
        try {
            //get user
            console.log(req.user)
            const userId=req.user

            //call the connect to wikipedia function and pass it
            //the name to be searched
            const wikipedia= await connectWiki(req.params.name)
          
            //call the connectwithTwitt function
            const tUserId=await connectTwitt.getId(req.params.name)

             //post data to database
             const profile=db.query('INSERT INTO Profiles (user_id,profile_name, profile_desc,twitt) VALUES (?,?,?,?)',
            [userId,req.params.name,wikipedia,tUserId], (err,result)=>{
                if(err) res.status(404).send(err)
                res.send(result)

            }) 
 
            //upload image to s3 bucket
            await  wikiImage.upload(req.params.name)
        }
         catch (error) {
            console.log(error)
        }
    },
    getProfile: (req,res)=>{
        try {
           const userId=req.user
           const profile=db.query('SELECT * FROM Profiles WHERE user_id=?',
        [userId], async (err,result)=>{
            if(err) return res.status(404).send(err)

            const profiles= await Promise.all(result.map( async obj=>{
                const container={}
                container['id']=obj.profile_id
                container['name']=obj.profile_name
                container['desc']=obj.profile_desc
                container['twitter']= await connectTwitt.getTwitt(obj.twitt)
                container['image']= await wikiImage.streamToString(obj.profile_name)
                return  container
            }))
            console.log(profiles)
            res.send(profiles)
            
           })

        } 
        catch (error) {
            console.log(error)
        }
    },
    deleteProfile:(req,res)=>{
    try {
        const profileId=req.params.id
        console.log(profileId)
        const profile=db.query('DELETE  FROM Profiles WHERE profile_id=?',
        [profileId],(err,result)=>{
            if(err) return res.status(404).send(err)
            res.send(result)
        })

    } catch (error) {
        console.log(error)
    }
    },
    getIndividualTwitt:async(req,res)=>{
        try {
            
            const id=req.params.id
            const twitt=await connectTwitt.getTwitt(id)
            res.send(twitt)
        } catch (error) {
            console.log(error)
        }
    },
    getTwittId:async(req,res)=>{
        try {
            const id=await connectTwitt.getId(req.params.name)
            res.send(id)
        } catch (error) {
            console.log(error)
        }
    },
    uploadImage:async(req,res)=>{
        
        const response= await wikiImage.upload(req.params.name)
        res.send(response)
    },
    downloadImage:async(req,res)=>{
        
        const response=await wikiImage.streamToString(req.params.key)
        console.log(response)
        //response.pipe(res)

        /* const [logo]=await scrappImage()
        imageDownloader({
            imgs:[
                {
                    uri:'https://www.wikipedia.org/'+ logo
                }
            ],
                
            dest:'../../wikiProfiles/Client/react-client/src/styles'
                
            
        }).then(info=>{
            console.log('completed', info)

        }).catch((error, response, body) => {
            console.log('something goes bad!')
            console.log(error)
          })
 */
    }
}