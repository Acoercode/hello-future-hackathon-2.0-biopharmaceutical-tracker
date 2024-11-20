const express = require('express');
const router = express.Router({ mergeParams: true });
const stampData = require("../services/stamp");
const getDb = require("../db");
const generate = require("../qrCode");


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();

const COLLECTION = "batch-items";

router.get("/list", async (req, res, next) => {
    const { batchId } = req.params;

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
                    $match: {
                        batchId: batchId
                    }
                },
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
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }

});

router.get("/:itemId", async (req, res, next) => {

    const { batchId, itemId } = req.params;

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
router.get("/:itemId/qr-code", async (req, res, next) => {

    const { batchId, itemId } = req.params;

    try {
        await mongodb.connect();

        const item = await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .findOne({ 
                _id: itemId,
                batchId
            });

        const batch = await mongodb
            .db("biopharma-tracker")
            .collection("batches")
            .findOne({ 
                _id: batchId
            });

        if (!item) {
            return res.status(404).json({
                error: 'Item not found'
            });
        }

        const qrData = {
            id: item._id,
            batchId: item.batchId,
            itemNumber: item.itemNumber,
            brand: batch.brand,
            productId: batch.productId,
            productType: batch.productType,
            batchNumber: batch.batchNumber,
            expirationDate: batch.expirationDate
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




module.exports = router;