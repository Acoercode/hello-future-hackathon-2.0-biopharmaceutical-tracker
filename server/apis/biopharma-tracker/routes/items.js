const express = require('express');

const generate = require("../qrCode");
const { getBatchItem, list, addItemActivity, updateBatchItem, count } = require("../services/items");
const { getBatch, addBatchActivity, updateBatch } = require("../services/batches");
const { stampData, validate } = require("../services/stamp");


const router = express.Router({ mergeParams: true });

const COLLECTION = "batch-items";
const BATCH_COLLECTION = "batches";

router.get("/list", async (req, res, next) => {
    const { batchId } = req.params;

    const { limit = 10, skip = 0, sort = "itemNumber", direction = "ASC", ...filters } = req.query;

    const response = await list(batchId, limit, skip, sort, direction, filters);

    return res.status(200).json(response);

});

router.get("/:itemId", async (req, res, next) => {

    const { batchId, itemId } = req.params;

    console.log('Batch ID', batchId);

    const item = await getBatchItem(batchId, itemId);

    if (!item) {
        return res.status(404).json({
            error: 'Batch item not found'
        });
    }

    return res.status(200).json(item);
});

/**
 * Get batch master QR Code
 */
router.get("/:itemId/qr-code", async (req, res, next) => {

    const { batchId, itemId } = req.params;

    const item = await getBatchItem(batchId, itemId);

    if (!item) {
        return res.status(404).json({
            error: 'Item not found'
        });
    }

    const qrData = {
        id: item._id,
        batchId: item.batchId,
        itemNumber: item.itemNumber,
        brand: item.batch.brand,
        productId: item.batch.productId,
        productType: item.batch.productType,
        batchNumber: item.batch.batchNumber,
        expirationDate: item.batch.expirationDate
    };
    const qrImage = await generate(qrData)
    res.send(qrImage);
});

router.get("/:itemId/trust", async (req, res, next) => {

    const { batchId, itemId } = req.params;
    const item = await getBatchItem(batchId, itemId);

    if (!item) {
        return res.status(404).json({
            error: 'Item not found'
        });
    }

    const validation = await validate(item);
    return res.status(200).json(validation);
});

router.post("/:itemId/activity", async (req, res, next) => {
    const { batchId, itemId } = req.params;
    const batchItem = await getBatchItem(batchId, itemId);

    if (batchItem) {
        const payload = req.body;

        // ONLY ALLOW MANUFACTURED
        if (!!batchItem.status && batchItem.status !== 'ADMINISTERED' && !!payload.status && payload.status === 'ADMINISTERED') {
            const updatedBatch = await addItemActivity(batchItem, payload);
            const stamp = await stampData(updatedBatch, COLLECTION, payload.status);
            let stamped = await updateBatchItem(batchId, itemId, {
                stamp: {
                    ...stamp,
                    stampedData: JSON.stringify(updatedBatch)
                }
            });
            console.log('Stamped batch item', stamped);

            // Check batch
            const administeredCount = await count(batchId, { status: 'ADMINISTERED' });

            if (administeredCount > 0) {
                const batch = await getBatch(batchId);

                if (!batch) {
                    return res.status(404).json({
                        error: 'Parent batch not found.'
                    });
                }

                if (batch.numberOfItems == administeredCount) {
                    // Update batch
                    const payload = { status: 'ADMINISTERED' };
                    const updatedBatch = await addBatchActivity(batch, payload);
                    const batchStamp = await stampData(updatedBatch, BATCH_COLLECTION, payload.status);
                    await updateBatch(batchId, {
                        stamp: {
                            ...batchStamp,
                            stampedData: JSON.stringify(updatedBatch)
                        }
                    });
                    stamped = await getBatchItem(batchId, itemId);
                    console.log('Stamped batch');
                } else if (batch.status !== 'ADMINISTERING') {
                    const payload = { status: 'ADMINISTERING' };
                    const updatedBatch = await addBatchActivity(batch, payload);
                    const batchStamp = await stampData(updatedBatch, BATCH_COLLECTION, payload.status);
                    await updateBatch(batchId, {
                        stamp: {
                            ...batchStamp,
                            stampedData: JSON.stringify(updatedBatch)
                        }
                    });
                    stamped = await getBatchItem(batchId, itemId);
                    console.log('Stamped batch');
                }
            }

            return res.status(200).json(stamped);
        }

        return res.status(403).json({
            error: 'Status update not allowed'
        });

    } else {
        return res.status(404).json({
            error: 'Batch item not found'
        });
    }
});




module.exports = router;