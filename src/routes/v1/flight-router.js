const express = require('express');
const {flightController} = require("../../controllers")
const {FlightMiddleware} = require("../../middleware")

const router = express.Router() ;

router.post("/",FlightMiddleware.validateCreateRequest, flightController.createFlight);
// router.get("/", airportController.getAirports);
// router.get("/:id", airportController.getAirport);
// router.delete("/:id",airportController.destroyAirport);
// router.patch("/:id",airportController.updateAirport);



module.exports = router 