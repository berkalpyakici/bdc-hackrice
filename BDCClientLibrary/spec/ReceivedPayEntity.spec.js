/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

ReceivedPayEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - createdTime
    - updatedTime
    - customerId
    - status
    - paymentDate
    - depositToAccountId
    - isOnline
    - paymentType
    - amount
    - description
    - refNumber
    - convFeeAmount
    - rPConvFee
    - invoicePays
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const ReceivedPayEntity = require('../lib/Entities/ReceivedPayEntity');

describe('ReceivedPayEntity', () => {
    describe('constructor', () => {
        const receivedPayData = {
            entity: 'ReceivedPay',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            createdTime: '2016-11-19T23:07:20.000+0000',
            updatedTime: '2016-11-19T23:07:21.000+0000',
            customerId: 'xxxxxxxxxxxxxxxxxxxx',
            status: '0',
            paymentDate: '2016-11-19',
            depositToAccountId: 'xxxxxxxxxxxxxxxxxxxx',
            isOnline: false,
            paymentType: '1',
            amount: 200.0,
            description: 'Various Ring Washers',
            refNumber: '123',
            convFeeAmount: 0.0,
            rPConvFee: [],
            invoicePays: [
                {
                    entity: 'InvoicePay',
                    id: 'xxxxxxxxxxxxxxxxxxxx',
                    invoiceId: 'xxxxxxxxxxxxxxxxxxxx',
                    amount: 100.0,
                    description: 'Brass Ring Washers',
                    createdTime: '2016-11-19T23:07:21.000+0000',
                    updatedTime: '2016-11-19T23:07:21.000+0000'
                }
            ]
        };

        const receivedPay = new ReceivedPayEntity(receivedPayData);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(receivedPay.entity).toEqual('ReceivedPay');
            expect(receivedPay.id).not.toBeUndefined();
            expect(receivedPay.createdTime).not.toBeUndefined();
            expect(receivedPay.updatedTime).not.toBeUndefined();
            expect(receivedPay.customerId).not.toBeUndefined();
            expect(receivedPay.status).not.toBeUndefined();
            expect(receivedPay.paymentDate).not.toBeUndefined();
            expect(receivedPay.depositToAccountId).not.toBeUndefined();
            expect(receivedPay.isOnline).not.toBeUndefined();
            expect(receivedPay.paymentType).not.toBeUndefined();
            expect(receivedPay.amount).not.toBeUndefined();
            expect(receivedPay.description).not.toBeUndefined();
            expect(receivedPay.refNumber).not.toBeUndefined();
            expect(receivedPay.convFeeAmount).not.toBeUndefined();
            expect(receivedPay.rPConvFee).not.toBeUndefined();
            expect(receivedPay.invoicePays).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                receivedPayData.entity = 'Invoice';

                const newReceivedPay = new ReceivedPayEntity(receivedPayData);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Invoice. Expected entity type: ReceivedPay.'
            );
        });
    });
});
