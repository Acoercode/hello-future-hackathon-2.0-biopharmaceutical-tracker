const QRCode = require('qrcode');

const generate = async (data) => {
    const qrCodeImage = QRCode.toDataURL(JSON.stringify(data));
    return qrCodeImage;
}

module.exports = generate;