const express = require('express');


const stampData = require("../services/stamp");
const getDb = require("../db");
const generate = require("../qrCode");
const { getBatch, addActivity, updateBatch, addBatch } = require("../services/batches");

const router = express.Router();


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();

const COLLECTION = "batches";

router.post("/", async (req, res, next) => {

    const payload = req.body;

    const stamp = await stampData(payload, COLLECTION, 'MANUFACTURED');
    let batch = { ...payload, status: 'MANUFACTURED' };
    batch._id = stamp._id;
    batch.stamp = stamp;

    await addBatch(batch);

    return res.status(200).json({
        batchId: batch._id
    });
});

router.post("/:batchId/activity", async (req, res, next) => {
    const { batchId } = req.params;
    const batch = await getBatch(batchId);

    if (batch) {
        const payload = req.body;
        const updatedBatch = await addActivity(batch, payload);
        const stamp = await stampData(updatedBatch, COLLECTION, payload.status);
        const stamped = await updateBatch(batchId, { stamp });
        console.log('Stamped batch', stamped);
        return res.status(200).json(stamped);
    } else {
        return res.status(404).json({
            error: 'Batch not found'
        });
    }
});

router.get("/list", async (req, res, next) => {
    const { limit = 10, skip = 0, sort = "expirationDate", direction = "ASC" } = req.query;

    const sortOp = {
        [sort]: direction === "ASC" ? 1 : -1
    }

    try {
        await mongodb.connect();

        const [{ total: [total = 0], edges }] = await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .aggregate([
                {
                    $facet: {
                      total: [
                        { $group: { _id: null, count: { $sum: 1 } } },
                      ],
                      edges: [
                        { $sort: sortOp },
                        { $skip: typeof skip === 'string' ? Number.parseInt(skip) : skip },
                        { $limit: typeof limit === 'string' ? Number.parseInt(limit) : limit },
                      ],
                    },
                  },
                  {
                    $project: {
                      total: '$total.count',
                      edges: '$edges',
                    },
                }
            ]).toArray();

            return res.status(200).json({
                total,
                pageSize: edges.length,
                items: edges
            });

        // Create QR Code
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }

});

router.get("/:batchId", async (req, res, next) => {

    const { batchId } = req.params;
    const batch = await getBatch(batchId);

    if(batch) {
        return res.status(200).json(batch);
    }

    return res.status(404).json({
        error: 'Batch not found'
    });
});

/**
 * Get batch master QR Code
 */
router.get("/:batchId/qr-code", async (req, res, next) => {

    const { batchId } = req.params;

    const batch = await getBatch(batchId);

    if (!batch) {
        return res.status(404).json({
            error: 'Batch not found'
        });
    }

    const qrData = {
        id: batch._id,
        brand: batch.brand,
        productId: batch.productId,
        productType: batch.productType,
        batchNumber: batch.batchNumber,
        expirationDate: batch.expirationDate,
        numberOfItems: batch.numberOfItems,
    };
    const qrImage = await generate(qrData)
    res.send(qrImage);

});




module.exports = router;