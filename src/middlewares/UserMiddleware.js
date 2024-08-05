const { StatusCodes } = require('http-status-codes');
const { errorResponse, successResponse } = require('../utils/common');
const AppError = require('../utils/error');
const { UserService } = require('../services');

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

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if(response) {
            req.user = response;
            next();
        }
    } catch (error) {
        return res.status(error.statusCode).json(error);
    }
}
module.exports = {
    validateUserSingup,
    checkAuth,
}