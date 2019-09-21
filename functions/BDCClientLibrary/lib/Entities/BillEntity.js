const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A Bill entity is a document received from a vendor with the details of the products/services that were purchased from
 * them.
 *
 * @param   {object}    bill                            the details of a bill
 * @param   {string}    bill.entity                     the type of entity
 * @param   {string}    bill.id                         the system generated bill ID that is unique to a bill record
 * @param   {string}    bill.isActive                   denotes if the bill is active [value = "1"] or inactive [value = "2"]
 * @param   {string}    bill.vendorId                   the system generated ID of the vendor who sent this bill
 * @param   {string}    bill.invoiceNumber              the user defined unique identifier for the invoice
 * @param   {string}    bill.approvalStatus             denotes the approval status of the bill (Unassigned [value = "0"], Assigned [value = "1"], Approved [value = "3"], Approving [value = "4"], and Denied [value = "5"])
 * @param   {string}    bill.invoiceDate                date the invoice is issued to the customer
 * @param   {string}    bill.dueDate                    date the payment is due for this bill
 * @param   {string}    bill.glPostingDate              date the bill is posted to the organizations third-party system
 * @param   {number}    bill.amount                     total amount due for the bill
 * @param   {number}    bill.scheduledAmount            the system generated ID of the item that the bill needs to be recorded for account tracking purposes
 * @param   {number}    bill.paidAmount                 amount already paid for the bill
 * @param   {number}    bill.dueAmount                  amount remaining to be paid for the bill
 * @param   {string}    bill.paymentStatus              denotes the bill as paid or partially paid (PaidInFull scheduled or unpaid [value = "0"], Open [value = "1"], PartialPayment [value = "2"], and Scheduled [value = "4"])
 * @param   {string}    bill.description                a brief description about the bill
 * @param   {string}    bill.poNumber                   the number on the Purchase Order (PO) associated with the bill
 * @param   {string}    bill.createdTime                date and time the bill was created
 * @param   {string}    bill.updatedTime                date and time the bill was last updated
 * @param   {string}    bill.payFromBankAccountId       the system generated ID of bank account that receives the payment
 * @param   {string}    bill.payFromChartOfAccountId    the ID of the account that the bill needs to be recorded for account tracking purposes
 * @param   {object[]}  bill.billLineItems              an array of <a href="index.html#billlineitementity" target="_blank">billLineItem objects</a>
 * @param   {object}    metadata                        the list of all fields and metadata for the bill entity type
 *
 * @throws {IncorrectEntityException}                   this exception is thrown if the object passed does not have an entity type of Bill
 */

// entity class which represents a Bill entity
class BillEntity {
    constructor(bill, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (bill.entity !== 'Bill') {
            throw new IncorrectEntityException(bill.entity, 'Bill');
        }

        this.entity = bill.entity;
        this.id = bill.id;
        this.isActive = bill.isActive;
        this.vendorId = bill.vendorId;
        this.invoiceNumber = bill.invoiceNumber;
        this.approvalStatus = bill.approvalStatus;
        this.invoiceDate = bill.invoiceDate;
        this.dueDate = bill.dueDate;
        this.glPostingDate = bill.glPostingDate;
        this.amount = bill.amount;
        this.scheduledAmount = bill.scheduledAmount;
        this.paidAmount = bill.paidAmount;
        this.dueAmount = bill.dueAmount;
        this.paymentStatus = bill.paymentStatus;
        this.description = bill.description;
        this.poNumber = bill.poNumber;
        this.createdTime = bill.createdTime;
        this.updatedTime = bill.updatedTime;
        this.payFromBankAccountId = bill.payFromBankAccountId;
        this.payFromChartOfAccountId = bill.payFromChartOfAccountId;
        this.billLineItems = bill.billLineItems;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = BillEntity;
