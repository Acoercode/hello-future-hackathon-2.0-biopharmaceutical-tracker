const getDb = require("../db");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();
const COLLECTION = "batches";

const updateBatch = async (batchId, payload) => {
    try {
        await mongodb.connect();
    
        await mongodb
                .db("biopharma-tracker")
                .collection(COLLECTION)
                .updateOne({ _id: batchId}, { "$set": {
                    ...payload
                }});

        return await getBatch(batchId);
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    } 
};

const addBatch = async (payload) => {

};

const addActivity = async (batch, activity) => {
    try {
        await mongodb.connect();
        const test = [];
        const activities = batch.activities || [];
        activities.push({
            ...activity,
            date: (new Date()).toISOString()
        });
    
    
        await mongodb
                .db("biopharma-tracker")
                .collection(COLLECTION)
                .updateOne({ _id: batch._id}, { "$set": {
                    activities: activities,
                    status: activity.status
                }});

        return await getBatch(batch._id);
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    } 
    
    
}

const getBatch = async (batchId) => {

    try {

        console.log('Looking batch up');
        await mongodb.connect();

        console.log('Connected to DB');

        const batch = await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .findOne({ _id: batchId });

        console.log('Batch', batch);

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
    addBatch,
    updateBatch,
    addActivity,
    getBatch
}