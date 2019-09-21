const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A BillCredit entity represents the relationship between a Vendor Credit and a Bill.
 *
 * @param   {object}    billCredit                      the details of a billCredit
 * @param   {string}    billCredit.entity               the type of entity
 * @param   {string}    billCredit.id                   the system generated billCredit ID that is unique to a billCredit record
 * @param   {string}    billCredit.billId               the system generated ID of the bill associated with the credit
 * @param   {string}    billCredit.sentPayId            the system generated ID of the sent pay entity associated with the bill credit
 * @param   {string}    billCredit.vendorCreditId       the system generated ID of the vendorCredit being applied
 * @param   {number}    billCredit.amount               total amount of money the bill credit is discounting from the payment
 * @param   {string}    billCredit.createdTime          the date and time the bill credit was created
 * @param   {string}    billCredit.updatedTime          the date and time the bill credit  was last updated
 *
 * @throws {IncorrectEntityException}                   this exception is thrown if the object passed does not have an entity type of BillCredit
 */

// entity class which represents a BillCredit entity
class BillCreditEntity {
    constructor(billCredit) {
        // check to make sure the entity type is correct, if not throw an exception
        if (billCredit.entity !== 'BillCredit') {
            throw new IncorrectEntityException(billCredit.entity, 'BillCredit');
        }

        this.entity = billCredit.entity;
        this.id = billCredit.id;
        this.isActive = billCredit.isActive;
        this.billId = billCredit.billId;
        this.sentPayId = billCredit.sentPayId;
        this.vendorCreditId = billCredit.vendorCreditId;
        this.amount = billCredit.amount;
        this.createdTime = billCredit.createdTime;
        this.updatedTime = billCredit.updatedTime;
    }
}

module.exports = BillCreditEntity;
