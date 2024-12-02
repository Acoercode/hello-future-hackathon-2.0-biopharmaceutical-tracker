const superagent = require('superagent');
const crypto = require('crypto');

const API_KEY = process.env.HASHLOG_API_KEY || "hbar_mk_vTnMts1ghaU96sULBWtg4y10jdLFuiKCaO5x785YZp9NO5bv"

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

    if(!!payload.stamp && !!payload.stamp.data) {

        const expected = JSON.parse(payload.stamp.data).hash;

        console.log('Expected', expected);
        const hash = await getHash(payload);
        console.log('Hash', hash);



        return ({
            verified: expected === hash
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