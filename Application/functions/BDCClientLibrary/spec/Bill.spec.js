/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

Bill Constructor
- Should instantiate with entity attribute: 'Bill'
- Should instantiate with an Auth property of an Auth Object instance

Bill.create
- Should return a Bill Entity Object with nested BillLineItem Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Bill.read
- Should return a Bill Entity Object with nested BillLineItem Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Bill.list
- Should return a list of Bill Entity Objects with nested BillLineItem Entities 
- Should throw a FailedRequestException if request fails

Bill.update
- Should return a BillEntity Object with nested BillLineItem Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw an IncorrectEntityException if entity passed in is of the wrong entity type
- Should throw a FailedRequestException if request fails

*/
const {
    username,
    password,
    devKey,
    env,
    vendorId,
    billId
} = require('../testConfig');
const BDC = require('../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const Bill = require('../lib/Bill');
const BillEntity = require('../lib/Entities/BillEntity');

describe('Bill', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
        await BDC.Auth.login('00801GKDRKCVMRWKCilw');
    });

    afterAll(async () => {
        await BDC.Auth.logout();
    });

    describe('constructor', () => {
        const bill = new Bill(BDC.Auth);

        it('should instantiate Bill instance with an entity attribute of `Bill`', () => {
            expect(bill.entity).toEqual('Bill');
        });

        it('should instantiate Bill instance with an Auth property of an Auth Object instance', () => {
            expect(bill.Auth).toEqual(jasmine.any(Auth));
        });
    });

    describe('create', () => {
        it('should return a Bill Entity Object', async () => {
            const invoiceNumber = `${Math.floor(
                Math.random() * Math.floor(99999)
            )}`;

            const bill = await BDC.Bill.create({
                vendorId,
                invoiceNumber,
                invoiceDate: '2025-10-1',
                dueDate: '2025-10-15',
                billLineItems: [{ amount: 5 }]
            });

            expect(bill).toEqual(jasmine.any(BillEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Bill.create();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: vendorId, please define vendorId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invoiceNumber = `${Math.floor(
                Math.random() * Math.floor(99999)
            )}`;

            try {
                await BDC.Bill.create({
                    vendorId: '1234567890',
                    invoiceNumber,
                    invoiceDate: '2019-9-1',
                    dueDate: '2019-9-15',
                    billLineItems: [{ amount: 7 }]
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Invalid field,value: id, 1234567890.');
        });
    });

    describe('read', () => {
        it('should return an Bill Object', async () => {
            const bill = await BDC.Bill.read(billId);
            expect(bill).toEqual(jasmine.any(BillEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Bill.read();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: billId, please define billId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invalidBillId = '1234567890';

            try {
                await BDC.Bill.read(invalidBillId);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Missing required data for: id.');
        });
    });

    describe('list', () => {
        it('should return an array of BillEntity Objects', async () => {
            const billAccounts = await BDC.Bill.list();
            expect(billAccounts[0]).toEqual(jasmine.any(BillEntity));
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Bill.list({ nested: 13 });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: nested, 13.'
            );
        });
    });

    describe('update', () => {
        it('should return an BillEntity Object', async () => {
            const bill = await BDC.Bill.read(billId);
            const updatedBill = await BDC.Bill.update(bill);

            expect(updatedBill).toEqual(jasmine.any(BillEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Bill.update();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: BillEntity, please define BillEntity.'
            );
        });

        it('should throw an IncorrectEntityType Exception if entity passed in is not of type: Bill', async () => {
            let errorMessage = 'No error thrown.';

            const bill = await BDC.Vendor.read(vendorId);

            try {
                await BDC.Bill.update(bill);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Vendor. Expected entity type: Bill.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const bill = await BDC.Bill.read(billId);

            bill.dueDate = 9;

            try {
                await BDC.Bill.update(bill);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: dueDate, 9.'
            );
        });
    });
});
