const superagent = require('superagent');
const crypto = require('crypto');

const API_KEY = process.env.HASHLOG_API_KEY || "YYY"

const stampData = async (payload, type, action) => {

    const hash = await getHash(payload);

    // Call the stamping API
    let stamp = await superagent
        .post("https://external.hashlog.io/event")
        .set("APIKey", API_KEY)
        .send({
            data: JSON.stringify({ hash, type, action })
        });

    // Return the stamp
    return stamp.body;
}

const getHash = async (payload) => {

    let toStamp = {
        ...payload
    };

    // Remove fields that might change
    delete toStamp['_id'];
    delete toStamp['stamp'];
    delete toStamp['batch'];

    console.log('PAYLOAD', JSON.stringify(toStamp));

    const md5sum = crypto.createHash('md5');
    const hash = md5sum.update(JSON.stringify(toStamp)).digest('hex')

    return hash;
};

const validate = async (payload) => {

    if(!!payload.stamp && !!payload.stamp.data && !!payload.stamp.hederaTransactionId) {

        const expected = JSON.parse(payload.stamp.data).hash;

        console.log('Expected', expected);
        const hash = await getHash(payload);
        console.log('Hash', hash);



        return ({
            verified: expected === hash,
            txId: payload.stamp.hederaTransactionId
        });
    }
    return ({
        verified: false
    });
}

module.exports = {
    stampData,
    validate
};