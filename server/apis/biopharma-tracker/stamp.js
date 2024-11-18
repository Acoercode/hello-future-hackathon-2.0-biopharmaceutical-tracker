
const superagent = require('superagent');
const crypto = require('crypto');

const API_KEY = process.env.HASHLOG_API_KEY || "hbar_mk_vTnMts1ghaU96sULBWtg4y10jdLFuiKCaO5x785YZp9NO5bv"

const stampData = async (payload, type) => {

    const md5sum = crypto.createHash('md5');
    const hash = md5sum.update(JSON.stringify(payload)).digest('hex')
    // Call the stamping API
    let stamp = await superagent
        .post("https://external.hashlog.io/event")
        .set("APIKey", API_KEY)
        .send({
            data: JSON.stringify({ hash, type })
        });

    // Return the stamp
    return stamp.body;
}

module.exports = stampData;