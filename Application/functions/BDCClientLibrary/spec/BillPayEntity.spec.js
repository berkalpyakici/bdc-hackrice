/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

BillPayEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - billId
    - name
    - paymentStatus
    - amount
    - description
    - processDate
    - createdTime
    - updatedTime
    - syncReference
    - toPrintCheck
    - chartOfAccountId
    - sentPayId
    - allowExport
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const BillPayEntity = require('../lib/Entities/BillPayEntity');

describe('BillPayEntity', () => {
    describe('constructor', () => {
        const billPayData = {
            entity: 'BillPay',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            billId: 'xxxxxxxxxxxxxxxxxxxx',
            name: 'xxxxxxxxxxxxxxxxxxxx',
            paymentStatus: '1',
            amount: 985.0,
            description: 'Inv #July 2016',
            processDate: '2016-11-27',
            createdTime: '2016-11-24T08:33:44.000+0000',
            updatedTime: '2016-11-24T08:33:44.000+0000',
            syncReference: null,
            toPrintCheck: false,
            chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxx',
            sentPayId: 'xxxxxxxxxxxxxxxxxxxx',
            allowExport: true
        };

        const billPay = new BillPayEntity(billPayData);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(billPay.entity).toEqual('BillPay');
            expect(billPay.id).not.toBeUndefined();
            expect(billPay.billId).not.toBeUndefined();
            expect(billPay.name).not.toBeUndefined();
            expect(billPay.paymentStatus).not.toBeUndefined();
            expect(billPay.amount).not.toBeUndefined();
            expect(billPay.description).not.toBeUndefined();
            expect(billPay.processDate).not.toBeUndefined();
            expect(billPay.createdTime).not.toBeUndefined();
            expect(billPay.updatedTime).not.toBeUndefined();
            expect(billPay.syncReference).not.toBeUndefined();
            expect(billPay.toPrintCheck).not.toBeUndefined();
            expect(billPay.chartOfAccountId).not.toBeUndefined();
            expect(billPay.sentPayId).not.toBeUndefined();
            expect(billPay.allowExport).not.toBeUndefined();
        });

        it('should throw a IncorrectEntityException if entity type is incorrect', async () => {
            let errorMessage = 'No error thrown.';

            try {
                billPayData.entity = 'Invoice';

                const newBillPay = new BillPayEntity(billPayData);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Invoice. Expected entity type: BillPay.'
            );
        });
    });
});
