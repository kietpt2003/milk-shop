const express = require("express");
const dotenv = require('dotenv');

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const { configBodyParse } = require("../config/configBodyParse");
const { configENV } = require("../config/configENV");
const { configCORS } = require("../config/configCORS");
const { configLog } = require("../config/configLogServer");
const { configStaticFiles } = require("../config/configStaticFiles");

const app = express();

configCORS(app);
configENV(dotenv);
configLog(app);
configBodyParse(app);
configStaticFiles(app);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Milk Shop API Documents",
            version: "1.1.3",
        },
        servers: [
            {
                url: "https://milk-shop-eight.vercel.app/",
            },
            // {
            //   url: "http://localhost:8080/",
            // },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use(
    "/api/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, {
        customCssUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
    })
);

app.get("/", (req, res) => {
    res.end(`Hello kiet`);
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log('Server is running on port: ', port);
})