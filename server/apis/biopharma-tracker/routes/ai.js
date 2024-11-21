const express = require("express");
const superagent = require("superagent");
const router = express.Router();

const OpenAI = require("openai");
const { zodResponseFormat } = require("openai/helpers/zod");
const { z } = require("zod");

const openaiApiKey =
  process.env.OPENAI_API_KEY ||
  "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";
const openai = new OpenAI({ apiKey: openaiApiKey });

const getDb = require("../db");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();

const stockData = [
  { date: "2024-10-20", stockLevel: 1200 },
  { date: "2024-10-21", stockLevel: 1150 },
  { date: "2024-10-22", stockLevel: 1120 },
  { date: "2024-10-23", stockLevel: 1100 },
  { date: "2024-10-24", stockLevel: 1100 },
  { date: "2024-10-25", stockLevel: 1090 },
  { date: "2024-10-26", stockLevel: 1080 },
  { date: "2024-10-27", stockLevel: 1000 },
  { date: "2024-10-28", stockLevel: 800 },
  { date: "2024-10-29", stockLevel: 780 },
  { date: "2024-10-31", stockLevel: 770 },
  { date: "2024-11-01", stockLevel: 760 },
  { date: "2024-11-01", stockLevel: 750 },
  { date: "2024-11-03", stockLevel: 745 },
  { date: "2024-11-04", stockLevel: 740 },
  { date: "2024-11-05", stockLevel: 730 },
  { date: "2024-11-06", stockLevel: 725 },
  { date: "2024-11-07", stockLevel: 720 },
  { date: "2024-11-08", stockLevel: 700 },
  { date: "2024-11-09", stockLevel: 690 },
  { date: "2024-11-10", stockLevel: 690 },
  { date: "2024-11-11", stockLevel: 690 },
  { date: "2024-11-12", stockLevel: 685 },
  { date: "2024-11-13", stockLevel: 680 },
  { date: "2024-11-14", stockLevel: 680 },
  { date: "2024-11-15", stockLevel: 670 },
  { date: "2024-11-16", stockLevel: 660 },
  { date: "2024-11-17", stockLevel: 640 },
  { date: "2024-11-18", stockLevel: 635 },
  { date: "2024-11-19", stockLevel: 630 },
  { date: "2024-11-20", stockLevel: 625 },
  { date: "2024-11-21", stockLevel: 620 },
];

router.get("/predict", async (req, res, next) => {
  try {
    var safetyStock = req.query?.safetyStock ? req.query?.safetyStock : 50; // Minimum stock level before manufacturing restarts
    var manufacturingDelay = req.query?.manufacturingDelay
      ? req.query?.manufacturingDelay
      : 5; // Days needed to manufacture new stock

    var stockDataText = "";
    stockData.forEach((row) => {
      stockDataText += `${row.date}: ${row.stockLevel} units available\n`;
    });

    /*const prompt = `
      Analyze the following stock data and predict when manufacturing should restart. 
      Consider a safety stock level of ${safetyStock} units and a manufacturng delay of ${manufacturingDelay} days.
      
      Here is the stock data for the last 30 days:
      ${stockDataText}

      The stock depletion rate should be base on the last 30 days.
      Then, compute the number of days that we have before hittig the safety stock level.
      Base your prediction on the stock depletion rate, and the current stock which is ${stockData[stockData.length - 1].stockLevel}.

      The "recommendedRestartDate" should contain the date when the manufacturing should restart using the format "YYYY-MM-DD".
    `;

    const Prediction = z.object({
      recommendedRestartDate: z.string(),
      reasoning: z.string(),
      currentStockDepletionRate: z.number(),
    });

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for stock analysis.",
        },
        { role: "user", content: prompt },
      ],
      response_format: zodResponseFormat(Prediction, "prediction"),
    });

    return res.status(200).json(completion.choices[0].message.parsed);*/
    const prompt = `
    Analyze the following stock data and predict when manufacturing should restart. 
    Consider a safety stock level of ${safetyStock} units and a manufacturng delay of ${manufacturingDelay} days.
    
    Here is the stock data for the last 30 days:
    ${stockDataText}

    The stock depletion rate should be base on the last 30 days.
    Then, compute the number of days that we have before hittig the safety stock level.
    Base your prediction on the stock depletion rate, and the current stock which is ${
      stockData[stockData.length - 1].stockLevel
    }.

    Return only 3 lines with the name of the field and the value separated by a column character:
    * The "recommendedRestartDate" should contain the date when the manufacturing should restart using the format "YYYY-MM-DD";
    * The "reasoning" should contain a string explaining the computation;
    * The "currentStockDepletionRate" should contain the stock depletion rate.
  `;

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

    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    if (mongodb) await mongodb.close();
  }
});

module.exports = router;
