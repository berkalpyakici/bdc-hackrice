/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

InvoicePayEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - invoiceId
    - amount
    - description
    - createdTime
    - updatedTime
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const InvoicePayEntity = require('../lib/Entities/InvoicePayEntity');

describe('InvoicePayEntity', () => {
    describe('constructor', () => {
        const invoicePayData = {
            entity: 'InvoicePay',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            invoiceId: 'xxxxxxxxxxxxxxxxxxxx',
            amount: 100.0,
            description: 'Brass Ring Washers',
            createdTime: '2016-11-19T23:07:21.000+0000',
            updatedTime: '2016-11-19T23:07:21.000+0000'
        };

        const invoicePay = new InvoicePayEntity(invoicePayData);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(invoicePay.entity).toEqual('InvoicePay');
            expect(invoicePay.id).not.toBeUndefined();
            expect(invoicePay.invoiceId).not.toBeUndefined();
            expect(invoicePay.amount).not.toBeUndefined();
            expect(invoicePay.description).not.toBeUndefined();
            expect(invoicePay.createdTime).not.toBeUndefined();
            expect(invoicePay.updatedTime).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                invoicePayData.entity = 'Invoice';

                const newInvoicePay = new InvoicePayEntity(invoicePayData);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Invoice. Expected entity type: InvoicePay.'
            );
        });
    });
});
