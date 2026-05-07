const { CityService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createCity(req, res) {
  try {
    console.log("Body is", req.body);
    const resposne = await CityService.createCity({
      name: req.body.name,
    });
    SuccessResponse.data = resposne;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyCity(req, res) {
  try {
    const id = req.params.id ;
    const response = await CityService.destroyCity(id);
    SuccessResponse.data = response ;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}


async function updateCity(req, res) {
  try {
    console.log("Body is", req.body);
    const resposne = await CityService.updateCity(req.params.id , {
      name: req.body?.name,
    });
    SuccessResponse.data = resposne;

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  destroyCity ,
  updateCity

};
