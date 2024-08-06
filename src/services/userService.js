const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/error/index');
const {UserRepository} = require('../respositories');
const {Auth} = require('../utils/common')
const {Enums} = require('../utils/common')
const {RoleRepository} = require("../respositories")

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

async function create(data) {
    try {
        const user = await userRepository.create(data);
        const role = await roleRepository.getRoleByName(Enums.ROLE_TYPE.CUSTOMER);  
        user.addRole(role);
        return user;
    } catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create an airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function SignIn(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new AppError('No User found', StatusCodes.NOT_FOUND);
        }
        const passwordAuth = Auth.checkpassword(data.password, user.password);
        if(!passwordAuth) {
            throw new AppError('Password did not match', StatusCodes.BAD_REQUEST)
        }
        const jwt = Auth.generateToken({id: user.id, email: user.email});
        return jwt;
    } catch (error) {
        if(error instanceof AppError) throw error;
        throw new AppError('Something went wrong while signIn', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token) {
    try {
        if(!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST)
        }
        const response = Auth.verifyToken(token);
        const user = await userRepository.get(response.id);
        if(!user) {
            throw new AppError('No user Found', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        console.log(error);
        if(error.name === 'invalid token') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST)
        }
        if(error.name === 'TokenExpiredError') {
            throw new AppError('Expired JWT token', StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}




module.exports = {
    create,
    SignIn,
    isAuthenticated,
}