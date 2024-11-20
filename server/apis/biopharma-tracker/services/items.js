const getDb = require("../db");
const stampData = require("./stamp");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();

const COLLECTION = "batch-items";

const createItems = async (batchId, numItems) => {
    if(numItems) {
        try {
            await mongodb.connect();
            for(let i=0; i<numItems; i++) {
                let batchItem = {
                    batchId,
                    itemNumber: i + 1,
                    status: 'DRAFT'
                };

                const stamp = await stampData(batchItem, COLLECTION, 'CREATE');

                batchItem._id = stamp._id;
                batchItem.stamp = stamp;
                await mongodb
                    .db("biopharma-tracker")
                    .collection(COLLECTION)
                    .insertOne(batchItem);
            }
            
            
            console.log('Batch items created!')
        } catch (e) {
            console.log(e);
        } finally {
            // Ensures that the client will close when you finish/error
            if (mongodb) await mongodb.close();
        }
    }
};

module.exports = {
    createItems
};