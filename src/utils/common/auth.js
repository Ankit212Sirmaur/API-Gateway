const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {ServerConfig} = require('../../config')

function checkpassword(plainPassword, encryptedPassword){
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword)
    } catch (error) {
        throw new AppError('Password did not match', StatusCodes.BAD_REQUEST)
    }
}

function generateToken(input) {
     try {
        return jwt.sign(input, ServerConfig.JWT_SECRET_KEY, {expiresIn: ServerConfig.JWT_EXPIRTY })
     } catch (error) {
        throw error;
     }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, ServerConfig.JWT_SECRET_KEY)
    } catch (error) {
        throw error;
    }
}
module.exports = {
    checkpassword,
    generateToken,
    verifyToken,
}