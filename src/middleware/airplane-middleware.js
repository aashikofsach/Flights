const { StatusCodes } = require("http-status-codes");
const {ErrorResponse} = require("../utils/common")

function validateCreateRequest(req, res, next) {
    ErrorResponse.message = "Something went wrong, when we are creating request" ;
    ErrorResponse.error = { explaination: "Model Number not found in the request body" } ;
  if (!req.body.modelNumber) {
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();

}

module.exports = {
    validateCreateRequest
}

