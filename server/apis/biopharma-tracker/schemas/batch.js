

/**
 * @swagger
 * components:
 *   schemas:
 *     Batch:
 *       type: object
 *       required:
 *         - title
 *         - expirationDate
 *         - finished
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the batch
 *         title:
 *           type: string
 *           description: The title of your book
 *         expirationDate:
 *           type: string
 *           format: date
 *           description: The expiration date
 *         status:
 *           type: string
 *           description: Status of the batch
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         _id: d5fE_asz
 *         title: Batch title
 *         expirationDate: 2022-03-10T04:05:06.157Z
 *         status: RECEIVED
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
class Batch {
    constructor(title, expirationDate) {
        this.title = title;
        this.expirationDate = expirationDate;
        this.status = "DRAFT";
        this.createdAt = new Date();
    }
}

module.exports = Batch;