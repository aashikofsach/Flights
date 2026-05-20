const { StatusCodes } = require("http-status-codes");
const {  FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const airplane = require("../models/airplane");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
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
      "Cannot able ot create new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}





module.exports = {
  createFlight,
 
};
