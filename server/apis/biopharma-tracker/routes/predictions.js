const express = require('express');

const { validate } = require("../services/stamp");
const { getPrediction } = require("../services/predictions");

const router = express.Router();

router.get("/:predictionId/trust", async (req, res, next) => {

    const { predictionId } = req.params;
    const prediction = await getPrediction(predictionId);

    if (prediction) {
        const validation = await validate(prediction);
        return res.status(200).json(validation);
    }

    return res.status(404).json({
        error: 'Batch not found'
    });
});

module.exports = router;