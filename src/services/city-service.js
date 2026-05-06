const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();


async function createCity(data) {
  try {
    const airplane = await cityRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
      console.log("jai maata di of createCity service  ");
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


module.exports ={
    createCity

}