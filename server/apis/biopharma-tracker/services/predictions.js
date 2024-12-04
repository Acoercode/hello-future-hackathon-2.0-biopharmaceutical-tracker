const getDb = require("../db");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();
const COLLECTION = "predictions";

const updatePrediction = async (batchId, payload) => {
    try {
        await mongodb.connect();

        await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .updateOne({ _id: batchId }, {
                "$set": {
                    ...payload
                }
            });

        return await getPrediction(batchId);
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }
};

const addPrediction = async (prediction) => {
    try {
        await mongodb.connect();
        await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .insertOne(prediction);
        console.log('Predictions saved!', prediction._id)
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }
};

const getPrediction = async (predictionId) => {

    try {
        await mongodb.connect();

        console.log('Connected to DB');

        const batch = await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .findOne({ _id: predictionId });

        return batch;

        // Create QR Code
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }

    return null;
};

module.exports = {
    addPrediction,
    updatePrediction,
    getPrediction
}