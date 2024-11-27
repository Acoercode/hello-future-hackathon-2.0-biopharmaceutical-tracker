const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");

const batchRouter = require("./routes/batches");
const itemsRouter = require("./routes/items");
const stampRouter = require("./routes/notifications")
const aiRouter = require("./routes/ai")

const { getStockLevel } = require("./services/items")

const app = express();
app.use(cors());
app.use(express.json())

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.use('/batches', batchRouter);
app.use('/batches/:batchId/items', itemsRouter);
app.use('/stamp', stampRouter);
app.use('/ai', aiRouter);

app.get('/stockLevel/:productId', async (req, res, next) => {
  const since = new Date();
  since.setDate((new Date()).getDate() - 30);

  console.log('Since', since.toISOString());

  const { productId } = req.params;

  const stockLevels = await getStockLevel(since, productId);

  res.json(stockLevels);
})

// Swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpecs));

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
