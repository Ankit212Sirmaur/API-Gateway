const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');
const { UserMiddleware } = require('../../middlewares')

router.post('/', UserMiddleware.validateUserSingup, UserController.SignUP);

module.exports = router;