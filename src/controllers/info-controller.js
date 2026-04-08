
const info = (req, res) => {
    return res.json({
        success : true ,
        message : "API is working",
        error : {} ,
        data :{} 
    })
}

module.exports ={
    info
}