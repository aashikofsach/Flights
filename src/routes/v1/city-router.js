const express = require("express");
const { cityController } = require("../../controllers");
const { CityMiddleware } = require("../../middleware");

const router = express.Router();

router.post(
  "/",
  CityMiddleware.validateCreateRequest,
  cityController.createCity,
);
// router.get("/", airplaneController.getAirplanes);
// router.get("/:id", airplaneController.getAirplane);
router.delete("/:id",cityController.destroyCity);
router.patch("/:id",cityController.updateCity) ;

module.exports = router;
     