const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * An invoice is a document sent to the customer with the details of the products/services that were purchased from
 * the organization. This class houses all the parameters required to update invoice line items, which record
 * details of each product or service that was purchased.
 *
 * @param   {[object]}  invoiceLineItem                     the details of an invoiceLineItem
 * @param   {string}    invoiceLineItem.entity              the type of entity
 * @param   {string}    invoiceLineItem.id                  the system generated invoice ID that is unique to an invoiceLineItem record
 * @param   {string}    invoiceLineItem.createdTime         date and time the invoice line item was created
 * @param   {string}    invoiceLineItem.updatedTime         date and time the invoice line item was last updated
 * @param   {string}    invoiceLineItem.invoiceId           the system generated invoice ID that is unique to an invoice record
 * @param   {string}    invoiceLineItem.itemId              the system generated ID of the item that was created
 * @param   {number}    invoiceLineItem.quantity            number of items sold or the hours/days spent providing the service
 * @param   {number}    invoiceLineItem.amount              total cost line item (quantity x price or ratePercent x amount)
 * @param   {number}    invoiceLineItem.price               price/rate of the product or service
 * @param   {number}    invoiceLineItem.ratePercent         calculate the price of an item based on rate. Used if price field is empty.
 * @param   {string}    invoiceLineItem.chartOfAccountId    the system generated ID of the account that the invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    invoiceLineItem.departmentId        the system generated ID of the department that the invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    invoiceLineItem.locationId          the system generated ID of the location that the invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    invoiceLineItem.actgClassId         the system generated ID of the accounting class that the invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    invoiceLineItem.jobId               the system generated ID of the job that the invoice line item needs to be recorded for account tracking purposes
 * @param   {boolean}   invoiceLineItem.taxable             denotes if the invoice line item is taxable [value = true] or not[value = false]
 * @param   {string}    invoiceLineItem.taxCode             the tax code that can be applied on the invoice line item
 *
 * @throws  {IncorrectEntityException}                      this exception is thrown if the object passed does not have an entity type of InvoiceLineItem
 */

// entity class which represents a InvoiceLineItem entity
class InvoiceLineItemEntity {
    constructor(invoiceLineItem) {
        // check to make sure the entity type is correct, if not throw an exception
        if (invoiceLineItem.entity !== 'InvoiceLineItem') {
            throw new IncorrectEntityException(
                invoiceLineItem.entity,
                'InvoiceLineItem'
            );
        }

        this.entity = invoiceLineItem.entity;
        this.id = invoiceLineItem.id;
        this.createdTime = invoiceLineItem.createdTime;
        this.updatedTime = invoiceLineItem.updatedTime;
        this.invoiceId = invoiceLineItem.invoiceId;
        this.itemId = invoiceLineItem.itemId;
        this.quantity = invoiceLineItem.quantity;
        this.amount = invoiceLineItem.amount;
        this.price = invoiceLineItem.price;
        this.ratePercent = invoiceLineItem.ratePercent;
        this.chartOfAccountId = invoiceLineItem.chartOfAccountId;
        this.departmentId = invoiceLineItem.departmentId;
        this.locationId = invoiceLineItem.locationId;
        this.actgClassId = invoiceLineItem.actgClassId;
        this.jobId = invoiceLineItem.jobId;
        this.description = invoiceLineItem.description;
        this.taxable = invoiceLineItem.taxable;
        this.taxCode = invoiceLineItem.taxCode;
    }
}

module.exports = InvoiceLineItemEntity;
