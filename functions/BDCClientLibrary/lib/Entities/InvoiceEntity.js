const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * An invoice is a document sent to the customer with the details of the products/services that were purchased from
 * the organization. This class houses all the parameters required to update an invoice.
 *
 * @param   {object}    invoice                             the details of an invoice
 * @param   {string}    invoice.entity                      the type of entity
 * @param   {string}    invoice.id                          the system generated invoice ID that is unique to an invoice record
 * @param   {string}    invoice.isActive                    denotes if the object is active [value = "1"] or inactive [value = "2"]
 * @param   {string}    invoice.createdTime                 date and time the invoice was created
 * @param   {string}    invoice.updatedTime                 date and time the invoice was last updated
 * @param   {string}    invoice.customerId                  the system generated customer ID that is unique to a customer record
 * @param   {string}    invoice.invoiceNumber               the user defined unique identifier for the bill
 * @param   {string}    invoice.invoiceDate                 date the invoice is issued to the customer
 * @param   {string}    invoice.dueDate                     date the payment is due for this invoice
 * @param   {string}    invoice.glPostingDate               date the invoice is posted to the organizations third-party system
 * @param   {string}    invoice.description                 a brief description about the invoice
 * @param   {string}    invoice.poNumber                    the number on the Purchase Order (PO) associated with the invoice
 * @param   {boolean}   invoice.isToBePrinted               denotes if the invoice needs to be printed/mailed [value = true] or not [value = false]
 * @param   {boolean}   invoice.isToBeEmailed               denotes if the invoice needs to be emailed [value = true] or not [value = false]
 * @param   {string}    invoice.itemSalesTax                the ID of the Sales Tax item that is applied to all the taxable line items on the invoice
 * @param   {null}      invoice.salesTaxTotal               total amount of sales tax applied to this invoice
 * @param   {string}    invoice.terms                       payment terms chosen for the invoice
 * @param   {string}    invoice.salesRep                    name of the sales representative associated with this invoice
 * @param   {string}    invoice.FOB                         the shipping information for this invoice
 * @param   {string}    invoice.shipDate                    date the product(s) were shipped to the customer
 * @param   {string}    invoice.shipMethod                  the method by which product(s) were shipped to the customer
 * @param   {string}    invoice.departmentId                the system generated ID of the department that the invoice needs to be recorded for account tracking purposes
 * @param   {string}    invoice.locationId                  the system generated ID of the location that the invoice needs to be recorded for account tracking purposes
 * @param   {string}    invoice.actgClassId                 the system generated ID of the accounting class that the invoice needs to be recorded for account tracking purposes
 * @param   {string}    invoice.jobId                       the system generated ID of the job that the invoice needs to be recorded for account tracking purposes
 * @param   {string}    invoice.payToBankAccountId          the system generated ID of the bank account that receives the payment
 * @param   {string}    invoice.payToChartOfAccountId       the system generated ID of the account that the invoice needs to be recorded for account tracking purposes
 * @param   {[object]}  invoice.invoiceLineItems            an array of <a href="index.html#invoicelineitementity" target="_blank">invoiceLineItem objects</a>
 * @param   {object}    metadata                            the list of all fields and metadata for the invoice entity type
 *
 * @throws  {IncorrectEntityException}                      this exception is thrown if the object passed does not have an entity type of BillCredit
 */

// entity class which represents a Invoice entity
class InvoiceEntity {
    constructor(invoice, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (invoice.entity !== 'Invoice') {
            throw new IncorrectEntityException(invoice.entity, 'Invoice');
        }

        this.entity = invoice.entity;
        this.id = invoice.id;
        this.isActive = invoice.isActive;
        this.createdTime = invoice.createdTime;
        this.updatedTime = invoice.updatedTime;
        this.customerId = invoice.customerId;
        this.invoiceNumber = invoice.invoiceNumber;
        this.invoiceDate = invoice.invoiceDate;
        this.dueDate = invoice.dueDate;
        this.glPostingDate = invoice.glPostingDate;
        this.amount = invoice.amount;
        this.amountDue = invoice.amountDue;
        this.paymentStatus = invoice.paymentStatus;
        this.description = invoice.description;
        this.poNumber = invoice.poNumber;
        this.isToBePrinted = invoice.isToBePrinted;
        this.isToBeEmailed = invoice.isToBeEmailed;
        this.lastSentTime = invoice.lastSentTime;
        this.itemSalesTax = invoice.itemSalesTax;
        this.salesTaxPercentage = invoice.salesTaxPercentage;
        this.salesTaxTotal = invoice.salesTaxTotal;
        this.terms = invoice.terms;
        this.salesRep = invoice.salesRep;
        this.FOB = invoice.FOB;
        this.shipDate = invoice.shipDate;
        this.shipMethod = invoice.shipMethod;
        this.departmentId = invoice.departmentId;
        this.locationId = invoice.locationId;
        this.actgClassId = invoice.actgClassId;
        this.jobId = invoice.jobId;
        this.payToBankAccountId = invoice.payToBankAccountId;
        this.payToChartOfAccountId = invoice.payToChartOfAccountId;
        this.invoiceLineItems = invoice.invoiceLineItems;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = InvoiceEntity;
