const express = require('express');
const {airplaneController} = require("../../controllers")
const {AirplaneMiddlewares} = require("../../middleware")

const router = express.Router() ;

router.post("/",AirplaneMiddlewares.validateCreateRequest, airplaneController.createAirplane);
router.get("/", airplaneController.getAirplanes);
router.get("/:id", airplaneController.getAirplane);
router.delete("/:id",airplaneController.destroyAirplane);
router.patch("/:id",airplaneController.updateAirplane);



module.exports = router 