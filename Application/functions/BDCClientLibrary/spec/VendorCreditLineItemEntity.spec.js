/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

VendorCreditLineItemEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - vendorCreditId
    - amount
    - chartOfAccountId
    - departmentId
    - locationId
    - jobId
    - customerId
    - jobBillable
    - description
    - createdTime
    - updatedTime
    - lineType
    - itemId
    - quantity
    - unitPrice
    - employeeId
    - actgClassId
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const VendorCreditLineItemEntity = require('../lib/Entities/VendorCreditLineItemEntity');

describe('VendorCreditLineItemEntity', () => {
    describe('constructor', () => {
        const vendorCreditLineItemData = {
            entity: 'VendorCreditLineItem',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            vendorCreditId: 'xxxxxxxxxxxxxxxxxxxx',
            amount: 100.0,
            chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxx',
            departmentId: 'xxxxxxxxxxxxxxxxxxxx',
            locationId: 'xxxxxxxxxxxxxxxxxxxx',
            jobId: 'xxxxxxxxxxxxxxxxxxxx',
            customerId: 'xxxxxxxxxxxxxxxxxxxx',
            jobBillable: true,
            description: 'Vocal machine',
            createdTime: '2016-12-05T22:57:19.000+0000',
            updatedTime: '2010-09-05T22:57:19.000+0000',
            lineType: '1',
            itemId: 'xxxxxxxxxxxxxxxxxxxx',
            quantity: 1,
            unitPrice: 200.0,
            employeeId: 'xxxxxxxxxxxxxxxxxxxx',
            actgClassId: 'xxxxxxxxxxxxxxxxxxxx'
        };

        // initialize metadata modeled after actual BDC metadata object
        const metadata = {
            fields: {
                id: {
                    readonly: true,
                    required: false,
                    type: 'IdField',
                    entity: 'VendorCredit',
                    label: 'Id'
                }
            }
        };

        const vendorCreditLineItem = new VendorCreditLineItemEntity(
            vendorCreditLineItemData,
            metadata
        );

        it('should instantiate with all of the appropriate attributes', () => {
            expect(vendorCreditLineItem.entity).toEqual('VendorCreditLineItem');
            expect(vendorCreditLineItem.id).not.toBeUndefined();
            expect(vendorCreditLineItem.vendorCreditId).not.toBeUndefined();
            expect(vendorCreditLineItem.amount).not.toBeUndefined();
            expect(vendorCreditLineItem.chartOfAccountId).not.toBeUndefined();
            expect(vendorCreditLineItem.departmentId).not.toBeUndefined();
            expect(vendorCreditLineItem.locationId).not.toBeUndefined();
            expect(vendorCreditLineItem.jobId).not.toBeUndefined();
            expect(vendorCreditLineItem.customerId).not.toBeUndefined();
            expect(vendorCreditLineItem.jobBillable).not.toBeUndefined();
            expect(vendorCreditLineItem.description).not.toBeUndefined();
            expect(vendorCreditLineItem.createdTime).not.toBeUndefined();
            expect(vendorCreditLineItem.updatedTime).not.toBeUndefined();
            expect(vendorCreditLineItem.lineType).not.toBeUndefined();
            expect(vendorCreditLineItem.itemId).not.toBeUndefined();
            expect(vendorCreditLineItem.quantity).not.toBeUndefined();
            expect(vendorCreditLineItem.unitPrice).not.toBeUndefined();
            expect(vendorCreditLineItem.employeeId).not.toBeUndefined();
            expect(vendorCreditLineItem.actgClassId).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                vendorCreditLineItemData.entity = 'Invoice';

                const newvendorCreditLineItem = new VendorCreditLineItemEntity(
                    vendorCreditLineItemData
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Invoice. Expected entity type: VendorCreditLineItem.'
            );
        });
    });
});
