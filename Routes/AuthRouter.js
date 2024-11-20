const { signup, login } = require('../Controllers/AuthController');
const { singnupValidation } = require('../Middleware/AuthMiddleware');

const Router = require('express').Router();

Router.post('/login',login);


Router.post('/signup',singnupValidation,signup);

module.exports = Router;