/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

InvoiceEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - isActive
    - createdTime
    - updatedTime
    - customerId
    - invoiceNumber
    - invoiceDate
    - dueDate
    - glPostingDate
    - amount
    - amountDue
    - paymentStatus
    - description
    - poNumber
    - isToBePrinted
    - isToBeEmailed
    - lastSentTime
    - itemSalesTax
    - salesTaxPercentage
    - salesTaxTotal
    - terms
    - salesRep
    - FOB
    - shipDate
    - shipMethod
    - departmentId
    - locationId
    - actgClassId
    - jobId
    - payToBankAccountId
    - payToChartOfAccountId
    - invoiceLineItems
- instantiates with BDC Invoice metadata
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const InvoiceEntity = require('../lib/Entities/InvoiceEntity');

describe('InvoiceEntity', () => {
    describe('constructor', () => {
        // initialize invoice modeled after an actual response object
        const invoiceData = {
            entity: 'Invoice',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            isActive: '1',
            createdTime: '2019-08-21T17:44:42.000+0000',
            updatedTime: '2019-08-21T18:24:30.000+0000',
            customerId: 'xxxxxxxxxxxxxxxxxxxx',
            invoiceNumber: '4',
            invoiceDate: '2019-08-29',
            dueDate: '2019-09-15',
            glPostingDate: '2019-08-29',
            amount: 0,
            amountDue: 0,
            paymentStatus: '0',
            description: null,
            poNumber: null,
            isToBePrinted: false,
            isToBeEmailed: false,
            lastSentTime: null,
            itemSalesTax: '00000000000000000000',
            salesTaxPercentage: 0,
            salesTaxTotal: 0,
            terms: null,
            salesRep: null,
            FOB: null,
            shipDate: null,
            shipMethod: null,
            departmentId: '00000000000000000000',
            locationId: '00000000000000000000',
            actgClassId: '00000000000000000000',
            jobId: '00000000000000000000',
            payToBankAccountId: '00000000000000000000',
            payToChartOfAccountId: '00000000000000000000',
            invoiceTemplateId: 'xxxxxxxxxxxxxxxxxxxx',
            hasAutoPay: false,
            source: '0',
            creditAmount: 0,
            invoiceLineItems: [
                {
                    entity: 'InvoiceLineItem',
                    id: 'xxxxxxxxxxxxxxxxxxxx',
                    createdTime: '2019-08-21T18:24:28.000+0000',
                    updatedTime: '2019-08-21T18:24:28.000+0000',
                    invoiceId: 'xxxxxxxxxxxxxxxxxxxx',
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
                }
            ]
        };

        // initialize metadata modeled after actual BDC metadata object
        const metadata = {
            attributes: { display: ['invoiceNumber'] },
            fields: {
                id: {
                    readonly: true,
                    required: false,
                    type: 'IdField',
                    entity: 'Invoice',
                    label: 'Id'
                }
            }
        };

        const invoice = new InvoiceEntity(invoiceData, metadata);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(invoice.entity).toEqual('Invoice');
            expect(invoice.id).toEqual('xxxxxxxxxxxxxxxxxxxx');
            expect(invoice.isActive).toEqual('1');
            expect(invoice.createdTime).toEqual('2019-08-21T17:44:42.000+0000');
            expect(invoice.updatedTime).toEqual('2019-08-21T18:24:30.000+0000');
            expect(invoice.customerId).toEqual('xxxxxxxxxxxxxxxxxxxx');
            expect(invoice.invoiceNumber).toEqual('4');
            expect(invoice.invoiceDate).toEqual('2019-08-29');
            expect(invoice.dueDate).toEqual('2019-09-15');
            expect(invoice.glPostingDate).toEqual('2019-08-29');
            expect(invoice.amount).toEqual(0);
            expect(invoice.amountDue).toEqual(0);
            expect(invoice.paymentStatus).toEqual('0');
            expect(invoice.description).toEqual(null);
            expect(invoice.poNumber).toEqual(null);
            expect(invoice.isToBePrinted).toEqual(false);
            expect(invoice.isToBeEmailed).toEqual(false);
            expect(invoice.lastSentTime).toEqual(null);
            expect(invoice.itemSalesTax).toEqual('00000000000000000000');
            expect(invoice.salesTaxPercentage).toEqual(0);
            expect(invoice.salesTaxTotal).toEqual(0);
            expect(invoice.terms).toEqual(null);
            expect(invoice.salesRep).toEqual(null);
            expect(invoice.FOB).toEqual(null);
            expect(invoice.shipDate).toEqual(null);
            expect(invoice.shipMethod).toEqual(null);
            expect(invoice.departmentId).toEqual('00000000000000000000');
            expect(invoice.locationId).toEqual('00000000000000000000');
            expect(invoice.actgClassId).toEqual('00000000000000000000');
            expect(invoice.jobId).toEqual('00000000000000000000');
            expect(invoice.payToBankAccountId).toEqual('00000000000000000000');
            expect(invoice.payToChartOfAccountId).toEqual(
                '00000000000000000000'
            );

            expect(invoice.metadata.fields.id.entity).toEqual('Invoice');
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                invoiceData.entity = 'Bill';

                const newInvoice = new InvoiceEntity(invoiceData, metadata);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Bill. Expected entity type: Invoice.'
            );

            invoiceData.entity = 'Invoice';
        });
    });
});
