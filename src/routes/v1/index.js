const express = require("express");
const {infoController } = require("../../controllers/")

const  router = express.Router() ;
const airplaneRoute = require("./airplane-router")
const cityRoute = require("./city-router");
const airportRoute = require("./airport-router");
const flightRoute = require("./flight-router");



router.get("/info", infoController.info )
// /api/v1/airplanes
router.use("/airplanes",airplaneRoute );
router.use("/cities", cityRoute);
router.use("/airports", airportRoute) ;
router.use("/flights", flightRoute)


module.exports = router ;