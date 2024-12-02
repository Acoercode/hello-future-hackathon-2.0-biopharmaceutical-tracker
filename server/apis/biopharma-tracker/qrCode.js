const { QRCodeCanvas } = require('@loskir/styled-qr-code-node');

const generate = async (data) => {

  const qrCode = new QRCodeCanvas({
    data: JSON.stringify(data),
    image: './img/BioPharmaTrackerQR_Round.png',
    cornersSquareOptions: {
      type: 'extra-rounded'

    }
  });

  return await qrCode.toDataUrl("png")
}

module.exports = generate;