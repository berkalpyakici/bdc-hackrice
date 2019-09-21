/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

RecurringBillEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - isActive
    - vendorId
    - timePeriod
    - frequencyPerTimePeriod
    - nextDueDate
    - endDate
    - daysInAdvance
    - description
    - createdTime
    - updatedTime
    - recurringBillLineItems
- instantiates with BDC RecurringBill metadata
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const RecurringBillEntity = require('../lib/Entities/RecurringBillEntity');

describe('RecurringBillEntity', () => {
    describe('constructor', () => {
        // initialize bill modeled after an actual response object
        const recurringBillData = {
            entity: 'RecurringBill',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            isActive: '1',
            vendorId: 'xxxxxxxxxxxxxxxxxxxx',
            timePeriod: '2',
            frequencyPerTimePeriod: 1,
            nextDueDate: '2019-09-15',
            endDate: null,
            daysInAdvance: 10,
            description: null,
            createdTime: '2019-08-29T18:56:53.000+0000',
            updatedTime: '2019-08-29T18:56:53.000+0000',
            recurringBillLineItems: [
                {
                    entity: 'RecurringBillLineItem',
                    id: 'xxxxxxxxxxxxxxxxxxxx',
                    recurringBillId: 'xxxxxxxxxxxxxxxxxxxx',
                    amount: 5,
                    chartOfAccountId: '00000000000000000000',
                    departmentId: '00000000000000000000',
                    locationId: '00000000000000000000',
                    description: null,
                    createdTime: '2019-08-29T18:56:53.000+0000',
                    updatedTime: '2019-08-29T18:56:53.000+0000'
                }
            ]
        };

        // initialize metadata modeled after actual BDC metadata object
        const metadata = {
            attributes: { display: ['vendorId'] },
            fields: {
                id: {
                    readonly: true,
                    required: false,
                    type: 'IdField',
                    entity: 'RecurringBill',
                    label: 'id'
                }
            }
        };

        const recurringBill = new RecurringBillEntity(
            recurringBillData,
            metadata
        );

        it('should instantiate with all of the appropriate attributes', () => {
            expect(recurringBill.entity).toEqual('RecurringBill');
            expect(recurringBill.entity).not.toBeUndefined();
            expect(recurringBill.id).not.toBeUndefined();
            expect(recurringBill.isActive).not.toBeUndefined();
            expect(recurringBill.vendorId).not.toBeUndefined();
            expect(recurringBill.timePeriod).not.toBeUndefined();
            expect(recurringBill.frequencyPerTimePeriod).not.toBeUndefined();
            expect(recurringBill.nextDueDate).not.toBeUndefined();
            expect(recurringBill.endDate).not.toBeUndefined();
            expect(recurringBill.daysInAdvance).not.toBeUndefined();
            expect(recurringBill.description).not.toBeUndefined();
            expect(recurringBill.createdTime).not.toBeUndefined();
            expect(recurringBill.updatedTime).not.toBeUndefined();
            expect(recurringBill.recurringBillLineItems).not.toBeUndefined();
            expect(recurringBill.metadata.fields.id.entity).toEqual(
                'RecurringBill'
            );
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                recurringBillData.entity = 'RecurringInvoice';

                const newRecurringBill = new RecurringBillEntity(
                    recurringBillData,
                    metadata
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: RecurringInvoice. Expected entity type: RecurringBill.'
            );

            recurringBillData.entity = 'RecurringBill';
        });
    });
});
