const { AirportService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirport(req, res) {
  try {
    console.log("Body is", req.body);
    const resposne = await AirportService.createAirport({
      name: req.body.name,
      address: req.body.address,
      code: req.body.code,
      cityId : req.body.cityId
    });
    SuccessResponse.data = resposne;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
async function getAirports(req, res) {
  try {
    const response = await AirportService.getAirports();
    SuccessResponse.data = response ;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirport(req, res) {
  try {
    const id = req.params.id ;
    const response = await AirportService.getAirport(id);
    SuccessResponse.data = response ;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyAirport(req, res) {
  try {
    const id = req.params.id ;
    const response = await AirportService.destroyAirport(id);
    SuccessResponse.data = response ;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirport(req, res) {
  try {
    console.log("Body is", req.body);
    const resposne = await AirportService.updateAirport(req.params.id , {
      name: req.body?.name,
      address: req.body?.address,
      code : req.body?.code,
      cityId : req.body?.cityId
    });
    SuccessResponse.data = resposne;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport
};
