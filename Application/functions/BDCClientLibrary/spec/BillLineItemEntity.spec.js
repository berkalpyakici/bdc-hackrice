/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

BillLineItemEntity Constructor
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

const BillLineItemEntity = require('../lib/Entities/BillLineItemEntity');

describe('BillLineItemEntity', () => {
    describe('constructor', () => {
        // initialize billLineItem modeled after an actual response object
        const billLineItemData = {
            entity: 'BillLineItem',
            amount: 900,
            chartOfAccountId: '00000000000000000000',
            departmentId: '00000000000000000000',
            locationId: '00000000000000000000',
            jobId: '00000000000000000000',
            customerId: '00000000000000000000',
            jobBillable: true,
            description: null,
            itemId: '00000000000000000000',
            quantity: null,
            unitPrice: null,
            employeeId: '00000000000000000000',
            actgClassId: '00000000000000000000'
        };

        const billLineItem = new BillLineItemEntity(billLineItemData);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(billLineItem.entity).toEqual('BillLineItem');
            expect(billLineItem.entity).not.toBeUndefined();
            expect(billLineItem.amount).not.toBeUndefined();
            expect(billLineItem.chartOfAccountId).not.toBeUndefined();
            expect(billLineItem.departmentId).not.toBeUndefined();
            expect(billLineItem.locationId).not.toBeUndefined();
            expect(billLineItem.jobId).not.toBeUndefined();
            expect(billLineItem.customerId).not.toBeUndefined();
            expect(billLineItem.jobBillable).not.toBeUndefined();
            expect(billLineItem.description).not.toBeUndefined();
            expect(billLineItem.itemId).not.toBeUndefined();
            expect(billLineItem.quantity).not.toBeUndefined();
            expect(billLineItem.unitPrice).not.toBeUndefined();
            expect(billLineItem.employeeId).not.toBeUndefined();
            expect(billLineItem.actgClassId).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                billLineItemData.entity = 'InvoiceLineItem';

                const newBillLineitem = new BillLineItemEntity(
                    billLineItemData
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: InvoiceLineItem. Expected entity type: BillLineItem.'
            );
        });
    });
});
