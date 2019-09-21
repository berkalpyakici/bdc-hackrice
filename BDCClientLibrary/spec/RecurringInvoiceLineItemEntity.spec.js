/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

RecurringInvoiceLineItemEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - departmentId
    - locationId
    - actgClassId
    - jobId
    - description
    - recurringtInvoiceId
    - itemId
    - amount
    - quantity
    - price
    - ratePercent
    - createdTime
    - updatedTime
    - taxable
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const RecurringInvoiceLineItemEntity = require('../lib/Entities/RecurringInvoiceLineItemEntity');

describe('RecurringInvoiceLineItemEntity', () => {
    describe('constructor', () => {
        // initialize invoiceLineItem modeled after an actual response object
        const recurringInvoiceLineItemData = {
            entity: 'RecurringInvoiceLineItem',
            id: 'xxxxxxxxxxxxxxxxxxxxx',
            departmentId: '00000000000000000000',
            locationId: '00000000000000000000',
            actgClassId: '00000000000000000000',
            jobId: '00000000000000000000',
            description: null,
            recurringInvoiceId: 'xxxxxxxxxxxxxxxxxxxxx',
            itemId: '00000000000000000000',
            amount: null,
            quantity: 1,
            price: null,
            ratePercent: null,
            taxable: false,
            createdTime: '2019-08-21T21:25:32.000+0000',
            updatedTime: '2019-08-21T21:25:32.000+0000'
        };

        const recurringInvoiceLineItem = new RecurringInvoiceLineItemEntity(
            recurringInvoiceLineItemData
        );

        it('should instantiate with all of the appropriate attributes', () => {
            expect(recurringInvoiceLineItem.entity).toEqual(
                'RecurringInvoiceLineItem'
            );
            expect(recurringInvoiceLineItem.id).not.toBeUndefined();
            expect(recurringInvoiceLineItem.departmentId).not.toBeUndefined();
            expect(recurringInvoiceLineItem.locationId).not.toBeUndefined();
            expect(recurringInvoiceLineItem.actgClassId).not.toBeUndefined();
            expect(recurringInvoiceLineItem.jobId).not.toBeUndefined();
            expect(recurringInvoiceLineItem.description).not.toBeUndefined();
            expect(
                recurringInvoiceLineItem.recurringInvoiceId
            ).not.toBeUndefined();
            expect(recurringInvoiceLineItem.itemId).not.toBeUndefined();
            expect(recurringInvoiceLineItem.amount).not.toBeUndefined();
            expect(recurringInvoiceLineItem.quantity).not.toBeUndefined();
            expect(recurringInvoiceLineItem.price).not.toBeUndefined();
            expect(recurringInvoiceLineItem.ratePercent).not.toBeUndefined();
            expect(recurringInvoiceLineItem.taxable).not.toBeUndefined();
            expect(recurringInvoiceLineItem.createdTime).not.toBeUndefined();
            expect(recurringInvoiceLineItem.updatedTime).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                recurringInvoiceLineItemData.entity = 'RecurringBillLineItem';

                const newRecurringInvoiceLineitem = new RecurringInvoiceLineItemEntity(
                    recurringInvoiceLineItemData
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: RecurringBillLineItem. Expected entity type: RecurringInvoiceLineItem.'
            );
        });
    });
});
