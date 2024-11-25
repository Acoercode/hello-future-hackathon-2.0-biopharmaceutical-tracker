const getDb = require("../db");
const { createItems } = require("./items");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();
const COLLECTION = "batches";

const updateBatch = async (batchId, payload) => {
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

        return await getBatch(batchId);
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }
};

const addBatch = async (batch) => {
    try {
        await mongodb.connect();
        await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .insertOne(batch);
        console.log('Batch created!', batch._id)
        await createItems(batch._id, batch.numberOfItems)
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }
};

const addActivity = async (batch, activity) => {
    try {
        await mongodb.connect();
        const activities = batch.activities || [];
        activities.push({
            ...activity,
            date: (new Date()).toISOString()
        });


        await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .updateOne({ _id: batch._id }, {
                "$set": {
                    activities: activities,
                    status: activity.status
                }
            });

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
        await mongodb.connect();

        console.log('Connected to DB');

        const batch = await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .findOne({ _id: batchId });

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

const list = async (limit = 10, skip = 0, sort = "expirationDate", direction = "ASC", filters) => {

    try {
        await mongodb.connect();

        const sortOp = {
            [sort]: direction === "ASC" ? 1 : -1
        }

        const aggregations = !!filters && Object.keys(filters).length > 0 ? [{
            $match: Object.keys(filters).reduce((acc, key) => {
                acc[key] = {
                    "$in": filters[key].split(",").map(v => v.trim())
                }
                return acc;
            }, {})
        }] : [];

        // Facet op
        aggregations.push({
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
        });

        // Project op
        aggregations.push({
            $project: {
                total: '$total.count',
                edges: '$edges',
            },
        });

        console.log('Aggregations', aggregations);

        const [{ total: [total = 0], edges }] = await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .aggregate(aggregations).toArray();

        return {
            total,
            pageSize: edges.length,
            items: edges
        };

        // Create QR Code
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }

}

module.exports = {
    addBatch,
    updateBatch,
    addActivity,
    getBatch,
    list
}