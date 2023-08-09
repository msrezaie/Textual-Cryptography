const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api-error");

class Unauthenticated extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
