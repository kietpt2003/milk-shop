const express = require("express");
const accountController = require('../controller/AccountController');

const AuthenRouter = (app) => {
    const router = express.Router();

    router.post('/register', accountController.createAccount);

    router.post('/login', accountController.loginController);

    return app.use('/api/authen', router);
}

module.exports = { AuthenRouter }
