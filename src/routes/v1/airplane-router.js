const express = require('express');
const {airplaneController} = require("../../controllers")
const {AirplaneMiddlewares} = require("../../middleware")

const router = express.Router() ;

router.post("/",AirplaneMiddlewares.validateCreateRequest, airplaneController.createAirplane)


module.exports = router 