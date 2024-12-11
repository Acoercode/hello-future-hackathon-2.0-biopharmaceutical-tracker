const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const { getStockLevel } = require("../services/items")
const { addPrediction } = require("../services/predictions")
const { stampData } = require("../services/stamp");

const COLLECTION = 'predictions'

const openaiApiKey =
  process.env.OPENAI_API_KEY ||
  "XXX";
const openai = new OpenAI({ apiKey: openaiApiKey });

const getDb = require("../db");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();

router.get("/predict/:productId", async (req, res, next) => {
  try {
    var safetyStock = req.query?.safetyStock ? req.query?.safetyStock : 50; // Minimum stock level before manufacturing restarts
    var manufacturingDelay = req.query?.manufacturingDelay
      ? req.query?.manufacturingDelay
      : 5; // Days needed to manufacture new stock

    // Get stock data
    const since = new Date();
    since.setDate((new Date()).getDate() - 30);
    console.log('Since', since.toISOString());
    const { productId } = req.params;
    const stockLevels = await getStockLevel(since, productId);

    var stockDataText = "";
    stockLevels.history.forEach((row) => {
      stockDataText += `${row.date}: ${row.stockLevel} units available\n`;
    });
    
    const prompt = `
    Analyze the following stock data and predict when manufacturing should restart. 
    Consider a safety stock level of ${safetyStock} units and a manufacturng delay of ${manufacturingDelay} days.
    
    Here is the stock data for the last 30 days:
    ${stockDataText}

    The stock depletion rate should be base on the last 30 days.
    Then, compute the number of days that we have before hittig the safety stock level.
    Base your prediction on the stock depletion rate, and the current stock which is ${
      stockLevels.stockLevel
    }.

    Return only 3 lines with the name of the field and the value separated by a column character:
    * The "recommendedRestartDate" should contain the date when the manufacturing should restart using the format "YYYY-MM-DD";
    * The "reasoning" should contain a string explaining the computation;
    * The "currentStockDepletionRate" should contain the stock depletion rate.
  `;
  console.log(prompt)

    const completion = await openai.beta.chat.completions.parse({
      model: "o1-mini",
      messages: [{ role: "user", content: prompt }],
    });

    var response = {};
    for (let row of completion.choices[0].message.content.split("\n")) {
      let values = row.split(":");
      if (values.length == 2) {
        response[values[0].trim()] = values[1].trim();
      }
    }

    const stamp = await stampData(response, COLLECTION, 'PREDICTED');

    response._id = stamp._id;
    response.stamp = stamp;

    await addPrediction(response);

    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    if (mongodb) await mongodb.close();
  }
});

module.exports = router;
