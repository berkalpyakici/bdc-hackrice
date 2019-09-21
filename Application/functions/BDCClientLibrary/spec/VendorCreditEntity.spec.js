/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

VendorCreditEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - isActive
    - vendorId
    - refNumber
    - approvalStatus
    - creditDate
    - glPostingDate
    - amount
    - appliedAmount
    - creditStatus
    - description
    - createdTime
    - updatedTime
    - vendorCreditLineItems
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const VendorCreditEntity = require('../lib/Entities/VendorCreditEntity');

describe('VendorCreditEntity', () => {
    describe('constructor', () => {
        const vendorCreditData = {
            entity: 'VendorCredit',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            isActive: '1',
            vendorId: 'xxxxxxxxxxxxxxxxxxxx',
            refNumber: '2342d',
            approvalStatus: '0',
            creditDate: '2016-12-10',
            glPostingDate: '2016-12-10',
            amount: 200.0,
            appliedAmount: 0.0,
            creditStatus: '2',
            description: 'Returned musical toys',
            createdTime: '2016-12-05T22:57:19.000+0000',
            updatedTime: '2012-12-09T22:39:14.000+0000',
            vendorCreditLineItems: [
                {
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
                }
            ]
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

        const vendorCredit = new VendorCreditEntity(vendorCreditData, metadata);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(vendorCredit.entity).toEqual('VendorCredit');
            expect(vendorCredit.entity).not.toBeUndefined();
            expect(vendorCredit.id).not.toBeUndefined();
            expect(vendorCredit.isActive).not.toBeUndefined();
            expect(vendorCredit.vendorId).not.toBeUndefined();
            expect(vendorCredit.refNumber).not.toBeUndefined();
            expect(vendorCredit.approvalStatus).not.toBeUndefined();
            expect(vendorCredit.creditDate).not.toBeUndefined();
            expect(vendorCredit.glPostingDate).not.toBeUndefined();
            expect(vendorCredit.amount).not.toBeUndefined();
            expect(vendorCredit.appliedAmount).not.toBeUndefined();
            expect(vendorCredit.creditStatus).not.toBeUndefined();
            expect(vendorCredit.description).not.toBeUndefined();
            expect(vendorCredit.createdTime).not.toBeUndefined();
            expect(vendorCredit.updatedTime).not.toBeUndefined();
            expect(vendorCredit.vendorCreditLineItems).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                vendorCreditData.entity = 'Invoice';

                const newvendorCredit = new VendorCreditEntity(
                    vendorCreditData
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Invoice. Expected entity type: VendorCredit.'
            );
        });
    });
});
