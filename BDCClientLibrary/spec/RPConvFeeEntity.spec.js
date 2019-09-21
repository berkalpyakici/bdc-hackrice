/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

RPConvFeeEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - refNumber
    - amount
    - paymentDate
    - chartOfAccountId
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const RPConvFeeEntity = require('../lib/Entities/RPConvFeeEntity');

describe('RPConvFeeEntity', () => {
    describe('constructor', () => {
        const rpConvFeeData = {
            entity: 'RPConvFee',
            id: 'xxxxxxxxxxxxxxxxxxxxx',
            refNumber: '1234',
            amount: 50,
            paymentDate: '2025-12-14',
            chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx'
        };

        const rpConvFee = new RPConvFeeEntity(rpConvFeeData);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(rpConvFee.entity).toEqual('RPConvFee');
            expect(rpConvFee.id).not.toBeUndefined();
            expect(rpConvFee.refNumber).not.toBeUndefined();
            expect(rpConvFee.amount).not.toBeUndefined();
            expect(rpConvFee.paymentDate).not.toBeUndefined();
            expect(rpConvFee.chartOfAccountId).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                rpConvFeeData.entity = 'Invoice';

                const newRPConvFee = new RPConvFeeEntity(rpConvFeeData);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Invoice. Expected entity type: RPConvFee.'
            );
        });
    });
});
