const express = require('express');

const router = express.Router() ;

router.get("/info", (req , res)=>{
    return res.json({
        message : "api ok from v2"
    })
})

module.exports = router