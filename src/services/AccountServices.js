const Account = require('../models/Account');
const bcrypt = require('bcrypt');

class accountService {
    async getAllAccounts() {
        let arrAccounts = [];

        try {
            arrAccounts = await Account.find({})
            return { arrAccounts };
        } catch (error) {
            console.log(error);
            return { arrAccounts };
        }
    }
    async createAccount(reqBody) {
        try {
            let data = {};

            const hashedPassword = await bcrypt.hash(reqBody.password, 10);

            const account = new Account({
                ...reqBody,
                password: hashedPassword,
            });

            try {
                data = await account.save();
            } catch (error) {
                return {
                    status: 400,
                    messageError: error.message,
                };
            }

            return {
                status: 201,
                data: data,
                message: data.length !== 0 ? "OK" : "No data",
            };
        } catch (error) {
            console.error("error ne", error);
            return {
                status: 500,
                messageError: error.toString(),
            };
        }
    }
}

module.exports = new accountService();
