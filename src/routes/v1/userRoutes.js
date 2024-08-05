const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');
const { UserMiddleware } = require('../../middlewares')

router.post('/signup', UserMiddleware.validateUserSingup, UserController.SignUP);
router.post('/signin', UserMiddleware.validateUserSingup, UserController.SignIN)
module.exports = router;