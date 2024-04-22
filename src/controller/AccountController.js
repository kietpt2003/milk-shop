const accountServices = require('../services/AccountServices');

class AccountController {
    async getAccount(req, res) {
        let data = await accountServices.getAllAccounts(
            req.query.sort_by,
            req.query.page
        );
        return res.status(data.status).json(data);
    }
    async createAccount(req, res) {
        let data = await accountServices.createAccount(req.body);
        return res.status(data.status).json(data);
    }
    async loginController(req, res) {
        let data = await accountServices.loginAccount(req.body);
        return res.status(data.status).json(data);
    }
    async updateStatusController(req, res) {
        let data = await accountServices.updateAccountStatus(req.params.id, req.body.status);
        return res.status(data.status).json(data);
    }
}

module.exports = new AccountController();
