/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

Vendor Constructor
- Should instantiate with entity attribute: 'Vendor'
- Should instantiate with an Auth property of an Auth Object instance

Vendor.create
- Should return a VendorEntity Object
 Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Vendor.read
- Should return a VendorEntity Object
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Vendor.list
- Should return a list of VendorEntity Objects
- Should throw a FailedRequestException if request fails

Vendor.update
- Should return a VendorEntity Object
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
    vendorId,
    customerId
} = require('../testConfig');
const BDC = require('../../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const Vendor = require('../lib/Vendor');
const VendorEntity = require('../lib/Entities/VendorEntity');

describe('Vendor', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
        await BDC.Auth.login(orgId);
    });

    afterAll(async () => {
        await BDC.Auth.logout();
    });

    describe('constructor', () => {
        const vendor = new Vendor(BDC.Auth);

        it('should instantiate Vendor instance with an entity attribute of `Vendor`', () => {
            expect(vendor.entity).toEqual('Vendor');
        });

        it('should instantiate Vendor object with an Auth property of an Auth Object instance', () => {
            expect(vendor.Auth).toEqual(jasmine.any(Auth));
        });
    });

    describe('create method', () => {
        it('should return a VendorEntity Object', async () => {
            const newVendor = await BDC.Vendor.create({ name: 'test' });
            expect(newVendor).toEqual(jasmine.any(VendorEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Vendor.create();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: name, please define name.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            let longName = '';

            while (longName.length <= 100) {
                longName += '0';
            }

            try {
                await BDC.Vendor.create({ name: longName });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid entity data. name: Maximum length cannot be greater than 100 characters.'
            );
        });
    });

    describe('read method', () => {
        it('should return a VendorEntity Object', async () => {
            const vendor = await BDC.Vendor.read(vendorId);
            expect(vendor).toEqual(jasmine.any(VendorEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Vendor.read();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: vendorId, please define vendorId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invalidVendorId = '1234567890';

            try {
                await BDC.Vendor.read(invalidVendorId);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: id, 1234567890.'
            );
        });
    });

    describe('list method', () => {
        it('should return an array of VendorEntity Objects', async () => {
            const vendors = await BDC.Vendor.list();
            expect(vendors[0]).toEqual(jasmine.any(VendorEntity));
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Vendor.list({ nested: 13 });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: nested, 13.'
            );
        });
    });

    describe('update method', () => {
        it('should return a VendorEntity Object', async () => {
            const vendor = await BDC.Vendor.read(vendorId);
            const updatedVendor = await BDC.Vendor.update(vendor);

            expect(updatedVendor).toEqual(jasmine.any(VendorEntity));
        });

        it('should throw a MissingRequiredFieldException if VendorEntity object is not passed in as an argument', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Vendor.update();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: VendorEntity, please define VendorEntity.'
            );
        });

        it('should throw an IncorrectEntityType Exception if entity passed in is not of type: Vendor', async () => {
            let errorMessage = 'No error thrown.';

            const vendor = await BDC.Customer.read(customerId);

            try {
                await BDC.Vendor.update(vendor);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Customer. Expected entity type: Vendor.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const vendor = await BDC.Vendor.read(vendorId);

            let longName = '';

            while (longName.length <= 100) {
                longName += '0';
            }

            vendor.name = longName;

            try {
                await BDC.Vendor.update(vendor);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid entity data. name: Maximum length cannot be greater than 100 characters.'
            );
        });
    });
});
