const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A ReceivedPay entity is an invoice receipt received through Bill.com
 *
 * @param   {object}    receivedPay                     the details of a receivedPay
 * @param   {string}    receivedPay.entity              the type of entity
 * @param   {string}    receivedPay.id                  the system generated receivedPay ID that is unique to a receivedPay record
 * @param   {string}    receivedPay.createdTime         the date and time the receivedPay was created
 * @param   {string}    receivedPay.updatedTime         the date and time the receivedPay  was last updated
 * @param   {string}    receivedPay.customerId          the system generated ID of the customer that made the payment
 * @param   {string}    receivedPay.status              status of the payment received
 *                                                      (Paid [value = "0"], Void [value = "1"], Scheduled [value = "2"], Canceled [value = "3"], and Escheated [value = "4"])
 * @param   {string}    receivedPay.paymentDate         date on which the payment was processed or recorded
 * @param   {string}    receivedPay.depositToAccountId  chart of Account that payment is posted to
 * @param   {boolean}   receivedPay.isOnline            flag indicating whether the payment is received through Bill.com
 * @param   {string}    receivedPay.paymentType         denotes  the type the payment. Offline Payments - user-defined and updateable; Online Payments - automatically defined and read only
 *                                                      (Cash [value = "0"], Check [value = "1"], CreditCard [value = "2"], ACH [value = "3"], PayPal [value = "4"], and Other [value = "5"])
 * @param   {number}    receivedPay.amount              total payment amount
 * @param   {string}    receivedPay.description         a brief description on the received payment. It is automatically generated for payments received via Bill.com.
 * @param   {string}    receivedPay.refNumber           reference to identify the payment. It is automatically generated for payments received via Bill.com.
 * @param   {number}    receivedPay.convFeeAmount       convenience fee charged to the customer
 * @param   {string}    receivedPay.rPConvFee           array of <a href="index.html#rpconvfeeentity" target="_blank">RPConvFee objects</a> (these objects cannot be written via the API, but are included in the response if present in the received pay object)
 * @param   {object[]}  receivedPay.invoicePays         array of <a href="index.html#invoicepayentity" target="_blank">InvoicePay objects</a>
 * @param   {object}    metadata                        the list of fields and metadata for the bill entity type
 *
 * @throws  {IncorrectEntityException}                  this exception is thrown if the object passed does not have an entity type of ReceivedPay
 */

// entity class which represents a ReceivedPay entity
class ReceivedPayEntity {
    constructor(receivedPay, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (receivedPay.entity !== 'ReceivedPay') {
            throw new IncorrectEntityException(
                receivedPay.entity,
                'ReceivedPay'
            );
        }

        this.entity = receivedPay.entity;
        this.id = receivedPay.id;
        this.createdTime = receivedPay.createdTime;
        this.updatedTime = receivedPay.updatedTime;
        this.customerId = receivedPay.customerId;
        this.status = receivedPay.status;
        this.paymentDate = receivedPay.paymentDate;
        this.depositToAccountId = receivedPay.depositToAccountId;
        this.isOnline = receivedPay.isOnline;
        this.paymentType = receivedPay.paymentType;
        this.amount = receivedPay.amount;
        this.description = receivedPay.description;
        this.refNumber = receivedPay.refNumber;
        this.convFeeAmount = receivedPay.convFeeAmount;
        this.rPConvFee = receivedPay.rPConvFee; // convenience fees can only be set on an invoice through the Bill.com app
        this.invoicePays = receivedPay.invoicePays;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = ReceivedPayEntity;
