/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

RecurringInvoiceEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - isActive
    - customerId
    - poNumber
    - salesRep
    - departmentId
    - locationId
    - actgClassId
    - jobId
    - itemSalesTax
    - description
    - isToBePrinted
    - isToBeEmailed
    - isToBeAutoEmailed
    - isToBeAutoMailed
    - fromUserId
    - timePeriod
    - frequencyPerTimePeriod
    - nextDueDate
    - endDate
    - daysInAdvance
    - taxableAmount
    - subtotal
    - createdTime
    - updatedTime
    - recurringInvoiceLineItems
- instantiates with BDC RecurringInvoice metadata
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const RecurringInvoiceEntity = require('../lib/Entities/RecurringInvoiceEntity');

describe('InvoiceEntity', () => {
    describe('constructor', () => {
        // initialize recurringInvoice modeled after an actual response object
        const recurringInvoiceData = {
            entity: 'RecurringInvoice',
            id: 'xxxxxxxxxxxxxxxxxxxxx',
            isActive: '1',
            customerId: 'xxxxxxxxxxxxxxxxxxxxx',
            poNumber: null,
            salesRep: 'undefined',
            departmentId: '00000000000000000000',
            locationId: '00000000000000000000',
            actgClassId: '00000000000000000000',
            jobId: '00000000000000000000',
            itemSalesTax: '00000000000000000000',
            description: null,
            isToBePrinted: false,
            isToBeEmailed: false,
            isToBeAutoEmailed: false,
            isToBeAutoMailed: false,
            fromUserId: '00000000000000000000',
            timePeriod: '2',
            frequencyPerTimePeriod: 1,
            nextDueDate: '2019-09-01',
            endDate: null,
            daysInAdvance: 10,
            taxableAmount: 0,
            subtotal: 0,
            createdTime: '2019-08-21T21:25:29.000+0000',
            updatedTime: '2019-08-21T21:25:33.000+0000',
            recurringInvoiceLineItems: [
                {
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
                }
            ]
        };

        // initialize metadata modeled after actual BDC metadata object
        const metadata = {
            attributes: { display: ['description'] },
            fields: {
                id: {
                    readonly: true,
                    required: false,
                    type: 'IdField',
                    entity: 'RecurringInvoice',
                    label: 'Id'
                }
            }
        };

        const recurringInvoice = new RecurringInvoiceEntity(
            recurringInvoiceData,
            metadata
        );

        it('should instantiate with all of the appropriate attributes', () => {
            expect(recurringInvoice.entity).toEqual('RecurringInvoice');
            expect(recurringInvoice.id).not.toBeUndefined();
            expect(recurringInvoice.isActive).not.toBeUndefined();
            expect(recurringInvoice.customerId).not.toBeUndefined();
            expect(recurringInvoice.poNumber).not.toBeUndefined();
            expect(recurringInvoice.salesRep).not.toBeUndefined();
            expect(recurringInvoice.departmentId).not.toBeUndefined();
            expect(recurringInvoice.locationId).not.toBeUndefined();
            expect(recurringInvoice.actgClassId).not.toBeUndefined();
            expect(recurringInvoice.jobId).not.toBeUndefined();
            expect(recurringInvoice.itemSalesTax).not.toBeUndefined();
            expect(recurringInvoice.description).not.toBeUndefined();
            expect(recurringInvoice.isToBePrinted).not.toBeUndefined();
            expect(recurringInvoice.isToBeEmailed).not.toBeUndefined();
            expect(recurringInvoice.isToBeAutoEmailed).not.toBeUndefined();
            expect(recurringInvoice.isToBeAutoMailed).not.toBeUndefined();
            expect(recurringInvoice.fromUserId).not.toBeUndefined();
            expect(recurringInvoice.timePeriod).not.toBeUndefined();
            expect(recurringInvoice.frequencyPerTimePeriod).not.toBeUndefined();
            expect(recurringInvoice.nextDueDate).not.toBeUndefined();
            expect(recurringInvoice.endDate).not.toBeUndefined();
            expect(recurringInvoice.daysInAdvance).not.toBeUndefined();
            expect(recurringInvoice.taxableAmount).not.toBeUndefined();
            expect(recurringInvoice.subtotal).not.toBeUndefined();
            expect(recurringInvoice.createdTime).not.toBeUndefined();
            expect(recurringInvoice.updatedTime).not.toBeUndefined();
            expect(
                recurringInvoice.recurringInvoiceLineItems
            ).not.toBeUndefined();

            expect(recurringInvoice.metadata.fields.id.entity).toEqual(
                'RecurringInvoice'
            );
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                recurringInvoiceData.entity = 'RecurringBill';

                const newRecurringInvoice = new RecurringInvoiceEntity(
                    recurringInvoiceData,
                    metadata
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: RecurringBill. Expected entity type: RecurringInvoice.'
            );

            recurringInvoiceData.entity = 'RecurringInvoice';
        });
    });
});
