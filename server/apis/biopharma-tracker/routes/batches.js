const express = require('express');
const router = express.Router();
require("../schemas/batch");
const stampData = require("../stamp");
const getDb = require("../db");
const generate = require("../qrCode");


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();

const COLLECTION = "batches";

/**
* @swagger
* tags:
*   name: Batches
*   description: The batch managing API
* /batches:
*   post:
*     summary: Create a new batch
*     tags: [Batches]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Book'
*     responses:
*       200:
*         description: The created batch.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Book'
*       500:
*         description: Some server error
*
*/
router.post("/", async (req, res, next) => {

    const payload = req.body;
    console.log('Payload!', payload);

    const stamp = await stampData(payload, COLLECTION);
    console.log('Data stamped!');
    let batch = { ...payload };
    batch._id = stamp._id;
    batch.stamp = stamp;

    try {

        await mongodb.connect();
        console.log('Connected to DB');
        await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .insertOne(batch);
        console.log('Batch created!')
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

router.get("/:batchId", async (req, res, next) => {

    const { batchId } = req.params;

    console.log('Batch ID', batchId);

    try {

        console.log('Looking batch up');
        await mongodb.connect();

        console.log('Connected to DB');

        const batch = await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .findOne({ _id: batchId });

        console.log('Batch', batch);

        if (!batch) {
            return res.status(404).json({
                error: 'Batch not found'
            });
        }

        return res.status(200).json(batch);

        // Create QR Code
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }
});

/**
 * Get batch master QR Code
 */
router.get("/:batchId/qr-code", async (req, res, next) => {

    const { batchId } = req.params;

    console.log('Batch ID', batchId);

    try {

        console.log('Looking batch up');
        await mongodb.connect();

        console.log('Connected to DB');

        const batch = await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .findOne({ _id: batchId });

        console.log('Batch', batch);

        if (!batch) {
            return res.status(404).json({
                error: 'Batch not found'
            });
        }

        const qrData = {
            id: batch._id,
            productId: batch.productId,
            productType: batch.productType,
            expirationDate: batch.expirationDate,
            brand: batch.brand
        };
        const qrImage = await generate(qrData)
        res.send(qrImage);

        // Create QR Code
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }

});


router.get("/list", async (req, res, next) => {

});

module.exports = router;