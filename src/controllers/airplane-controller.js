const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");

async function createAirplane(req, res) {
  try {
    console.log("Body is", req.body)
    const resposne = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Data gets Sucessfully",
      error: {},
      response: resposne,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong",
      response: {},
      error: error,
    });
  }
}

module.exports = {
  createAirplane,
};
