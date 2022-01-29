const db=require('../services/db')
const connectWiki=require('../services/connectWiki')
const connectTwitt=require('../services/connectTwitt')

module.exports={
    
    
    createProfile:async(req,res)=>{
        try {
            //get user
            console.log(req.user)
            const userId=req.user

            //call the connect to wikipedia function and pass it
            //the name to be searched
            const wikipedia= await connectWiki(req.params.name)
            console.log(wikipedia)
            //call the connect with Twitter function
            const tUserId=await connectTwitt.getId(req.params.name)

             //post data to database
             const profile=db.query('INSERT INTO profiles (user_id,profile_name, wiki_desc,twitter) VALUES (?,?,?,?)',
            [userId,req.params.name,wikipedia,tUserId], (err,result)=>{
                if(err) res.status(404).send(err)
                res.send(result)
            }) 
 
            
           

        }
         catch (error) {
            console.log(error)
        }
    },
    getProfile:(req,res)=>{
        try {
           const profileId=req.params.id 
           const profile=db.query('SELECT * FROM profiles WHERE profile_id=?',
        [profileId],async(err,result)=>{
            if(err) return res.status(404).send(err)
            
            const lasTwitt= await connectTwitt.getTwitt(result[0].twitter)
            const description= result[0].wiki_desc
            const name=result[0].profile_name
            res.send([lasTwitt,description,name])
        })

        } 
        catch (error) {
            console.log(error)
        }
    },
    deleteProfile:(req,res)=>{
    try {
        const profileId=req.params.id
        const profile=db.query('DELETE  FROM profiles WHERE profile_id=?',
        [profileId],(err,result)=>{
            if(err) return res.status(404).send(err)
            res.send(result)
        })

    } catch (error) {
        
    }
    }
}