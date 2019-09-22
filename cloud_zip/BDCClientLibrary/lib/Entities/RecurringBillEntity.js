const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A Recurring Bill represents an identical bill created periodically for a Vendor. This is a template used to automatically
 * generate bills at a specified time and interval.
 *
 * @param   {object}    recurringBill                           the details of a recurringBill
 * @param   {string}    recurringBill.entity                    the type of entity
 * @param   {string}    recurringBill.id                        the system generated recurring bill ID that is unique to a recurring bill record
 * @param   {string}    recurringBill.isActive                  denotes if the recurring bill is active [value = "1"] or inactive [value = "2"]
 * @param   {string}    recurringBill.vendorId                  the system generated ID of the vendor who sent this bill
 * @param   {string}    recurringBill.timePeriod                denotes how often the bill will be generated (daily [value = "0"], weekly [value = "1"], monthly [value = "2"], yearly [value = "3"], and none [value = "9"])
 * @param   {number}    recurringBill.frequencyPerTimePeriod    defines how many times the bill needs to be generated during the defined time period
 * @param   {string}    recurringBill.nextDueDate               sets the due date of the next bill
 * @param   {string}    recurringBill.endDueDate                the date after which the recurring bill no longer needs to be generated
 * @param   {number}    recurringBill.daysInAdvance             defines how many days in advance from the the nextDueDate, the next invoice needs to be generated. If this date has already occurred for one or more
 *                                                              bill, those bills are generated on the date the recurring bill details are defined.
 * @param   {string}    recurringBill.description               a brief description about the recurring bill
 * @param   {string}    recurringBill.createdTime               date and time the recurring bill was created
 * @param   {string}    recurringBill.updatedTime               date and time the recurring bill was last updated
 * @param   {[object]}  recurringBill.recurringBillLineItems    an array of <a href="index.html#recurringbilllineitementity" target="_blank">recurringBillLineItem objects</a>
 * @param   {object}    metadata                                the list of fields and metadata for the recurring bill entity type
 *
 * @throws  {IncorrectEntityException}                          this exception is thrown if the object passed does not have an entity type of Bill
 */

// entity class which represents a RecurringBill entity
class RecurringBillEntity {
    constructor(recurringBill, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (recurringBill.entity !== 'RecurringBill') {
            throw new IncorrectEntityException(
                recurringBill.entity,
                'RecurringBill'
            );
        }

        this.entity = recurringBill.entity;
        this.id = recurringBill.id;
        this.isActive = recurringBill.isActive;
        this.vendorId = recurringBill.vendorId;
        this.timePeriod = recurringBill.timePeriod;
        this.frequencyPerTimePeriod = recurringBill.frequencyPerTimePeriod;
        this.nextDueDate = recurringBill.nextDueDate;
        this.endDate = recurringBill.endDate;
        this.daysInAdvance = recurringBill.daysInAdvance;
        this.description = recurringBill.description;
        this.createdTime = recurringBill.createdTime;
        this.updatedTime = recurringBill.updatedTime;
        this.recurringBillLineItems = recurringBill.recurringBillLineItems;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = RecurringBillEntity;
