const serverless = require("serverless-http");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const qrCode = require("qrcode");
const swaggerSpecs = require("./swagger");

const batchRouter = require("./routes/batches");
const itemsRouter = require("./routes/items");
const stampRouter = require("./routes/notifications")


const app = express();
app.use(express.json())

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.use('/batches', batchRouter);
app.use('/batches/:batchId/items', itemsRouter);
app.use('/stamp', stampRouter);

// Swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpecs));

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
