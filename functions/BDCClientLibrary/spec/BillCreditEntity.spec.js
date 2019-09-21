/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

BillCreditEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - billId
    - sentPayId
    - vendorCreditId
    - amount
    - createdTime
    - updatedTime
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const BillCreditEntity = require('../lib/Entities/BillCreditEntity');

describe('BillCreditEntity', () => {
    describe('constructor', () => {
        const billCreditData = {
            entity: 'BillCredit',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            billId: 'xxxxxxxxxxxxxxxxxxxx',
            sentPayId: 'xxxxxxxxxxxxxxxxxxxx',
            vendorCreditId: 'xxxxxxxxxxxxxxxxxxxx',
            amount: 10.0,
            createdTime: '2016-11-24T08:33:40.000+0000',
            updatedTime: '2016-11-24T08:33:44.000+0000'
        };

        const billCredit = new BillCreditEntity(billCreditData);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(billCredit.entity).toEqual('BillCredit');
            expect(billCredit.id).not.toBeUndefined();
            expect(billCredit.billId).not.toBeUndefined();
            expect(billCredit.sentPayId).not.toBeUndefined();
            expect(billCredit.vendorCreditId).not.toBeUndefined();
            expect(billCredit.amount).not.toBeUndefined();
            expect(billCredit.createdTime).not.toBeUndefined();
            expect(billCredit.updatedTime).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                billCreditData.entity = 'Invoice';

                const newBillCredit = new BillCreditEntity(billCreditData);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Invoice. Expected entity type: BillCredit.'
            );
        });
    });
});
