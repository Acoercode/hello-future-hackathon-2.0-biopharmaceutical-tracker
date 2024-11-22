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
                    status: 'MANUFACTURED'
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

const getBatchItem = async (batchId, itemId) => {
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

        return {
            ...item,
            batch
        }

        // Create QR Code
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }
}

const list = async (batchId, limit = 10, skip = 0, sort = "itemNumber", direction = "ASC" ) => {

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

            return {
                total,
                pageSize: edges.length,
                items: edges
            };
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }

}

module.exports = {
    createItems,
    getBatchItem,
    list
};