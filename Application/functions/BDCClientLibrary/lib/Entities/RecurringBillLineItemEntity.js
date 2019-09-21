const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * RecurringBillLineItem entities describe each good or service included within a recurring bill.
 *
 * @param   {object}    recurringBillLineItem                    the details of a recurring bill line item
 * @param   {string}    recurringBillLineItem.entity             the type of entity
 * @param   {string}    recurringBillLineItem.recurringBillId    refers to the system generated ID of the recurring bill that this line item is associated with
 * @param   {number}    recurringBillLineItem.amount             total amount due for the line item
 * @param   {string}    recurringBillLineItem.chartOfAccountId   the system generated ID of the account that the bill line item needs to be recorded for account tracking purposes
 * @param   {string}    recurringBillLineItem.departmentId       the system generated ID of the department that the bill line item needs to be recorded for account tracking purposes
 * @param   {string}    recurringBillLineItem.locationId         the system generated ID of the location that the bill line item needs to be recorded for account tracking purposes
 * @param   {string}    recurringBillLineItem.description        a brief description of the goods/services
 * @param   {string}    recurringBillLineItem.createdTime        date and time the recurring bill line item was created
 * @param   {string}    recurringBillLineItem.updatedTime        date and time the recurring bill line item was last updated
 *
 * @throws  {IncorrectEntityException}                           this exception is thrown if the object passed does not have an entity type of RecurringBillLineItem
 */

// entity class which represents a RecurringBillLineItem entity
class RecurringBillLineItemEntity {
    constructor(recurringBillLineItem) {
        // check to make sure the entity type is correct, if not throw an exception
        if (recurringBillLineItem.entity !== 'RecurringBillLineItem') {
            throw new IncorrectEntityException(
                recurringBillLineItem.entity,
                'RecurringBillLineItem'
            );
        }

        this.entity = recurringBillLineItem.entity;
        this.id = recurringBillLineItem.id;
        this.recurringBillId = recurringBillLineItem.recurringBillId;
        this.amount = recurringBillLineItem.amount;
        this.chartOfAccountId = recurringBillLineItem.chartOfAccountId;
        this.departmentId = recurringBillLineItem.departmentId;
        this.locationId = recurringBillLineItem.locationId;
        this.description = recurringBillLineItem.description;
        this.createdTime = recurringBillLineItem.createdTime;
        this.updatedTime = recurringBillLineItem.updatedTime;
    }
}

module.exports = RecurringBillLineItemEntity;
