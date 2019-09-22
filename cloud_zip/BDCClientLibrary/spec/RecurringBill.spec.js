/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

RecurringBill Constructor
- Should instantiate with entity attribute: 'RecurringBill'
- Should instantiate with an Auth property of an Auth Object instance

RecurringBill.create
- Should return a RecurringBill Entity Object with nested RecurringBillLineItem Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

RecurringBill.read
- Should return a RecurringBill Entity Object with nested RecurringBillLineItem Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

RecurringBill.list
- Should return a list of RecurringBill Entity Objects with nested RecurringBillLineItem Entities 
- Should throw a FailedRequestException if request fails

RecurringBill.update
- Should return a RecurringBillEntity Object with nested RecurringBillLineItem Entities 
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
    recurringBillId
} = require('../testConfig');
const BDC = require('../../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const RecurringBill = require('../lib/RecurringBill');
const RecurringBillEntity = require('../lib/Entities/RecurringBillEntity');

describe('RecurringBill', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
        await BDC.Auth.login('00801GKDRKCVMRWKCilw');
    });

    afterAll(async () => {
        await BDC.Auth.logout();
    });

    describe('constructor', () => {
        const recurringBill = new RecurringBill(BDC.Auth);

        it('should instantiate RecurringBill instance with an entity attribute of `RecurringBill`', () => {
            expect(recurringBill.entity).toEqual('RecurringBill');
        });

        it('should instantiate RecurringBill object with an Auth property of an Auth Object instance', () => {
            expect(recurringBill.Auth).toEqual(jasmine.any(Auth));
        });
    });

    describe('create', () => {
        it('should return a RecurringBill Entity Object', async () => {
            const recurringBill = await BDC.RecurringBill.create({
                vendorId,
                timePeriod: '2',
                frequencyPerTimePeriod: 1,
                nextDueDate: '2025-10-15',
                daysInAdvance: 10,
                recurringBillLineItems: [{ amount: 5 }]
            });

            expect(recurringBill).toEqual(jasmine.any(RecurringBillEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.RecurringBill.create();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: vendorId, please define vendorId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                const recurringBill = await BDC.RecurringBill.create({
                    vendorId,
                    timePeriod: '2',
                    frequencyPerTimePeriod: 1,
                    nextDueDate: 'this is an invalid date',
                    daysInAdvance: 10,
                    recurringBillLineItems: [{ amount: 5 }]
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: nextDueDate, this is an invalid date.'
            );
        });
    });

    describe('read', () => {
        it('should return a RecurringBillEntity Object', async () => {
            const recurringBill = await BDC.RecurringBill.read(recurringBillId);
            expect(recurringBill).toEqual(jasmine.any(RecurringBillEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.RecurringBill.read();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: recurringBillId, please define recurringBillId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invalidBillId = '1234567890';

            try {
                await BDC.RecurringBill.read(invalidBillId);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: id, 1234567890.'
            );
        });
    });

    describe('list', () => {
        it('should return an array of RecurringBillEntity Objects', async () => {
            const recurringBillsAccounts = await BDC.RecurringBill.list();
            expect(recurringBillsAccounts[0]).toEqual(
                jasmine.any(RecurringBillEntity)
            );
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
        it('should return an RecurringBillEntity Object', async () => {
            const recurringBill = await BDC.RecurringBill.read(recurringBillId);

            const updatedRecurringBill = await BDC.RecurringBill.update(
                recurringBill
            );

            expect(updatedRecurringBill).toEqual(
                jasmine.any(RecurringBillEntity)
            );
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.RecurringBill.update();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: recurringBillEntity, please define recurringBillEntity.'
            );
        });

        it('should throw an IncorrectEntityType Exception if entity passed in is not of type: Bill', async () => {
            let errorMessage = 'No error thrown.';

            const recurringBill = await BDC.Vendor.read(vendorId);

            try {
                await BDC.RecurringBill.update(recurringBill);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Vendor. Expected entity type: RecurringBill.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const recurringBill = await BDC.RecurringBill.read(recurringBillId);

            recurringBill.isActive = 'null';

            try {
                await BDC.RecurringBill.update(recurringBill);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Invalid field,value: isActive, null.');
        });
    });
});
