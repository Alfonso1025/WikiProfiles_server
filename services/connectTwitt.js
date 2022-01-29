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
        const userName= await replaceWhiteSpace(name)
        const  tUser = await roClient.v2.userByUsername(userName);
        const twitUserId=await tUser.data.id
        return twitUserId
     },
     getTwitt:async(id)=>{
         console.log(id)
        const tweetsOfUser = await roClient.v2.userTimeline(id, { exclude: 'replies' });
        return tweetsOfUser.data.data[0].text
     }

     
 }
 



