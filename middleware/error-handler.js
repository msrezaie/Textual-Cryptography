const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/custom-api-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "something went wrong! :(" });
};

module.exports = errorHandler;
