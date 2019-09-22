/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

VendorCredit Constructor
- Should instantiate with entity attribute: 'VendorCredit'
- Should instantiate with an Auth property of an Auth Object instance

VendorCredit.create
- Should return a VendorCreditEntity Object
 Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

VendorCredit.read
- Should return a VendorCreditEntity Object
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

VendorCredit.list
- Should return a list of VendorCreditEntity Objects
- Should throw a FailedRequestException if request fails

VendorCredit.update
- Should return a VendorCreditEntity Object
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw an IncorrectEntityException if entity passed in is of the wrong entity type
- Should throw a FailedRequestException if request fails

*/
const {
    username,
    password,
    devKey,
    env,
    vendorCreditId,
    vendorId
} = require('../testConfig');
const BDC = require('../../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const VendorCredit = require('../lib/VendorCredit');
const VendorCreditEntity = require('../lib/Entities/VendorCreditEntity');

describe('VendorCredit', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
        await BDC.Auth.login('00801GKDRKCVMRWKCilw');
    });

    afterAll(async () => {
        await BDC.Auth.logout();
    });

    describe('constructor', () => {
        const vendorCredit = new VendorCredit(BDC.Auth);

        it('should instantiate VendorCredit instance with an entity attribute of `VendorCredit`', () => {
            expect(vendorCredit.entity).toEqual('VendorCredit');
        });

        it('should instantiate VendorCredit object with an Auth property of an Auth Object instance', () => {
            expect(vendorCredit.Auth).toEqual(jasmine.any(Auth));
        });
    });

    describe('create method', () => {
        it('should return a VendorCreditEntity Object', async () => {
            const newVendorCredit = await BDC.VendorCredit.create({
                vendorId,
                refNumber: '1234',
                creditDate: '2019-10-15',
                vendorCreditLineItems: [{ amount: 100 }]
            });

            expect(newVendorCredit).toEqual(jasmine.any(VendorCreditEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.VendorCredit.create();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: vendorId, please define vendorId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const fakeVendorId = '00901SZQNDBJSAXN1josx';

            try {
                await BDC.VendorCredit.create({
                    vendorId: fakeVendorId,
                    refNumber: '1234',
                    creditDate: '2019-10-15',
                    vendorCreditLineItems: [{ amount: 100 }]
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid field,value: id, 00901SZQNDBJSAXN1josx.'
            );
        });
    });

    describe('read method', () => {
        it('should return a VendorCreditEntity Object', async () => {
            const vendorCredit = await BDC.VendorCredit.read(vendorCreditId);

            expect(vendorCredit).toEqual(jasmine.any(VendorCreditEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.VendorCredit.read();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: vendorCreditId, please define vendorCreditId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invalidVendorCreditId = '1234567890';

            try {
                await BDC.VendorCredit.read(invalidVendorCreditId);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Missing required data for: id.');
        });
    });

    describe('list method', () => {
        it('should return an array of VendorCreditEntity Objects', async () => {
            const vendorCredits = await BDC.VendorCredit.list();
            expect(vendorCredits[0]).toEqual(jasmine.any(VendorCreditEntity));
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.VendorCredit.list({ nested: 13 });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: nested, 13.'
            );
        });
    });

    describe('update method', () => {
        it('should return a VendorCreditEntity Object', async () => {
            const vendorCredit = await BDC.VendorCredit.read(vendorCreditId);

            const updatedVendorCredit = await BDC.VendorCredit.update(
                vendorCredit
            );

            expect(updatedVendorCredit).toEqual(
                jasmine.any(VendorCreditEntity)
            );
        });

        it('should throw a MissingRequiredFieldException if VendorCreditEntity object is not passed in as an argument', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.VendorCredit.update();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: VendorCreditEntity, please define VendorCreditEntity.'
            );
        });

        it('should throw an IncorrectEntityType Exception if entity passed in is not of type: VendorCredit', async () => {
            let errorMessage = 'No error thrown.';

            const vendorCredit = await BDC.Customer.read(
                '0cu01GTWXVFCEJWM12ly'
            );

            try {
                await BDC.VendorCredit.update(vendorCredit);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Customer. Expected entity type: VendorCredit.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const vendorCredit = await BDC.VendorCredit.read(vendorCreditId);

            vendorCredit.isActive = 'f';

            try {
                await BDC.VendorCredit.update(vendorCredit);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Invalid field,value: isActive, f.');
        });
    });
});
