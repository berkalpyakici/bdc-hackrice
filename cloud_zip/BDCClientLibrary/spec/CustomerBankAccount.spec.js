/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

CustomerBankAccount Constructor
- Should instantiate with entity attribute: 'CustomerBankAccount'
- Should instantiate with an Auth property of an Auth Object instance

CustomerBankAccount.create
- Should return a CustomerBankAccount Entity Object
- Should throw a MissingRequiredFieldException if an argument is not passed in
- Should throw a FailedRequestException if request fails

CustomerBankAccount.read
- Should return a CustomerBankAccount Entity Object
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

CustomerBankAccount.list
- Should return a list of CustomerBankAccount Entity Objects
- Should throw a FailedRequestException if request fails

*/
const {
    username,
    password,
    devKey,
    env,
    orgId,
    mfaId,
    deviceId
} = require('../testConfig');
const BDC = require('../../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const CustomerBankAccount = require('../lib/CustomerBankAccount');
const CustomerBankAccountEntity = require('../lib/Entities/CustomerBankAccountEntity');

describe('CustomerBankAccount', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
        await BDC.Auth.login(orgId, mfaId, deviceId);
    });

    afterAll(async () => {
        await BDC.Auth.logout();
    });

    describe('constructor', () => {
        const customerBankAccount = new CustomerBankAccount(BDC.Auth);

        it('should instantiate CustomerBankAccount instance with an entity attribute of `CustomerBankAccount`', () => {
            expect(customerBankAccount.entity).toEqual('CustomerBankAccount');
        });

        it('should instantiate CustomerBankAccount object with an Auth property of an Auth Object instance', () => {
            expect(customerBankAccount.Auth).toEqual(jasmine.any(Auth));
        });
    });

    describe('create method', () => {
        it('should return a CustomerBankAccountEntity Object', async () => {
            const customer = await BDC.Customer.create({
                name: 'test',
                options: {
                    billAddress1: '123 Main Street',
                    billAddressCity: 'Santa Clara',
                    billAddressState: 'CA',
                    billAddressCountry: 'USA',
                    billAddressZip: '95051'
                }
            });

            await BDC.Customer.setCustomerAuthorization(customer.id, true);

            const customerBankAccount = await BDC.CustomerBankAccount.create({
                customerId: customer.id,
                nameOnAccount: 'test account',
                routingNumber: '322271627',
                accountNumber: '1234567890',
                agreedWithTOS: true
            });

            expect(customerBankAccount).toEqual(
                jasmine.any(CustomerBankAccountEntity)
            );
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.CustomerBankAccount.create();
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
                await BDC.CustomerBankAccount.create({
                    customerId: 'customerId',
                    nameOnAccount: 'nameOnAccount',
                    routingNumber: 'routingNumber',
                    accountNumber: 'accountNumber',
                    agreedWithTOS: true
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid entity data. Invalid DB ID: customerId.'
            );
        });
    });

    describe('read method', () => {
        it('should return a VendorBankAccountEntity Object', async () => {
            const customerBankAccount = await BDC.CustomerBankAccount.read(
                'cba01AFVDHGUXORPIn3g'
            );
            expect(customerBankAccount).toEqual(
                jasmine.any(CustomerBankAccountEntity)
            );
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.CustomerBankAccount.read();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: customerBankAccountId, please define customerBankAccountId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invalidCustomerBankAccountId = '1234567890';

            try {
                await BDC.CustomerBankAccount.read(
                    invalidCustomerBankAccountId
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: id, 1234567890.'
            );
        });
    });

    describe('list method', () => {
        it('should return an array of CustomerBankAccountEntity Objects', async () => {
            const customerBankAccounts = await BDC.CustomerBankAccount.list();
            expect(customerBankAccounts[0]).toEqual(
                jasmine.any(CustomerBankAccountEntity)
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.CustomerBankAccount.list({ nested: 13 });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: nested, 13.'
            );
        });
    });
});
