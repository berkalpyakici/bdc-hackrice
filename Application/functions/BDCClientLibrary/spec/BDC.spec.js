/* eslint-disable no-undef */
/*
Tests

BDC constructor
- Should instantiate BDC object with an Auth property of an Auth Object instance
- Should pass all expected credentials into Auth object instantiation

BDC.listOrgs
- method should successfully return a list of orgs
- Throw a FailedRequestException if request is unsuccessful

*/
const { username, password, devKey, env } = require('../testConfig');
const BDC = require('../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const Customer = require('../lib/Customer');
const CustomerBankAccount = require('../lib/CustomerBankAccount');
const Vendor = require('../lib/Vendor');
const VendorBankAccount = require('../lib/VendorBankAccount');
const Invoice = require('../lib/Invoice');
const RecurringInvoice = require('../lib/RecurringInvoice');
const Bill = require('../lib/Bill');
const RecurringBill = require('../lib/RecurringBill');
const Payments = require('../lib/Payments');
const VendorCredit = require('../lib/VendorCredit');

describe('BDC', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
    });

    describe('constructor', () => {
        it('should pass all expected credentials into Auth object instantiation', async () => {
            expect(BDC.Auth._credentials.userName).not.toBeUndefined();

            expect(BDC.Auth._credentials.password).not.toBeUndefined();

            expect(BDC.Auth._credentials.devKey).not.toBeUndefined();

            expect(BDC.Auth._credentials.env).not.toBeUndefined();
        });

        it('should instantiate BDC object with all libraries', async () => {
            // Auth lib
            expect(BDC.Auth).toEqual(jasmine.any(Auth));

            // Customer lib
            expect(BDC.Customer).toEqual(jasmine.any(Customer));

            // CustomerBankAccount lib
            expect(BDC.CustomerBankAccount).toEqual(
                jasmine.any(CustomerBankAccount)
            );

            // Vendor lib
            expect(BDC.Vendor).toEqual(jasmine.any(Vendor));

            // VendorBankAccount lib
            expect(BDC.VendorBankAccount).toEqual(
                jasmine.any(VendorBankAccount)
            );

            // Invoice lib
            expect(BDC.Invoice).toEqual(jasmine.any(Invoice));

            // RecurringInvoice Lib
            expect(BDC.RecurringInvoice).toEqual(jasmine.any(RecurringInvoice));

            // Bill Lib
            expect(BDC.Bill).toEqual(jasmine.any(Bill));

            // RecurringBill Lib
            expect(BDC.RecurringBill).toEqual(jasmine.any(RecurringBill));

            // Payments Lib
            expect(BDC.Payments).toEqual(jasmine.any(Payments));

            // VendorCredit Lib
            expect(BDC.VendorCredit).toEqual(jasmine.any(VendorCredit));
        });
    });

    describe('listOrgs method', () => {
        it('should successfully return a list of orgs', async () => {
            const res = await BDC.listOrgs();
            expect(res[0].orgId).not.toBeUndefined();
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            BDC.Auth._credentials.devKey = undefined;

            let errorMessage = 'No error thrown.';

            try {
                await BDC.listOrgs();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Developer key must be specified.');

            // reset the BDC.Auth._credentials.devKey to its original value
            BDC.Auth._credentials.devKey = devKey;
        });
    });
});
