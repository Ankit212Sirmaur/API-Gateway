const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');
const { UserMiddleware } = require('../../middlewares')

router.post('/signup', UserMiddleware.validateUserSingup, UserController.SignUP);
router.post('/signin', UserMiddleware.validateUserSingup, UserController.SignIN)
router.post('/role', UserMiddleware.checkAuth, UserMiddleware.isAdmin, UserController.AddRoletoUser)
module.exports = router;