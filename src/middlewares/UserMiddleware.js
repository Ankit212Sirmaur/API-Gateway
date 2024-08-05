const { StatusCodes } = require('http-status-codes');
const { errorResponse, successResponse } = require('../utils/common');
const AppError = require('../utils/error');

function validateUserSingup(req, res, next) {
    if(!req.body.email) {
        errorResponse.message = "Something went wrong while Singup the User"
        errorResponse.error = new AppError(['Email not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse);
    }
    if(!req.body.password){
        errorResponse.message = "Something went wrong while Singup the User"
        errorResponse.error = new AppError(['Password not found in the incoming request'], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorResponse);
    }
    next();
}
module.exports = {
    validateUserSingup,
}