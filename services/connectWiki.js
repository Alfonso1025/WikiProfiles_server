const axios=require('axios')

const url='https://en.wikipedia.org/w/api.php'

const params={
    action:'query',
    format:'json',
    prop:'extracts',
    exchars:250,
    exintro:true,
    explaintext:true,
    generator:'search',
    gsrlimit:1,
    gsrprop:'sectionsnippet'

}
paramsImage={
    action:'query',
    prop:'pageimages',
    format:'json',
    piprop:'thumbnail',
    pithumbsize:100
}


async function connectWiki(reqParams){
  
params.gsrsearch=reqParams
//paramsImage.titles=reqParams

try {
    const {data}= await axios.get(url,{params})
    //if(data.error) throw new Error(data.error.info)
    //const {image}= await axios.get(url,{paramsImage})

    const extractedValue= Object.values(data.query.pages)
    return extractedValue[0].extract
}
 catch (error) {
    console.log(error)
}

  }

  module.exports=connectWiki