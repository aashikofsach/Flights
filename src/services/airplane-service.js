const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if(error.name==="SequelizeValidationError")
    {
        console.log("jai maata di ")
        let explaination = [] ;
        error.errors.forEach((err)=>{
            explaination.push(err.message)
        })

        console.log("jai maata di jai bajrang bali", explaination);

        throw new AppError("Cannot able ot create new Airplane object",StatusCodes.INTERNAL_SERVER_ERROR)
    }
        
    throw new AppError("Cannot able ot create new Airplane object",StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

module.exports = { createAirplane };

