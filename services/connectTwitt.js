const twitterApiV2=require('twitter-api-v2');
const Twitter= twitterApiV2.TwitterApi
require('dotenv').config()

const twitterClient = new Twitter(process.env.bearer_token);
const roClient = twitterClient.readOnly;

//eliminate white spaces between name inputed by user
//eg: Barack Obama to BarackObama
const replaceWhiteSpace=(str)=>{
    const oneWord=str.replace(/ +/g, "")
    return oneWord
}
 module.exports={
     getId:async(name)=>{
         try {
            const userName= await replaceWhiteSpace(name)
            console.log(userName)
            const  tUser = await roClient.v2.userByUsername(userName);
            console.log(tUser)
            const twitUserId=await tUser.data.id
            return twitUserId

         } catch (error) {
             console.log('from getId',error)
            
         }
        
     }, 
     getTwitt:async(id)=>{
        if(id===null) return 'could not find twitt'
        const tweetsOfUser = await roClient.v2.userTimeline(id, { exclude: 'replies' });
        //console.log('from connectTwitt',id,tweetsOfUser.data.data)
        if(tweetsOfUser.data.data!==undefined) return tweetsOfUser.data.data[0].text
        else return 'could not find twitt'
        
     }
     
 }
 



