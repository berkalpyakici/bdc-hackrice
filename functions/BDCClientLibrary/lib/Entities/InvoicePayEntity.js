const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * An InvoicePay represents the relationship between a ReceivedPay applied to an Invoice
 *
 * @param   {object}    invoicePay              the details of a invoicePay
 * @param   {string}    invoicePay.entity       the type of entity
 * @param   {string}    invoicePay.id           the system generated invoicePay ID that is unique to a invoicePay record
 * @param   {string}    invoicePay.invoiceId    ID of the invoice that was paid
 * @param   {number}    invoicePay.amount       total payment amount
 * @param   {string}    invoicePay.description  a brief description on the invoice payment
 * @param   {string}    invoicePay.createdTime  the date and time the invoicePay was created
 * @param   {string}    invoicePay.updatedTime  the date and time the invoicePay was last updated
 *
 * @throws {IncorrectEntityException}           this exception is thrown if the object passed does not have an entity type of InvoicePay
 */

// entity class which represents a InvoicePay entity
class InvoicePayEntity {
    constructor(invoicePay) {
        // check to make sure the entity type is correct, if not throw an exception
        if (invoicePay.entity !== 'InvoicePay') {
            throw new IncorrectEntityException(invoicePay.entity, 'InvoicePay');
        }

        this.entity = invoicePay.entity;
        this.id = invoicePay.id;
        this.invoiceId = invoicePay.invoiceId;
        this.amount = invoicePay.amount;
        this.description = invoicePay.description;
        this.createdTime = invoicePay.createdTime;
        this.updatedTime = invoicePay.updatedTime;
    }
}

module.exports = InvoicePayEntity;
