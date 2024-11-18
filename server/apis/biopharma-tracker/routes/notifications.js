const express = require('express');
const superagent = require('superagent');
const router = express.Router();

const getDb = require("../db");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();

router.post("/", async (req, res, next) => {

    const payload = req.body;
    console.log('Payload!', payload);

    const { _id, data } = payload;

    try {
        const { type } = JSON.parse(data);
        console.log('Looking batch up');
        await mongodb.connect();

        console.log('Connected to DB');

        let batch = await mongodb
            .db("biopharma-tracker")
            .collection(type)
            .findOne({ "stamp._id": _id });

        console.log('Batch', batch);

        if (!batch) {
            return res.status(404).json({
                error: 'Batch not found'
            });
        }

        batch.stamp = {
            ...batch.stamp,
            ...payload
        };

        batch = await mongodb
            .db("biopharma-tracker")
            .collection("batches")
            .updateOne({ _id: batch._id}, { "$set": {
                stamp: payload
            }});

        return res.status(200).json(batch);

        // Create QR Code
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }
});

module.exports = router;