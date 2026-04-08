const {PORT} = require("./config");
const express = require('express');
const apiRoutes = require("./routes")
const {ServerConfig , logger} = require("./config");

const app = express() ;

app.use("/api", apiRoutes)



app.listen(ServerConfig.PORT , () => {
    console.log(`The server is running on the PORT: ${ServerConfig.PORT}`) ;
    logger.http("some router hit ")
   
})

