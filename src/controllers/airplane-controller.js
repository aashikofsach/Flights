const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirplane(req, res) {
  try {
    console.log("Body is", req.body);
    const resposne = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = resposne;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getAirplanes(req, res) {
  try {
    const response = await AirplaneService.getAirplanes();
    SuccessResponse.data = response ;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirplane(req, res) {
  try {
    const id = req.params.id ;
    const response = await AirplaneService.getAirplane(id);
    SuccessResponse.data = response ;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyAirplane(req, res) {
  try {
    const id = req.params.id ;
    const response = await AirplaneService.destroyAirplane(id);
    SuccessResponse.data = response ;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirplane(req, res) {
  try {
    console.log("Body is", req.body);
    const resposne = await AirplaneService.updateAirplane(req.params.id , {
      modelNumber: req.body?.modelNumber,
      capacity: req.body?.capacity,
    });
    SuccessResponse.data = resposne;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane
};
