const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
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
      "Cannot able ot create new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Cannot able to get all airplanes ",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}


async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if(error.statusCode === StatusCodes.NOT_FOUND)
      throw new AppError("The Airplane which you requested not found", error.statusCode);
    throw new AppError(
      "Cannot able to get airplane ",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = { createAirplane, getAirplanes , getAirplane};
