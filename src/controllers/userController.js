const { StatusCodes } = require('http-status-codes');
const { errorResponse, successResponse } = require('../utils/common');
const {UserService} = require('../services');
/**
 * POST: '/SignUP'
 * req-body : {email: " ", password: }
 */

async function SignUP(req, res) {
    try {
        const response = await UserService.create({
            email: req.body.email,
            password: req.body.password
        })
        successResponse.message = 'created the User'
        successResponse.data = response;
        return res
            .status(StatusCodes.CREATED)
            .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res 
            .status(error.statusCode)
            .json(errorResponse);
    }
    
}

async function SignIN(req, res) {
    try {
        const response = await UserService.SignIn({
            email: req.body.email,
            password: req.body.password
        })
        successResponse.message = 'logged in the User'
        successResponse.data = response;
        return res
            .status(StatusCodes.CREATED)
            .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res 
            .status(error.statusCode)
            .json(errorResponse);
    }
}

async function AddRoletoUser(req, res) {
    try {
        const response = await UserService.addRoleToUser({
            role: req.body.role,
            id: req.body.id
        })
        successResponse.message = 'logged in the User'
        successResponse.data = response;
        return res
            .status(StatusCodes.CREATED)
            .json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res 
            .status(error.statusCode)
            .json(errorResponse);
    }
}

module.exports = {
    SignUP,
    SignIN,
    AddRoletoUser,
}