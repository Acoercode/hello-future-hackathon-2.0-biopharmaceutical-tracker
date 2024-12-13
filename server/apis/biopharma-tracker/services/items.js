const getDb = require("../db");
const { stampData } = require("./stamp");
const { daysBetween } = require("../utils");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = getDb();

const COLLECTION = "batch-items";

const createItems = async (batchId, numItems) => {
    if (numItems) {
        try {
            await mongodb.connect();
            for (let i = 0; i < numItems; i++) {
                let batchItem = {
                    batchId,
                    itemNumber: i + 1,
                    status: 'MANUFACTURED',
                    activities: [{
                        status: 'MANUFACTURED',
                        date: (new Date()).toISOString()
                    }]
                };

                const stamp = await stampData(batchItem, COLLECTION, 'MANUFACTURED');

                batchItem._id = stamp._id;
                batchItem.stamp = {
                    ...stamp,
                    stampedData: JSON.stringify(batchItem)
                };
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

const updateBatchItem = async (batchId, batchItemId, payload) => {
    try {
        await mongodb.connect();

        await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .updateOne({ _id: batchItemId, batchId }, {
                "$set": {
                    ...payload
                }
            });

        return await getBatchItem(batchId, batchItemId);
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
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

const list = async (batchId, limit = 10, skip = 0, sort = "itemNumber", direction = "ASC", filters) => {

    const sortOp = {
        [sort]: direction === "ASC" ? 1 : -1
    }

    try {
        await mongodb.connect();

        const aggregations = !!filters && Object.keys(filters).length > 0 ? [{
            $match: Object.keys(filters).reduce((acc, key) => {
                acc[key] = {
                    "$in": filters[key].split(",").map(v => v.trim())
                }
                return acc;
            }, {
                batchId: batchId
            })
        }] : [{
            $match: {
                batchId: batchId
            }
        }];

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

        const [{ total: [total = 0], edges }] = await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .aggregate(aggregations).toArray();

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

const count = async (batchId, filters) => {
    try {
        await mongodb.connect();

        const match = !!filters && Object.keys(filters).length > 0 ? Object.keys(filters).reduce((acc, key) => {
            acc[key] = {
                "$in": filters[key].split(",").map(v => v.trim())
            }
            return acc;
        }, {
            batchId: batchId
        }) : {
            batchId: batchId
        };

        const countTotal = await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .countDocuments(match);

        return countTotal;
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }

}

const addItemActivity = async (batchItem, activity) => {
    try {
        await mongodb.connect();
        const activities = batchItem.activities || [];
        activities.push({
            ...activity,
            date: (new Date()).toISOString()
        });


        await mongodb
            .db("biopharma-tracker")
            .collection(COLLECTION)
            .updateOne({ _id: batchItem._id }, {
                "$set": {
                    activities: activities,
                    status: activity.status
                }
            });

        return await getBatchItem(batchItem.batchId, batchItem._id);
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }
}

const getStockLevelAt = async (date, productId) => {
    try {
        await mongodb.connect();

        const aggregation = [
            {
                $match:
                /**
                 * query: The query in MQL.
                 */
                {
                    productId: productId
                }
            },
            {
                $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                    from: "batch-items",
                    localField: "_id",
                    foreignField: "batchId",
                    as: "items"
                }
            },
            {
                $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                    path: "$items",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $addFields:
                /**
                 * newField: The new field name.
                 * expression: The new field expression.
                 */
                {
                    itemId: "$items._id",
                    activities: "$items.activities"
                }
            },
            {
                $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                    batchId: 1,
                    itemId: 1,
                    activities: 1
                }
            },
            {
                $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                    path: "$activities",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $addFields:
                /**
                 * newField: The new field name.
                 * expression: The new field expression.
                 */
                {
                    status: "$activities.status",
                    date: "$activities.date"
                }
            },
            {
                $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                    itemId: 1,
                    status: 1,
                    date: {
                        $dateFromString: {
                            dateString: "$date"
                        }
                    }
                }
            },
            {
                $match:
                /**
                 * query: The query in MQL.
                 */
                {
                    date: {
                        $lt: date
                    }
                }
            },
            {
                $group:
                /**
                 * _id: The id of the group.
                 * fieldN: The first field name.
                 */
                {
                    _id: "status",
                    count: {
                        $sum: 1
                    }
                }
            }
        ];

        const result = await mongodb
            .db("biopharma-tracker")
            .collection('batches')
            .aggregate(aggregation).toArray();

        const total = result && result.length > 0 && result.reduce((accum, r) => {
            if (r._id === 'ADMINISTERED')
                return accum - r.count;
            if (r._id === 'MANUFACTURED')
                return accum + r.count
        }, 0) || 0;

        return total;
    } catch (e) {
        console.log(e);
    } finally {
        // Ensures that the client will close when you finish/error
        if (mongodb) await mongodb.close();
    }
}

const getStockLevel = async (since, productId) => {
    const initialLevel = await getStockLevelAt(since, productId);

    try {
        await mongodb.connect();

        const aggregation = [
            {
                $match:
                /**
                 * query: The query in MQL.
                 */
                {
                    productId: productId
                }
            },
            {
                $lookup:
                /**
                 * from: The target collection.
                 * localField: The local join field.
                 * foreignField: The target join field.
                 * as: The name for the results.
                 * pipeline: Optional pipeline to run on the foreign collection.
                 * let: Optional variables to use in the pipeline field stages.
                 */
                {
                    from: "batch-items",
                    localField: "_id",
                    foreignField: "batchId",
                    as: "items"
                }
            },
            {
                $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                    path: "$items",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $addFields:
                /**
                 * newField: The new field name.
                 * expression: The new field expression.
                 */
                {
                    itemId: "$items._id",
                    activities: "$items.activities"
                }
            },
            {
                $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                    batchId: 1,
                    itemId: 1,
                    activities: 1
                }
            },
            {
                $unwind:
                /**
                 * path: Path to the array field.
                 * includeArrayIndex: Optional name for index.
                 * preserveNullAndEmptyArrays: Optional
                 *   toggle to unwind null and empty values.
                 */
                {
                    path: "$activities",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $addFields:
                /**
                 * newField: The new field name.
                 * expression: The new field expression.
                 */
                {
                    status: "$activities.status",
                    date: {
                        $substr: ["$activities.date", 0, 10]
                    }
                }
            },
            {
                $project:
                /**
                 * specifications: The fields to
                 *   include or exclude.
                 */
                {
                    itemId: 1,
                    status: 1,
                    date: 1,
                    when: {
                        $dateFromString: {
                            dateString: "$date"
                        }
                    }
                }
            },
            {
                $match:
                /**
                 * query: The query in MQL.
                 */
                {
                    when: {
                        $gte: since
                    }
                }
            },
            {
                $facet:
                /**
                 * outputFieldN: The first output field.
                 * stageN: The first aggregation stage.
                 */
                {
                    manufactured: [
                        {
                            $match: {
                                status: "MANUFACTURED"
                            }
                        },
                        {
                            $unwind: "$date"
                        },
                        {
                            $sortByCount: "$date"
                        }
                    ],
                    administered: [
                        {
                            $match: {
                                status: "ADMINISTERED"
                            }
                        },
                        {
                            $unwind: "$date"
                        },
                        {
                            $sortByCount: "$date"
                        }
                    ]
                }
            }
        ];

        const [{ manufactured, administered }] = await mongodb
            .db("biopharma-tracker")
            .collection('batches')
            .aggregate(aggregation).toArray()

        const manufacturedByDate = manufactured.reduce((accum, v) => {
            return {
                ...accum,
                [v._id]: v.count
            };
        }, {});

        const administeredByDate = administered.reduce((accum, v) => {
            return {
                ...accum,
                [v._id]: v.count
            };
        }, {});

        const firstDate = new Date();
        firstDate.setDate((new Date()).getDate() - 29);
        const days = daysBetween(firstDate, new Date());

        const result = days.reduce((accum, d) => {
            return {
                history: [
                    ...accum.history,
                    {
                        date: d,
                        stockLevel: (accum.stockLevel ||  0 ) + (manufacturedByDate[d] || 0) - (administeredByDate[d] || 0)
                    }
                ],
                stockLevel: (accum.stockLevel ||  0 ) + (manufacturedByDate[d] || 0) - (administeredByDate[d] || 0)
            };
        }, {
            history: [{ date: since.toISOString().substring(0, 10), stockLevel: initialLevel }],
            stockLevel: initialLevel
        });


        return result;
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
    list,
    addItemActivity,
    updateBatchItem,
    count,
    getStockLevel
};