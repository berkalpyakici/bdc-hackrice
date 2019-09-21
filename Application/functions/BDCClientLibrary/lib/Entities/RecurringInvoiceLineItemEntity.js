const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A recurring invoice is a document that needs to be sent to a customer at regular intervals with the details of the
 * products/services that were purchased from the organization.
 * This class houses all the parameters required to read, update, and list recurring invoice line items that record the details of a product or service.
 *
 * @param   {[object]}  recurringInvoiceLineItem                      the details of a recurringInvoiceLineItem
 * @param   {string}    recurringInvoiceLineItem.entity               the type of entity
 * @param   {string}    recurringInvoiceLineItem.id                   the system generated ID of the recurring invoice line item
 * @param   {string}    recurringInvoiceLineItem.departmentId         the system generated ID of the department that the recurring invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    recurringInvoiceLineItem.locationId           the system generated ID of the location that the recurring invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    recurringInvoiceLineItem.actgClassId          the system generated ID of the accounting class that the recurring invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    recurringInvoiceLineItem.jobId                the system generated ID of the job that the recurring invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    recurringInvoiceLineItem.description          a brief description of the goods/services
 * @param   {string}    recurringInvoiceLineItem.recurringInvoiceId   the system generated ID of the recurring invoice
 * @param   {string}    recurringInvoiceLineItem.itemId               the system generated ID of the item that the recurring invoice line item needs to be recorded for account tracking purposes
 * @param   {number}    recurringInvoiceLineItem.amount               total amount due for the line item (quantity x price or ratePercent x amount)
 * @param   {number}    recurringInvoiceLineItem.quantity             number of items sold or the hours/days spent providing the service
 * @param   {number}    recurringInvoiceLineItem.price                price/rate of the product or service
 * @param   {number}    recurringInvoiceLineItem.ratePercent          calculate the price of an item based on rate. Used if price field is empty
 * @param   {boolean}   recurringInvoiceLineItem.taxable              denotes if the invoice line item is taxable [value = true] or not[value = false]
 * @param   {string}    recurringInvoiceLineItem.createdTime          date and time the recurring invoice line item was created
 * @param   {string}    recurringInvoiceLineItem.updatedTime          date and time the recurring invoice line item was last updated
 *
 * @throws  {IncorrectEntityException}                                this exception is thrown if the object passed does not have an entity type of RecurringInvoiceLineItem
 */

// entity class which represents a RecurringInvoiceLineItem entity
class RecurringInvoiceLineItemEntity {
    constructor(recurringInvoiceLineItem) {
        // check to make sure the entity type is correct, if not throw an exception
        if (recurringInvoiceLineItem.entity !== 'RecurringInvoiceLineItem') {
            throw new IncorrectEntityException(
                recurringInvoiceLineItem.entity,
                'RecurringInvoiceLineItem'
            );
        }

        this.entity = recurringInvoiceLineItem.entity;
        this.id = recurringInvoiceLineItem.id;
        this.departmentId = recurringInvoiceLineItem.departmentId;
        this.locationId = recurringInvoiceLineItem.locationId;
        this.actgClassId = recurringInvoiceLineItem.actgClassId;
        this.jobId = recurringInvoiceLineItem.jobId;
        this.description = recurringInvoiceLineItem.description;
        this.recurringInvoiceId = recurringInvoiceLineItem.recurringInvoiceId;
        this.itemId = recurringInvoiceLineItem.itemId;
        this.amount = recurringInvoiceLineItem.amount;
        this.quantity = recurringInvoiceLineItem.quantity;
        this.price = recurringInvoiceLineItem.price;
        this.ratePercent = recurringInvoiceLineItem.ratePercent;
        this.taxable = recurringInvoiceLineItem.taxable;
        this.createdTime = recurringInvoiceLineItem.createdTime;
        this.updatedTime = recurringInvoiceLineItem.updatedTime;
    }
}

module.exports = RecurringInvoiceLineItemEntity;
