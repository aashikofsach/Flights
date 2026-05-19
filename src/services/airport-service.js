const { StatusCodes } = require("http-status-codes");
const {  AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const airplane = require("../models/airplane");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      console.log("jai maata di ");
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });

      console.log("jai maata di jai bajrang bali", explaination);

      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot able ot create new Airport object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Cannot able to get all airports ",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND)
      throw new AppError(
        "The Airplane which you requested not found",
        error.statusCode,
      );
    throw new AppError(
      "Cannot able to get airport ",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND)
      throw new AppError(
        "The airport which you wanna delete, not found",
        error.statusCode,
      );
    throw new AppError(
      "Cannot able to get airport ",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function updateAirport(id, data) {
  try {
    const updatedResponse = await airportRepository.update(id, data);
    console.log("here is the updated response", updatedResponse);

    return updatedResponse;
  } catch (error) {
    if(error.statusCode === StatusCodes.NOT_FOUND)
      throw new AppError("The Airport requested to update is not present", error.statusCode) ;
    throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport,
};
