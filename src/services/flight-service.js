const { Op } = require("sequelize");

const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const airplane = require("../models/airplane");
const { validateTime } = require("../utils/helpers/datetime-helpers");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    validateTime(data.departureTime, data.arrivalTime);
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    // Handle validation errors using error.type
    if (error.type === "TIME_VALIDATION_ERROR") {
      throw new AppError(
        error.explaination,
        error.statusCode,
        "TIME_VALIDATION_ERROR",
      );
    }

    if (error.name === "SequelizeValidationError") {
      console.log("jai maata di ");
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });

      console.log("jai maata di jai bajrang bali", explaination);

      //   throw new AppError(explaination, StatusCodes.BAD_REQUEST, "VALIDATION_ERROR");
    }

    throw new AppError(
      "Cannot able ot create new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
    // have to handle case when both id are same
  }
  if (query.price) {
    const [lowerPrice, higherprice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [
        lowerPrice,
        higherprice == undefined ? 20000 : higherprice,
      ],
    };
  }
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate+" 23:59:00"],
    };
  }
  try {
    const flights = await flightRepository.getAllFlights(customFilter);
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot able to get all flights ",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
