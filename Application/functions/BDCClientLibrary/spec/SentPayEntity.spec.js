/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

SentPayEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - processDate
    - amount
    - status
    - description
    - txnNumber
    - name
    - vendorId
    - isOnline
    - chartOfAccountId
    - syncReference
    - toPrintCheck
    - createdTime
    - updatedTime
    - bankAccountId
    - needAttnReviewed
    - source
    - billPays
    - billCredits
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const SentPayEntity = require('../lib/Entities/SentPayEntity');

describe('SentPayEntity', () => {
    describe('constructor', () => {
        const sentPayData = {
            entity: 'SentPay',
            id: 'xxxxxxxxxxxxxxxxxxxxx',
            processDate: '2016-11-27',
            amount: 985.0,
            status: '1',
            description: 'Inv #July 2016',
            txnNumber: 'xxxxxxxxxxxxxxxxxxxxx',
            name: 'xxxxxxxxxxxxxxxxxxxxx',
            vendorId: 'xxxxxxxxxxxxxxxxxxxxx',
            isOnline: true,
            chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
            syncReference: null,
            toPrintCheck: false,
            createdTime: '2016-11-24T08:33:44.000+0000',
            updatedTime: '2016-11-24T08:33:44.000+0000',
            bankAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
            needAttnReviewed: false,
            source: '0',
            billPays: [
                {
                    entity: 'BillPay',
                    id: 'xxxxxxxxxxxxxxxxxxxxx',
                    billId: 'xxxxxxxxxxxxxxxxxxxxx',
                    name: 'xxxxxxxxxxxxxxxxxxxxx',
                    paymentStatus: '1',
                    amount: 985.0,
                    description: 'Inv #July 2012',
                    processDate: '2012-11-27',
                    createdTime: '2016-11-24T08:33:44.000+0000',
                    updatedTime: '2016-11-24T08:33:44.000+0000',
                    syncReference: null,
                    toPrintCheck: false,
                    chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx'
                }
            ],
            billCredits: [
                {
                    entity: 'BillCredit',
                    id: 'xxxxxxxxxxxxxxxxxxxxx',
                    billId: 'xxxxxxxxxxxxxxxxxxxxx',
                    sentPayId: 'xxxxxxxxxxxxxxxxxxxxx',
                    vendorCreditId: 'xxxxxxxxxxxxxxxxxxxxx',
                    amount: 10.0,
                    createdTime: '2016-11-24T08:33:40.000+0000',
                    updatedTime: '2016-11-24T08:33:44.000+0000'
                }
            ]
        };

        const rpConvFee = new SentPayEntity(sentPayData);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(rpConvFee.entity).toEqual('SentPay');
            expect(rpConvFee.id).not.toBeUndefined();
            expect(rpConvFee.processDate).not.toBeUndefined();
            expect(rpConvFee.amount).not.toBeUndefined();
            expect(rpConvFee.status).not.toBeUndefined();
            expect(rpConvFee.description).not.toBeUndefined();
            expect(rpConvFee.txnNumber).not.toBeUndefined();
            expect(rpConvFee.name).not.toBeUndefined();
            expect(rpConvFee.vendorId).not.toBeUndefined();
            expect(rpConvFee.isOnline).not.toBeUndefined();
            expect(rpConvFee.chartOfAccountId).not.toBeUndefined();
            expect(rpConvFee.syncReference).not.toBeUndefined();
            expect(rpConvFee.toPrintCheck).not.toBeUndefined();
            expect(rpConvFee.createdTime).not.toBeUndefined();
            expect(rpConvFee.updatedTime).not.toBeUndefined();
            expect(rpConvFee.bankAccountId).not.toBeUndefined();
            expect(rpConvFee.needAttnReviewed).not.toBeUndefined();
            expect(rpConvFee.source).not.toBeUndefined();
            expect(rpConvFee.billPays).not.toBeUndefined();
            expect(rpConvFee.billCredits).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                sentPayData.entity = 'Invoice';

                const newRPConvFee = new SentPayEntity(sentPayData);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Invoice. Expected entity type: SentPay.'
            );
        });
    });
});
