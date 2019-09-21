/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

InvoiceLineItemEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - isActive
    - createdTime
    - updatedTime
    - invoiceId
    - itemId
    - quantity
    - amount
    - price
    - ratePercent
    - chartOfAccountId
    - departmentId
    - locationId
    - actgClassId
    - jobId
    - description
    - taxable
    - taxCode
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const InvoiceLineItemEntity = require('../lib/Entities/InvoiceLineItemEntity');

describe('InvoiceLineItemEntity', () => {
    describe('constructor', () => {
        // initialize invoiceLineItem modeled after an actual response object
        const invoiceLineItemData = {
            entity: 'InvoiceLineItem',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            createdTime: '2019-08-21T18:24:28.000+0000',
            updatedTime: '2019-08-21T18:24:28.000+0000',
            invoiceId: '00e01WUVPXAOWVHW100s',
            itemId: '00000000000000000000',
            quantity: 1,
            amount: null,
            price: null,
            ratePercent: null,
            chartOfAccountId: '00000000000000000000',
            departmentId: '00000000000000000000',
            locationId: '00000000000000000000',
            actgClassId: '00000000000000000000',
            jobId: '00000000000000000000',
            description: null,
            taxable: true,
            taxCode: 'Tax'
        };

        const invoiceLineItem = new InvoiceLineItemEntity(invoiceLineItemData);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(invoiceLineItem.entity).toEqual('InvoiceLineItem');
            expect(invoiceLineItem.id).toEqual('xxxxxxxxxxxxxxxxxxxx');
            expect(invoiceLineItem.createdTime).toEqual(
                '2019-08-21T18:24:28.000+0000'
            );
            expect(invoiceLineItem.updatedTime).toEqual(
                '2019-08-21T18:24:28.000+0000'
            );
            expect(invoiceLineItem.invoiceId).toEqual('00e01WUVPXAOWVHW100s');
            expect(invoiceLineItem.itemId).toEqual('00000000000000000000');
            expect(invoiceLineItem.quantity).toEqual(1);
            expect(invoiceLineItem.amount).toEqual(null);
            expect(invoiceLineItem.price).toEqual(null);
            expect(invoiceLineItem.ratePercent).toEqual(null);
            expect(invoiceLineItem.chartOfAccountId).toEqual(
                '00000000000000000000'
            );
            expect(invoiceLineItem.departmentId).toEqual(
                '00000000000000000000'
            );
            expect(invoiceLineItem.locationId).toEqual('00000000000000000000');
            expect(invoiceLineItem.actgClassId).toEqual('00000000000000000000');
            expect(invoiceLineItem.jobId).toEqual('00000000000000000000');
            expect(invoiceLineItem.description).toEqual(null);
            expect(invoiceLineItem.taxable).toEqual(true);
            expect(invoiceLineItem.taxCode).toEqual('Tax');
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                invoiceLineItemData.entity = 'BillLineItem';

                const newInvoiceLineitem = new InvoiceLineItemEntity(
                    invoiceLineItemData
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: BillLineItem. Expected entity type: InvoiceLineItem.'
            );
        });
    });
});
