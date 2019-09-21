/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

VendorBankAccount Constructor
- Should instantiate with entity attribute: 'VendorBankAccount'
- Should instantiate with an Auth property of an Auth Object instance

VendorBankAccount.create
- Should return a VendorBankAccount Entity Object
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

VendorBankAccount.read
- Should return a VendorBankAccount Entity Object
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

VendorBankAccount.list
- Should return a list of VendorBankAccount Entity Objects
- Should throw a FailedRequestException if request fails

*/
const {
    username,
    password,
    devKey,
    env,
    vendorBankAccountId
} = require('../testConfig');
const BDC = require('../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const VendorBankAccount = require('../lib/VendorBankAccount');
const VendorBankAccountEntity = require('../lib/Entities/VendorBankAccountEntity');

describe('VendorBankAccount', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999;
        await BDC.Auth.login(
            '00801GKDRKCVMRWKCilw',
            '!b51TSB0LlwbZGu6m3Api8LKXIh1ei3OsOgl3sow3vC0da2TRugE0p9sWb8Sb-v-XS',
            '123-456-789'
        );
    });

    afterAll(async () => {
        await BDC.Auth.logout();
    });

    describe('constructor', () => {
        const vendorBankAccount = new VendorBankAccount(BDC.Auth);

        it('should instantiate VendorBankAccount instance with an entity attribute of `VendorBankAccount`', () => {
            expect(vendorBankAccount.entity).toEqual('VendorBankAccount');
        });

        it('should instantiate Vendor object with an Auth property of an Auth Object instance', () => {
            expect(vendorBankAccount.Auth).toEqual(jasmine.any(Auth));
        });
    });

    describe('create method', () => {
        it('should return a VendorBankAccountEntity Object', async () => {
            const newVendor = await BDC.Vendor.create({ name: 'test' });
            const vendorBankAccount = await BDC.VendorBankAccount.create({
                vendorId: newVendor.id,
                routingNumber: '322271627',
                accountNumber: '1234567890',
                usersId: '00601QGFEOBRKTEGEl1a'
            });

            expect(vendorBankAccount).toEqual(
                jasmine.any(VendorBankAccountEntity)
            );
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.VendorBankAccount.create();
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
                await BDC.VendorBankAccount.create({
                    vendorId: 'vendorId',
                    routingNumber: 'routingNumber',
                    accountNumber: 'accountNumber',
                    usersId: 'usersId'
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid entity data. Invalid DB ID: vendorId.'
            );
        });
    });

    describe('read method', () => {
        it('should return a VendorBankAccountEntity Object', async () => {
            const vendorBankAccount = await BDC.VendorBankAccount.read(
                vendorBankAccountId
            );

            expect(vendorBankAccount).toEqual(
                jasmine.any(VendorBankAccountEntity)
            );
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.VendorBankAccount.read();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: vendorBankAccountId, please define vendorBankAccountId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invalidVendorBankAccountId = '1234567890';

            try {
                await BDC.VendorBankAccount.read(invalidVendorBankAccountId);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: id, 1234567890.'
            );
        });
    });

    describe('list method', () => {
        it('should return an array of VendorBankAccountEntity Objects', async () => {
            const vendorBankAccounts = await BDC.VendorBankAccount.list();
            expect(vendorBankAccounts[0]).toEqual(
                jasmine.any(VendorBankAccountEntity)
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.VendorBankAccount.list({ nested: 13 });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: nested, 13.'
            );
        });
    });
});
