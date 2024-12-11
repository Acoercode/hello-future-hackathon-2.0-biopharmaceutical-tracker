const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/biopharma-tracker';

let mongodb;

const getDB = () => {

    if(mongodb) {
        return mongodb;
    }
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    mongodb = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
    return mongodb;
}

module.exports = getDB;