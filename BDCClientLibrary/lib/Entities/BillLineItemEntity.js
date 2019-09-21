const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A BillLineItem describes each good or service included within a Bill.
 *
 * @param   {[object]}  billLineItem                    the details of a billLineItem
 * @param   {string}    billLineItem.entity             the type of entity
 * @param   {string}    billLineItem.billId             refers to the system generated ID of the bill that this line item is associated with
 * @param   {number}    billLineItem.amount             total cost for the line item (quantity x price or ratePercent x amount)
 * @param   {string}    billLineItem.chartOfAccountId   the system generated ID of the account that the bill line item needs to be recorded for account tracking purposes
 * @param   {string}    billLineItem.departmentId       the system generated ID of the department that the bill line item needs to be recorded for account tracking purposes
 * @param   {string}    billLineItem.locationId         the system generated ID of the location that the bill line item needs to be recorded for account tracking purposes
 * @param   {string}    billLineItem.jobId              the system generated ID of the job that the bill line item needs to be recorded for account tracking purposes
 * @param   {string}    billLineItem.customerId         the system generated customer ID of the customer that the bill line item is associated with
 * @param   {boolean}   billLineItem.jobBillable        denotes if the job is billable [value = true] or not [value = false]
 * @param   {string}    billLineItem.description        a brief description of the goods/services
 * @param   {string}    billLineItem.createdTime        date and time the bill line item was created
 * @param   {string}    billLineItem.updatedTime        date and time the bill line item was last updated
 * @param   {string}    billLineItem.itemId             the system generated ID of the item that the bill line item needs to be recorded for account tracking purposes
 * @param   {number}    billLineItem.quantity           number of items sold or the hours/days spent providing the service
 * @param   {number}    billLineItem.unitPrice          unit price of the item purchased. Only used if line item type is item
 * @param   {string}    billLineItem.employeeId         the system generated ID of the employee that the bill line item needs to be recorded for account tracking purposes
 * @param   {string}    billLineItem.actgClassId        the system generated ID of the accounting class that the bill line item needs to be recorded for account tracking purposes
 *
 * @throws  {IncorrectEntityException}                  this exception is thrown if the object passed does not have an entity type of BillLineItem
 */

// entity class which represents a BillLineItem entity
class BillLineItemEntity {
    constructor(billLineItem) {
        // check to make sure the entity type is correct, if not throw an exception
        if (billLineItem.entity !== 'BillLineItem') {
            throw new IncorrectEntityException(
                billLineItem.entity,
                'BillLineItem'
            );
        }

        this.entity = billLineItem.entity;
        this.billId = billLineItem.billId;
        this.amount = billLineItem.amount;
        this.chartOfAccountId = billLineItem.chartOfAccountId;
        this.departmentId = billLineItem.departmentId;
        this.locationId = billLineItem.locationId;
        this.jobId = billLineItem.jobId;
        this.customerId = billLineItem.customerId;
        this.jobBillable = billLineItem.jobBillable;
        this.description = billLineItem.description;
        this.createdTime = billLineItem.createdTime;
        this.updatedTime = billLineItem.updatedTime;
        this.itemId = billLineItem.itemId;
        this.quantity = billLineItem.quantity;
        this.unitPrice = billLineItem.unitPrice;
        this.employeeId = billLineItem.employeeId;
        this.actgClassId = billLineItem.actgClassId;
    }
}

module.exports = BillLineItemEntity;
