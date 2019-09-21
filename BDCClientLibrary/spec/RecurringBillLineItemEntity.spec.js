/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

RecurringBillLineItemEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - recurringBillId
    - amount
    - chartOfAccountId
    - departmentId
    - locationId
    - description
    - createdTime
    - updatedTime
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const RecurringBillLineItemEntity = require('../lib/Entities/RecurringBillLineItemEntity');

describe('RecurringBillLineItemEntity', () => {
    describe('constructor', () => {
        // initialize billLineItem modeled after an actual response object
        const recurringBillLineItemData = {
            entity: 'RecurringBillLineItem',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            recurringBillId: 'btp01IGFRWWZYUOMY2pp',
            amount: 5,
            chartOfAccountId: '00000000000000000000',
            departmentId: '00000000000000000000',
            locationId: '00000000000000000000',
            description: null,
            createdTime: '2019-08-29T18:56:53.000+0000',
            updatedTime: '2019-08-29T18:56:53.000+0000'
        };

        const recurringBillLineItem = new RecurringBillLineItemEntity(
            recurringBillLineItemData
        );

        it('should instantiate with all of the appropriate attributes', () => {
            expect(recurringBillLineItem.entity).toEqual(
                'RecurringBillLineItem'
            );
            expect(recurringBillLineItem.entity).not.toBeUndefined();
            expect(recurringBillLineItem.id).not.toBeUndefined();
            expect(recurringBillLineItem.recurringBillId).not.toBeUndefined();
            expect(recurringBillLineItem.amount).not.toBeUndefined();
            expect(recurringBillLineItem.chartOfAccountId).not.toBeUndefined();
            expect(recurringBillLineItem.departmentId).not.toBeUndefined();
            expect(recurringBillLineItem.locationId).not.toBeUndefined();
            expect(recurringBillLineItem.description).not.toBeUndefined();
            expect(recurringBillLineItem.createdTime).not.toBeUndefined();
            expect(recurringBillLineItem.updatedTime).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                recurringBillLineItemData.entity = 'RecurringInvoiceLineItem';

                const newRecurringBillLineitem = new RecurringBillLineItemEntity(
                    recurringBillLineItemData
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: RecurringInvoiceLineItem. Expected entity type: RecurringBillLineItem.'
            );
        });
    });
});
