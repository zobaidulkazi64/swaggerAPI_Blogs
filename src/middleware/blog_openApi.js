const express = require("express");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const openApiValidator = require("express-openapi-validator");
const path = require("path");

const swaggerDocument = YAML.load(path.join(__dirname,  '../', "../blogs.yaml"));    // Load the swagger.yaml file


const applyOpenApi = (app) => {

    app.use(express.json());
    app.use(morgan("dev"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(openApiValidator.middleware({
        apiSpec: swaggerDocument,
        validateRequests: true,
        validateResponses: true
    }));

}


module.exports = applyOpenApi