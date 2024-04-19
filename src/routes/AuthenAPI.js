const express = require("express");
const accountController = require('../controller/AccountController');

const AuthenRouter = (app) => {
    const router = express.Router();
    //Register
    /**
     * @swagger
     * /api/authen/register:
     *  post:
     *      summary: Register endpoint
     *      description: This endpoint is for registing an account
     *      tags:
     *          - Authen
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string
     *                          fullName:
     *                              type: string
     *                          address:
     *                              type: string
     *                          phone:
     *                              type: string
     *                          dateOfBirth:
     *                              type: string
     *                          gender:
     *                              type: boolean
     *                          role:
     *                              type: string
     *                          status:
     *                              type: boolean
     *      responses:
     *          201:
     *              description: Ok
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: number
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      _id:
     *                                          type: string
     *                                      email:
     *                                          type: string
     *                                      password:
     *                                          type: string
     *                                      fullName:
     *                                          type: string
     *                                      address:
     *                                          type: string
     *                                      phone:
     *                                          type: string
     *                                      dateOfBirth:
     *                                          type: string
     *                                      gender:
     *                                          type: boolean
     *                                      role:
     *                                          type: string
     *                                      status:
     *                                          type: boolean
     *                              message:
     *                                  type: string
     *          400:
     *              description: Bad request
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: number
     *                              messageError:
     *                                  type: string
     */
    router.post('/register', accountController.createAccount);

    //Login
    /**
     * @swagger
     * /api/authen/login:
     *  post:
     *      summary: Login endpoint
     *      description: This endpoint is for login an account
     *      tags:
     *          - Authen
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string
     *      responses:
     *          200:
     *              description: Ok
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: number
     *                              data:
     *                                  type: object
     *                                  properties:
     *                                      _id:
     *                                          type: string
     *                                      email:
     *                                          type: string
     *                                      password:
     *                                          type: string
     *                                      fullName:
     *                                          type: string
     *                                      address:
     *                                          type: string
     *                                      phone:
     *                                          type: string
     *                                      dateOfBirth:
     *                                          type: string
     *                                      gender:
     *                                          type: boolean
     *                                      role:
     *                                          type: string
     *                                      status:
     *                                          type: boolean
     *                              message:
     *                                  type: string
     *          400:
     *              description: Bad request
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: number
     *                              messageError:
     *                                  type: string
     *          401:
     *              description: Unauthorized
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              status:
     *                                  type: number
     *                              messageError:
     *                                  type: string
     */
    router.post('/login', accountController.loginController);

    return app.use('/api/authen', router);
}

module.exports = { AuthenRouter }
