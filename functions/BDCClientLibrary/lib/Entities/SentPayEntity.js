const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * Sent Pay represents details on any payment made or recorded in the Bill.com account
 *
 * @param   {object}    sentPay                     the details of sentPay
 * @param   {string}    sentPay.entity              the type of entity
 * @param   {string}    sentPay.id                  the system generated sentPay ID that is unique to a sentPay record
 * @param   {string}    sentPay.processDate         the date on which payment is processed from payer's bank account
 * @param   {number}    sentPay.amount              total payment amount
 * @param   {string}    sentPay.status              status of the payment received. You can filter by this field on the List call
 * @param   {string}    sentPay.description         a brief description on the payment that was made. It is automatically generated for payments made via Bill.com.
 * @param   {string}    sentPay.txnNumber           system generated payment identification number
 * @param   {string}    sentPay.name                this is the payment confirmation number assigned to the payment
 * @param   {string}    sentPay.vendorId            the system generated ID of the vendor that made the payment
 * @param   {boolean}   sentPay.isOnline            flag indicating whether the payment is sent through Bill.com [value = true] or if it sent via a different method and then recorded in the system [value = false]
 * @param   {string}    sentPay.chartOfAccountId    GL Account (CoA object) that reflects where this payment should post
 * @param   {string}    sentPay.syncReference       only exposed for Offline Payments - user-defined reference for a payment (for example, check number)
 * @param   {boolean}   sentPay.toPrintCheck        only exposed for Offline Payments - flag to designate that payment should be printable when synced to third-party system
 * @param   {string}    sentPay.createdTime         the date and time the sentPay was created
 * @param   {string}    sentPay.updatedTime         the date and time the sentPay was last updated
 * @param   {string}    sentPay.bankAccoutId        only populated for online payments - ID of bank account object that provided funding for this payment
 * @param   {boolean}   sentPay.needAttnReview      flag for sentPay object which alerts the user that payment needs to be reviewed
 * @param   {string}    sentPay.source              denotes the source of the payment (BDC [value = "0"], BillAutoPay [value = "1"], NetSyncFromOnlinePayment [value = "2"], and NetSyncFromOfflinePayment [value = "3")
 * @param   {object[]}  sentPay.billPays            array of <a href="index.html#billpayentity" target="_blank">BillPayEntity objects</a>
 * @param   {object[]}  sentPay.billCredits         array of <a href="index.html#billcreditentity" target="_blank">BillCreditEntity objects</a>
 * @param   {object}    metadata                    the list of fields and metadata for the sentPay entity type
 *
 * @throws  {IncorrectEntityException}              this exception is thrown if the object passed does not have an entity type of SentPay
 */

// entity class which represents a SentPay entity
class SentPayEntity {
    constructor(sentPay, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (sentPay.entity !== 'SentPay') {
            throw new IncorrectEntityException(sentPay.entity, 'SentPay');
        }

        this.entity = sentPay.entity;
        this.id = sentPay.id;
        this.processDate = sentPay.processDate;
        this.amount = sentPay.amount;
        this.status = sentPay.status;
        this.description = sentPay.description;
        this.txnNumber = sentPay.txnNumber;
        this.name = sentPay.name;
        this.vendorId = sentPay.vendorId;
        this.isOnline = sentPay.isOnline;
        this.chartOfAccountId = sentPay.chartOfAccountId;
        this.syncReference = sentPay.syncReference;
        this.toPrintCheck = sentPay.toPrintCheck;
        this.createdTime = sentPay.createdTime;
        this.updatedTime = sentPay.updatedTime;
        this.bankAccountId = sentPay.bankAccountId;
        this.needAttnReviewed = sentPay.needAttnReviewed;
        this.source = sentPay.source;
        this.billPays = sentPay.billPays;
        this.billCredits = sentPay.billCredits;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = SentPayEntity;
