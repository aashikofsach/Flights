const express = require("express");
const {infoController } = require("../../controllers/")

const  router = express.Router() ;
const airplaneRoute = require("./airplane-router")



router.get("/info", infoController.info )
// /api/v1/airplanes
router.use("/airplanes",airplaneRoute )

module.exports = router ;