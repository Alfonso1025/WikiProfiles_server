const cheerio=require('cheerio')
const axios=require('axios')
const url='https://www.wikipedia.org/'

async function scrappImage (){
const list=[]
const response= await axios.get(url).then(res=>{
    const html=res.data
    //console.log(html)
    const $=cheerio.load(html)
    const logo=$(".central-textlogo").map(function(){
     list.push( $(this).find('img').attr('src'))  
        
    })

})
return list
} 

module.exports=scrappImage