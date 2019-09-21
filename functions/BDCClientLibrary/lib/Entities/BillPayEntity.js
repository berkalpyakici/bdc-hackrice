const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A BillPay entity represents the relationship between a SentPay applied to a Bill.
 *
 * @param   {object}    billPay                  the details of a billPay
 * @param   {string}    billPay.entity           the type of entity
 * @param   {string}    billPay.id               the system generated billPay ID that is unique to a billPay record
 * @param   {string}    billPay.billId           ID of the bill the payment is made to
 * @param   {string}    billPay.name             name of the pay, automatically populated from the sentPay object its associated with
 * @param   {string}    billPay.paymentStatus    denotes the bill as paid or partially paid (PaidInFull scheduled or unpaid [value = "0"], Open [value = "1"], PartialPayment [value = "2"], and Scheduled [value = "4"])
 * @param   {number}    billPay.amount           total payment amount
 * @param   {string}    billPay.description      a brief description to identify the payment. It is automatically generated for payments made via Bill.com.
 * @param   {string}    billPay.processDate      automatically populated from SentPay object
 * @param   {string}    billPay.createdTime      the date and time the billPay was created
 * @param   {string}    billPay.updatedTime      the date and time the billPay was last updated
 * @param   {string}    billPay.syncReference    only exposed for offline payments - user-defined reference for a payment (for example, check number)
 * @param   {boolean}   billPay.toPrintCheck     only exposed for offline payments - flag to designate that payment should be printable when synced to a third-party system
 * @param   {string}    billPay.chartOfAccountId the ID of the account that the billPay needs to be recorded for account tracking purposes
 * @param   {string}    billPay.sentPayId        ID of the sentPay entity the billPay instance is associated with
 * @param   {boolean}   billPay.allowExport      determines whether or not this billPay can be exported
 *
 * @throws  {IncorrectEntityException}           this exception is thrown if the object passed does not have an entity type of BillPay
 */

// entity class which represents a BillPay entity
class BillPayEntity {
    constructor(billPay) {
        // check to make sure the entity type is correct, if not throw an exception
        if (billPay.entity !== 'BillPay') {
            throw new IncorrectEntityException(billPay.entity, 'BillPay');
        }

        this.entity = billPay.entity;
        this.id = billPay.id;
        this.billId = billPay.billId;
        this.name = billPay.name;
        this.paymentStatus = billPay.paymentStatus;
        this.amount = billPay.amount;
        this.description = billPay.description;
        this.processDate = billPay.processDate;
        this.createdTime = billPay.createdTime;
        this.updatedTime = billPay.updatedTime;
        // this.paymentType = billPay.paymentType; -- depricated field according to docs
        this.syncReference = billPay.syncReference;
        this.toPrintCheck = billPay.toPrintCheck;
        this.chartOfAccountId = billPay.chartOfAccountId;
        this.sentPayId = billPay.sentPayId;
        this.allowExport = billPay.allowExport;
    }
}

module.exports = BillPayEntity;
