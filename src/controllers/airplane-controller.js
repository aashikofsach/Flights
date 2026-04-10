const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const {ErrorResponse , SuccessResponse} = require("../utils/common")

async function createAirplane(req, res) {
  try {
    console.log("Body is", req.body)
    const resposne = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = resposne

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error ;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};
