const serverless = require("serverless-http");
const express = require("express");
const qrCode = require("qrcode");
const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = 'mongodb+srv://biopharma-tracker:nYd3B48T7to0oMFY@acoer-serverless.80zt6.mongodb.net/?retryWrites=true&w=majority&appName=ACOER-Serverless';

const stampData = async (payload) => {
  // Call the stamping API
  let stamp = await superagent
    .post("https://external.hashlog.io/event")
    .set("APIKey", process.env.HASHLOG_API_KEY)
    .send({
      data: JSON.stringify(payload)
    });

  // Store the ID
  return stamp.body;
}

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

/**
 * Create Batch
 */
app.post("/batches", async (req, res, next) => {

  const payload = req.body;

  const stamp = await stampData(payload);
  let batch = {...payload};
  batch._id = stamp._id;
  batch.stamp = stamp;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const mongodb = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {

    await mongodb.connect();
    console.log('Connected to DB');
    await mongodb
      .db("biopharma-tracker")
      .collection("batches")
      .insertOne(batch);
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    if (mongodb) await mongodb.close();
  }

  return res.status(200).json({
    batchId: batch._id
  });
});

/**
 * Get batch master QR Code
 */
app.get("/batches/:batchId/qr-code", async (req, res, next) => {

  const { batchId } = req.params;

  console.log('Batch ID', batchId);

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const mongodb = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {

    console.log('Looking batch up');
    await mongodb.connect();

    console.log('Connected to DB');

    const batch = await mongodb
      .db("biopharma-tracker")
      .collection("batches")
      .findOne({_id: batchId});

    console.log('Batch', batch);

    if(!batch) {
      return res.status(404).json({
        error: 'Batch not found'
      });
    }

    return res.status(200).json({
      batchId,
      qrCode: `/batches/${batchId}/qr-code`
    });

    // Create QR Code
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    if (mongodb) await mongodb.close();
  }

  
});

app.use(express.json())

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
