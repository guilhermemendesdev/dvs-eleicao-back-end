const express = require('express');
const app = express();
const swagger = require("swagger-generator-express");

const options = {
  title: "swagger-generator-express",
  version: "1.0.0",
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  securityDefinitions: {
    Bearer: {
      description: 'Example value:- Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM',
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [{ Bearer: [] }],
  defaultSecurity: 'Bearer'
};

/**
 * serveSwagger must be called after defining your router.
 * @param app Express object
 * @param endPoint Swagger path on which swagger UI display
 * @param options Swagget Options.
 * @param path.routePath path to folder in which routes files defined.
 * @param path.requestModelPath Optional parameter which is path to folder in which requestModel defined, if not given request params will not display on swagger documentation.
 * @param path.responseModelPath Optional parameter which is path to folder in which responseModel defined, if not given response objects will not display on swagger documentation.
 */
swagger.serveSwagger(app, "/swagger", options, { routePath: './routes/api/v1/usuarios.js', requestModelPath: './models/requestModel', responseModelPath: './models/responseModel' });
expressSwagger(options)
app.listen(3000);