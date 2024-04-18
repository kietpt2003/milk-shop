const express = require("express");
const accountController = require('../controller/AccountController');

const AccountRouter = (app) => {
    const router = express.Router();

    router.get('/', accountController.getAccount);

    router.post('/', accountController.createAccount);

    return app.use('/api/account', router);
}

module.exports = { AccountRouter }
