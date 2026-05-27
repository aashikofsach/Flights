const express = require('express');
const {flightController} = require("../../controllers")
const {FlightMiddleware} = require("../../middleware")

const router = express.Router() ;

router.post("/",FlightMiddleware.validateCreateRequest, flightController.createFlight);
// router.get("/", airportController.getAirports);
// router.get("/:id", airportController.getAirport);
// router.delete("/:id",airportController.destroyAirport);
// router.patch("/:id",airportController.updateAirport);
 // trips=DEL-MUM
router.get("/", flightController.getAllFlights) ;
router.get("/:id",flightController.getFlight);



module.exports = router 