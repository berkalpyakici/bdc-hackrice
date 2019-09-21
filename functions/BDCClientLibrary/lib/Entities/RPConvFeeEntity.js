const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * An RPConvFee is a convenience fee which can be applied to an invoice. Convenience fees cannot be applied to invoices via the API, as they can only be applied via the Bill.com app.
 *
 * @param   {object}    rpConvFee                   the details of an rpConvFee
 * @param   {string}    rpConvFee.entity            the type of entity
 * @param   {string}    rpConvFee.id                the system generated rpConvFee ID that is unique to a rpConvFee record
 * @param   {string}    rpConvFee.refNumber         reference to identify the payment
 * @param   {string}    rpConvFee.amount            the amount of the convenience fee
 * @param   {string}    rpConvFee.paymentDate       date on which the payment was processed or recorded
 * @param   {string}    rpConvFee.chartOfAccountId  chart of Account that payment is posted to
 *
 * @throws  {IncorrectEntityException}              this exception is thrown if the object passed does not have an entity type of RPConvFee
 */

// entity class which represents a RPConvFee entity
class RPConvFeeEntity {
    constructor(rpConvFee) {
        // check to make sure the entity type is correct, if not throw an exception
        if (rpConvFee.entity !== 'RPConvFee') {
            throw new IncorrectEntityException(rpConvFee.entity, 'RPConvFee');
        }

        this.entity = rpConvFee.entity;
        this.id = rpConvFee.id;
        this.refNumber = rpConvFee.refNumber;
        this.amount = rpConvFee.amount;
        this.paymentDate = rpConvFee.paymentDate;
        this.chartOfAccountId = rpConvFee.chartOfAccountId;
    }
}

module.exports = RPConvFeeEntity;
