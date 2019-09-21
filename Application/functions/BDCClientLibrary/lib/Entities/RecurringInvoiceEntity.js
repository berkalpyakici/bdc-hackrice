const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A recurring invoice is a document that needs to be sent to a customer at regular intervals with the details of the
 * products/services that were purchased from the organization.
 * This class houses all the parameters required to read, update. and list recurring invoices.
 *
 * @param   {object}    recurringInvoice                            the details of a recurring invoice
 * @param   {string}    recurringInvoice.entity                     the type of entity
 * @param   {string}    recurringInvoice.isActive                   denotes if the recurring invoice is active [value= "1"] or inactive [value= "2"]
 * @param   {string}    recurringInvoice.customerId                 the system generated customer ID of the customer that the recurring invoice is sent to
 * @param   {string}    recurringInvoice.poNumber                   number on the Purchase Order (PO) associated with the invoice
 * @param   {string}    recurringInvoice.salesRep                   name of the sales representative associated with this invoice
 * @param   {string}    recurringInvoice.departmentId               the ID of the department that the invoice needs to be recorded for account tracking purposes
 * @param   {string}    recurringInvoice.locationId                 the ID of the location that the invoice needs to be recorded for account tracking purposes
 * @param   {string}    recurringInvoice.actgClassId                the ID of the accounting class that the invoice needs to be recorded for account tracking purposes
 * @param   {string}    recurringInvoice.jobId                      the ID of the job that the invoice needs to be recorded for account tracking purposes
 * @param   {string}    recurringInvoice.itemSalesTax               the ID of the Sales Tax item that is applied to all the taxable line items on the invoice
 * @param   {string}    recurringInvoice.description                a brief description about the recurring invoice
 * @param   {boolean}   recurringInvoice.isToBePrinted              denotes if the invoice needs to be printed/mailed [value = true] or not [value = false]
 * @param   {boolean}   recurringInvoice.isToBeEmailed              denotes if the invoice needs to be emailed [value = true] or not [value = false]
 * @param   {boolean}   recurringInvoice.isToBeAutoEmailed          denotes if the invoice needs to be generated and automatically emailed [value = true] or not [value = false]
 * @param   {boolean}   recurringInvoice.isToBeAutoMailed           denotes if the invoice needs to be printed and automatically mailed [value = true] or not [value = false]
 * @param   {string}    recurringInvoice.fromUserId                 the system generated user ID of user who needs to receive the emailed invoice
 * @param   {string}    recurringInvoice.timePeriod                 denotes how often the invoice will be generated (daily [value = "0"], weekly [value = "1"], monthly [value = "2"], yearly [value = "3"], and none [value = "9"])
 * @param   {string}    recurringInvoice.frequencyPerTimePeriod     defines how many times the invoice needs to be generated during the defined time period
 * @param   {string}    recurringInvoice.nextDueDate                sets the due date of the next invoice
 * @param   {string}    recurringInvoice.endDate                    the date after which the recurring invoices no longer needs to be generated
 * @param   {string}    recurringInvoice.daysInAdvance              defines how many days in advance from the the nextDueDate, the next invoice needs to be generated. If this date has already passed for one or more
 *                                                                  invoice, those invoices are generated on the date the recurring invoice details are defined.
 * @param   {string}    recurringInvoice.taxableAmount              total amount the sales tax needs to be applied
 * @param   {string}    recurringInvoice.subtotal                   total amount of line items without taxes
 * @param   {string}    recurringInvoice.createdTime                date and time the recurring invoice was created
 * @param   {string}    recurringInvoice.updatedTime                date and time the recurring invoice was last updated
 * @param   {object[]}  recurringInvoice.recurringInvoiceLineItems  an array of <a href="index.html#recurringinvoicelineitementity" target="_blank">recurringInvoiceLineItem objects</a>
 * @param   {object}    metadata                                    the fields and metadata of the recurring invoice entity
 *
 * @throws  {IncorrectEntityException}                              this exception is thrown if the object passed does not have an entity type of recurringInvoice
 */

// entity class which represents a RecurringInvoice entity
class RecurringInvoiceEntity {
    constructor(recurringInvoice, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (recurringInvoice.entity !== 'RecurringInvoice') {
            throw new IncorrectEntityException(
                recurringInvoice.entity,
                'RecurringInvoice'
            );
        }

        this.entity = recurringInvoice.entity;
        this.id = recurringInvoice.id;
        this.isActive = recurringInvoice.isActive;
        this.customerId = recurringInvoice.customerId;
        this.poNumber = recurringInvoice.poNumber;
        this.salesRep = recurringInvoice.salesRep;
        this.departmentId = recurringInvoice.departmentId;
        this.locationId = recurringInvoice.locationId;
        this.actgClassId = recurringInvoice.actgClassId;
        this.jobId = recurringInvoice.jobId;
        this.itemSalesTax = recurringInvoice.itemSalesTax;
        this.description = recurringInvoice.description;
        this.isToBePrinted = recurringInvoice.isToBePrinted;
        this.isToBeEmailed = recurringInvoice.isToBeEmailed;
        this.isToBeAutoEmailed = recurringInvoice.isToBeAutoEmailed;
        this.isToBeAutoMailed = recurringInvoice.isToBeAutoMailed;
        this.fromUserId = recurringInvoice.fromUserId;
        this.timePeriod = recurringInvoice.timePeriod;
        this.frequencyPerTimePeriod = recurringInvoice.frequencyPerTimePeriod;
        this.nextDueDate = recurringInvoice.nextDueDate;
        this.endDate = recurringInvoice.endDate;
        this.daysInAdvance = recurringInvoice.daysInAdvance;
        this.taxableAmount = recurringInvoice.taxableAmount;
        this.subtotal = recurringInvoice.subtotal;
        this.createdTime = recurringInvoice.createdTime;
        this.updatedTime = recurringInvoice.updatedTime;
        this.recurringInvoiceLineItems =
            recurringInvoice.recurringInvoiceLineItems;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = RecurringInvoiceEntity;
