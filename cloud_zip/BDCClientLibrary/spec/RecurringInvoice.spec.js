/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

RecurringInvoice Constructor
- Should instantiate with entity attribute: 'RecurringInvoice'
- Should instantiate with an Auth property of an Auth Object instance

RecurringInvoice.create
- Should return a RecurringInvoice Entity Object with nested RecurringInvoiceLineItem Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

RecurringInvoice.read
- Should return a RecurringInvoice Entity Object with nested RecurringInvoiceLineItem Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

RecurringInvoice.list
- Should return a list of RecurringInvoice Entity Objects with nested RecurringInvoiceLineItem Entities 
- Should throw a FailedRequestException if request fails

RecurringInvoice.update
- Should return a RecurringInvoiceEntity Object with nested RecurringInvoiceLineItem Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw an IncorrectEntityException if entity passed in is of the wrong entity type
- Should throw a FailedRequestException if request fails

*/
const {
    username,
    password,
    devKey,
    env,
    orgId,
    customerId,
    recurringInvoiceId,
    vendorId
} = require('../testConfig');
const BDC = require('../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const RecurringInvoice = require('../lib/RecurringInvoice');
const RecurringInvoiceEntity = require('../lib/Entities/RecurringInvoiceEntity');

describe('RecurringInvoice', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
        await BDC.Auth.login(orgId);
    });

    afterAll(async () => {
        await BDC.Auth.logout();
    });

    describe('constructor', () => {
        const recurringInvoice = new RecurringInvoice(BDC.Auth);

        it('should instantiate RecurringInvoice instance with an entity attribute of `RecurringInvoice`', () => {
            expect(recurringInvoice.entity).toEqual('RecurringInvoice');
        });

        it('should instantiate RecurringInvoice object with an Auth property of an Auth Object instance', () => {
            expect(recurringInvoice.Auth).toEqual(jasmine.any(Auth));
        });
    });

    describe('create', () => {
        it('should return a RecurringInvoice Entity Object', async () => {
            const recurringInvoice = await BDC.RecurringInvoice.create({
                customerId,
                timePeriod: '2',
                frequencyPerTimePeriod: 1,
                nextDueDate: '2025-09-15',
                daysInAdvance: 10,
                recurringInvoiceLineItems: [{ quantity: 5 }]
            });

            expect(recurringInvoice).toEqual(
                jasmine.any(RecurringInvoiceEntity)
            );
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.RecurringInvoice.create();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: customerId, please define customerId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                const recurringInvoice = await BDC.RecurringInvoice.create({
                    customerId,
                    timePeriod: '2',
                    frequencyPerTimePeriod: 1,
                    nextDueDate: 'this is an invalid date',
                    daysInAdvance: 10,
                    recurringInvoiceLineItems: [{ quantity: 5 }]
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
        it('should return a RecurringInvoiceEntity Object', async () => {
            const recurringInvoice = await BDC.RecurringInvoice.read(
                recurringInvoiceId
            );
            expect(recurringInvoice).toEqual(
                jasmine.any(RecurringInvoiceEntity)
            );
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.RecurringInvoice.read();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: recurringInvoiceId, please define recurringInvoiceId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invalidInvoiceId = '1234567890';

            try {
                await BDC.RecurringInvoice.read(invalidInvoiceId);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: id, 1234567890.'
            );
        });
    });

    describe('list', () => {
        it('should return an array of RecurringInvoiceEntity Objects', async () => {
            const recurringInvoicesAccounts = await BDC.RecurringInvoice.list();
            expect(recurringInvoicesAccounts[0]).toEqual(
                jasmine.any(RecurringInvoiceEntity)
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Invoice.list({ nested: 13 });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: nested, 13.'
            );
        });
    });

    describe('update', () => {
        it('should return an RecurringInvoiceEntity Object', async () => {
            const recurringInvoice = await BDC.RecurringInvoice.read(
                recurringInvoiceId
            );

            const updatedRecurringInvoice = await BDC.RecurringInvoice.update(
                recurringInvoice
            );

            expect(updatedRecurringInvoice).toEqual(
                jasmine.any(RecurringInvoiceEntity)
            );
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.RecurringInvoice.update();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: recurringInvoiceEntity, please define recurringInvoiceEntity.'
            );
        });

        it('should throw an IncorrectEntityType Exception if entity passed in is not of type: Invoice', async () => {
            let errorMessage = 'No error thrown.';

            const recurringInvoice = await BDC.Vendor.read(vendorId);

            try {
                await BDC.RecurringInvoice.update(recurringInvoice);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Vendor. Expected entity type: RecurringInvoice.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const recurringinvoice = await BDC.RecurringInvoice.read(
                recurringInvoiceId
            );

            recurringinvoice.isToBeEmailed = 9;

            try {
                await BDC.RecurringInvoice.update(recurringinvoice);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Invalid field datatype: isToBeEmailed.');
        });
    });
});
