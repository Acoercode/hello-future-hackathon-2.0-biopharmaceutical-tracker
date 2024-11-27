const express = require('express');


const { stampData, validate } = require("../services/stamp");
const generate = require("../qrCode");
const { getBatch, addBatchActivity, updateBatch, addBatch, list, facets } = require("../services/batches");

const router = express.Router();

const COLLECTION = "batches";

router.post("/", async (req, res, next) => {

    const payload = req.body;
    let batch = {
        ...payload, status: 'MANUFACTURED', activities: [{
            status: 'MANUFACTURED',
            date: (new Date()).toISOString()
        }]
    };

    const stamp = await stampData(batch, COLLECTION, 'MANUFACTURED');

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
        const updatedBatch = await addBatchActivity(batch, payload);
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
    const { limit = 10, skip = 0, sort = "expirationDate", direction = "ASC", ...filters } = req.query;

    const response = await list(limit, skip, sort, direction, filters);

    return res.status(200).json(response);

});

router.get("/facets", async (req, res, next) => {
    const { ...filters } = req.query;

    const response = await facets(filters);

    return res.status(200).json(response);

});

router.get("/:batchId", async (req, res, next) => {

    const { batchId } = req.params;
    const batch = await getBatch(batchId);

    if (batch) {
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

router.get("/:batchId/trust", async (req, res, next) => {

    const { batchId } = req.params;
    const batch = await getBatch(batchId);

    if (batch) {
        const validation = await validate(batch);
        return res.status(200).json(validation);
    }

    return res.status(404).json({
        error: 'Batch not found'
    });
});




module.exports = router;