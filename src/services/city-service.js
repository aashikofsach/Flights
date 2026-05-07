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


async function destroyCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND)
      throw new AppError(
        "The city which you wanna delete, not found",
        error.statusCode,
      );
    throw new AppError(
      "Cannot able to get airplane ",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}


async function updateCity(id, data) {
  try {
    const updatedResponse = await cityRepository.update(id, data);
    console.log("here is the updated response", updatedResponse);

    return updatedResponse;
  } catch (error) {
    if(error.statusCode === StatusCodes.NOT_FOUND)
      throw new AppError("The City requested to update is not present", error.statusCode) ;
    throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR)
  }
}


module.exports ={
    createCity,
    destroyCity,
    updateCity

}