const Account = require("../models/Account");
const bcrypt = require("bcrypt");

class accountService {
  async getAllAccounts() {
    let arrAccounts = [];

    try {
      arrAccounts = await Account.find({});
      return {
        status: 200,
        data: arrAccounts,
        message: arrAccounts.length !== 0 ? "OK" : "No data",
      };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        messageError: error.message,
      };
    }
  }
  async createAccount(reqBody) {
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
  }
  //Login
  async loginAccount(reqBody) {
    const { email, password } = reqBody;

    if (!email || !password) {
      return {
        status: 400,
        messageError: "Email and password required.",
      };
    }
    const account = await services.getAccountByEmail(email);
    if (account.status !== 200) {
      return {
        status: account.status,
        messageError: account.messageError,
      };
    }
    const validPassword = await bcrypt.compare(password, account.data.password);
    if (!validPassword) {
      return {
        status: 401,
        messageError: "Wrong password",
      };
    }
    if (!account.data.status) {
      return {
        status: 401,
        messageError: "Your account has been inactive",
      };
    }
    if (account && validPassword) {
      return {
        status: 200,
        data: account.data,
        message: "OK",
      };
    }
  }
  async updateAccount(accountId, reqBody) {
    let data = {}
    try {
      data = await Account.findByIdAndUpdate(
        accountId,
        { $set: reqBody },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      return {
        status: 400,
        messageError: "Tài khoản không tồn tại",
      };
    }

    return {
      status: 200,
      data: data,
      message: "Trạng thái tài khoản cập nhật thành công",
    };
  }
}

const services = {
  getAccountByEmail: async (email) => {
    try {
      const data = await Account.find({ email: email });

      return {
        status: 200,
        data: data[0],
        message: data.length !== 0 ? "OK" : "No data",
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        messageError: error,
      };
    }
  },
};

module.exports = new accountService();
