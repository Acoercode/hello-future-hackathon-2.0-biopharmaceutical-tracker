const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "BioPharma Tracker API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Acoer Inc.",
          url: "https://acoer.com",
          email: "info@acoer.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };


  const specs = swaggerJsdoc(options);

  module.exports = specs;