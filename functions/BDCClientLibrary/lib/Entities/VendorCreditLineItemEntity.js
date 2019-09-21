const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * Vendor credit lineItems describe each individual adjustment of the amount owed to a Vendor
 *
 * @param   {[object]}  vendorCreditLineItem                    the details of a vendorCreditLineItem
 * @param   {string}    vendorCreditLineItem.entity             the type of entity
 * @param   {string}    vendorCreditLineItem.id                 the system generated ID of the vendor credit line item
 * @param   {number}    vendorCreditLineItem.amount             total cost due for the line item (quantity x price or ratePercent x amount)
 * @param   {string}    vendorCreditLineItem.chartOfAccountId   the system generated ID of the account that the invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    vendorCreditLineItem.departmentId       the system generated ID of the department that the invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    vendorCreditLineItem.locationId         the system generated ID of the location that the invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    vendorCreditLineItem.customerId         the system generated ID of the customer that the bill line item is coded to
 * @param   {boolean}   vendorCreditLineItem.jobBillable        denotes if the job is billable [value = true] or not [value = false]
 * @param   {string}    vendorCreditLineItem.description        a brief description of the vendor credit that was issued by the vendor for this line item
 * @param   {string}    vendorCreditLineItem.createdTime        date and time the vendor credit line item was created
 * @param   {string}    vendorCreditLineItem.updatedTime        date and time the vendor credit line item was last updated
 * @param   {string}    vendorCreditLineItem.lineType           read only field. Enum indicating the type of the vendor credit line item.
 *                                                              For example, the type is considered an expense if the vendor credit is not
 *                                                              associated with an item [value = "1"] or the type is considered an item [value = "2"]
 * @param   {string}    vendorCreditLineItem.itemId             the system generated ID of the item that the invoice line item needs to be recorded for account tracking purposes
 * @param   {number}    vendorCreditLineItem.quantity           number of items sold or the hours/days spent providing the service
 * @param   {number}    vendorCreditLineItem.unitPrice          unit price of the item purchased. Only used if line item type is item
 * @param   {string}    vendorCreditLineItem.employeeId         the system generated ID of the employee that the invoice line item needs to be recorded for account tracking purposes
 * @param   {string}    vendorCreditLineItem.actgClassId        the system generated ID of the accounting class that the invoice line item needs to be recorded for account tracking purposes
 *
 * @throws  {IncorrectEntityException}                          this exception is thrown if the object passed does not have an entity type of VendorCreditLineItem
 */

// entity class which represents a VendorCreditLineItem entity
class VendorCreditLineItemEntity {
    constructor(vendorCreditLineItem) {
        // check to make sure the entity type is correct, if not throw an exception
        if (vendorCreditLineItem.entity !== 'VendorCreditLineItem') {
            throw new IncorrectEntityException(
                vendorCreditLineItem.entity,
                'VendorCreditLineItem'
            );
        }

        this.entity = vendorCreditLineItem.entity;
        this.id = vendorCreditLineItem.id;
        this.vendorCreditId = vendorCreditLineItem.vendorCreditId;
        this.amount = vendorCreditLineItem.amount;
        this.chartOfAccountId = vendorCreditLineItem.chartOfAccountId;
        this.departmentId = vendorCreditLineItem.departmentId;
        this.locationId = vendorCreditLineItem.locationId;
        this.jobId = vendorCreditLineItem.jobId;
        this.customerId = vendorCreditLineItem.customerId;
        this.jobBillable = vendorCreditLineItem.jobBillable;
        this.description = vendorCreditLineItem.description;
        this.createdTime = vendorCreditLineItem.createdTime;
        this.updatedTime = vendorCreditLineItem.updatedTime;
        this.lineType = vendorCreditLineItem.lineType;
        this.itemId = vendorCreditLineItem.itemId;
        this.quantity = vendorCreditLineItem.quantity;
        this.unitPrice = vendorCreditLineItem.unitPrice;
        this.employeeId = vendorCreditLineItem.employeeId;
        this.actgClassId = vendorCreditLineItem.actgClassId;
    }
}

module.exports = VendorCreditLineItemEntity;
