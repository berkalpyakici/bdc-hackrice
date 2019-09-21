/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

BillEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - isActive
    - vendorId
    - invoiceNumber
    - approvalStatus
    - invoiceDate
    - dueDate
    - glPostingDate
    - amount
    - scheduledAmount
    - paidAmount
    - dueAmount
    - paymentStatus
    - description
    - poNumber
    - createdTime
    - updatedTime
    - payFromBankAccountId
    - payFromChartOfAccountId
    - billLineItems
- instantiates with BDC Bill metadata
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const BillEntity = require('../lib/Entities/BillEntity');

describe('BillEntity', () => {
    describe('constructor', () => {
        // initialize bill modeled after an actual response object
        const billData = {
            entity: 'Bill',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            isActive: '1',
            vendorId: 'xxxxxxxxxxxxxxxxxxxx',
            invoiceNumber: '7',
            approvalStatus: '0',
            invoiceDate: '2019-12-05',
            dueDate: '2019-12-05',
            glPostingDate: '2019-12-05',
            amount: 1400,
            localAmount: null,
            exchangeRate: null,
            scheduledAmount: 0,
            paidAmount: null,
            dueAmount: 1400,
            paymentStatus: '1',
            description: 'This is a bill',
            poNumber: 'null',
            createdTime: '2019-08-28T18:16:10.000+0000',
            updatedTime: '2019-08-28T20:40:54.000+0000',
            payFromBankAccountId: '00000000000000000000',
            payFromChartOfAccountId: '00000000000000000000',
            paymentTermId: '00000000000000000000',
            hasAutoPay: false,
            eBillCreated: false,
            invoiceProductId: '00000000000000000000',
            chartOfAccountId: '00000000000000000000',
            departmentId: '00000000000000000000',
            source: '0',
            defaultInvoiceNumber: false,
            hasLinkedPurchaseOrders: false,
            multipleBillLineItems: true,
            item: { count: 0, totalAmount: 0 },
            expense: { count: 2, totalAmount: 1400 },
            billLineItems: [
                {
                    entity: 'BillLineItem',
                    id: 'xxxxxxxxxxxxxxxxxxxx',
                    billId: 'xxxxxxxxxxxxxxxxxxxx',
                    amount: 500,
                    chartOfAccountId: '00000000000000000000',
                    departmentId: '00000000000000000000',
                    locationId: '00000000000000000000',
                    jobId: '00000000000000000000',
                    customerId: '00000000000000000000',
                    jobBillable: true,
                    description: null,
                    createdTime: '2019-08-28T20:40:55.000+0000',
                    updatedTime: '2019-08-28T20:40:55.000+0000',
                    lineType: '1',
                    itemId: '00000000000000000000',
                    quantity: null,
                    unitPrice: null,
                    employeeId: '00000000000000000000',
                    actgClassId: '00000000000000000000',
                    purchaseOrderBillLinkId: '00000000000000000000',
                    unitOfMeasureId: '00000000000000000000'
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
                    entity: 'Bill',
                    label: 'Id'
                }
            }
        };

        const bill = new BillEntity(billData, metadata);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(bill.entity).toEqual('Bill');
            expect(bill.id).not.toBeUndefined();
            expect(bill.isActive).not.toBeUndefined();
            expect(bill.vendorId).not.toBeUndefined();
            expect(bill.invoiceNumber).not.toBeUndefined();
            expect(bill.approvalStatus).not.toBeUndefined();
            expect(bill.invoiceDate).not.toBeUndefined();
            expect(bill.dueDate).not.toBeUndefined();
            expect(bill.glPostingDate).not.toBeUndefined();
            expect(bill.amount).not.toBeUndefined();
            expect(bill.scheduledAmount).not.toBeUndefined();
            expect(bill.paidAmount).not.toBeUndefined();
            expect(bill.dueAmount).not.toBeUndefined();
            expect(bill.paymentStatus).not.toBeUndefined();
            expect(bill.description).not.toBeUndefined();
            expect(bill.poNumber).not.toBeUndefined();
            expect(bill.createdTime).not.toBeUndefined();
            expect(bill.updatedTime).not.toBeUndefined();
            expect(bill.payFromBankAccountId).not.toBeUndefined();
            expect(bill.payFromChartOfAccountId).not.toBeUndefined();
            expect(bill.billLineItems).not.toBeUndefined();
            expect(bill.metadata.fields.id.entity).toEqual('Bill');
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                billData.entity = 'Invoice';

                const newBill = new BillEntity(billData, metadata);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Invoice. Expected entity type: Bill.'
            );
        });
    });
});
