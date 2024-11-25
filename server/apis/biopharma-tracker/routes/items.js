const express = require('express');
const router = express.Router({ mergeParams: true });
const generate = require("../qrCode");
const { getBatchItem, list } = require("../services/items");
const { validate } = require("../services/stamp");

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




module.exports = router;