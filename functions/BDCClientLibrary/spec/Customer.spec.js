/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

Customer Constructor
- Should instantiate with entity attribute: 'Customer'
- Should instantiate with an Auth property of an Auth Object instance

Customer.create
- Should return a Customer Entity Object
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Customer.read
- Should return a Customer Entity Object
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Customer.list
- Should return a list of Customer Entity Objects
- Should throw a FailedRequestException if request fails

Customer.update
- Should return a CustomerEntityObject
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw an IncorrectEntityException if entity passed in is of the wrong entity type
- Should throw a FailedRequestException if request fails

Customer.setCustomerAuthorization
- Should return a CustomerEntityObject
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

*/
const {
    username,
    password,
    devKey,
    env,
    orgId,
    customerId,
    vendorId
} = require('../testConfig');
const BDC = require('../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const Customer = require('../lib/Customer');
const CustomerEntity = require('../lib/Entities/CustomerEntity');

describe('Customer', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
        await BDC.Auth.login(orgId);
    });

    afterAll(async () => {
        await BDC.Auth.logout();
    });

    describe('constructor', () => {
        const customer = new Customer(BDC.Auth);

        it('should instantiate Customer instance with an entity attribute of `Customer`', () => {
            expect(customer.entity).toEqual('Customer');
        });

        it('should instantiate Customer object with an Auth property of an Auth Object instance', () => {
            expect(customer.Auth).toEqual(jasmine.any(Auth));
        });
    });

    describe('create method', () => {
        it('should return a CustomerEntity Object', async () => {
            const newCustomer = await BDC.Customer.create({
                name: 'test'
            });
            expect(newCustomer).toEqual(jasmine.any(CustomerEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Customer.create();
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
                await BDC.Customer.create({ name: longName });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid entity data. name: Maximum length cannot be greater than 100 characters.'
            );
        });
    });

    describe('read method', () => {
        it('should return a CustomerEntity Object', async () => {
            const customer = await BDC.Customer.read(customerId);
            expect(customer).toEqual(jasmine.any(CustomerEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Customer.read();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: customerId, please define customerId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invalidCustomerId = '1234567890';

            try {
                await BDC.Customer.read(invalidCustomerId);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: id, 1234567890.'
            );
        });
    });

    describe('list method', () => {
        it('should return an array of CustomerEntity Objects', async () => {
            const customers = await BDC.Customer.list();
            expect(customers[0]).toEqual(jasmine.any(CustomerEntity));
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Customer.list({ nested: 13 });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: nested, 13.'
            );
        });
    });

    describe('update method', () => {
        it('should return a CustomerEntity Object', async () => {
            const customer = await BDC.Customer.read(customerId);
            const updatedCustomer = await BDC.Customer.update(customer);

            expect(updatedCustomer).toEqual(jasmine.any(CustomerEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Customer.update();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: CustomerEntity, please define CustomerEntity.'
            );
        });

        it('should throw an IncorrectEntityType Exception if entity passed in is not of type: Customer', async () => {
            let errorMessage = 'No error thrown.';

            const customer = await BDC.Vendor.read(vendorId);

            try {
                await BDC.Customer.update(customer);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Vendor. Expected entity type: Customer.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const customer = await BDC.Customer.read(customerId);

            let longName = '';

            while (longName.length <= 100) {
                longName += '0';
            }

            customer.name = longName;

            try {
                await BDC.Customer.update(customer);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid entity data. name: Maximum length cannot be greater than 100 characters.'
            );
        });
    });

    describe('setCustomerAuthorization method', () => {
        it('should return a CustomerEntity Object', async () => {
            const customer = await BDC.Customer.setCustomerAuthorization(
                customerId,
                true
            );

            expect(customer).toEqual(jasmine.any(CustomerEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Customer.setCustomerAuthorization();
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
                await BDC.Customer.setCustomerAuthorization(
                    '1234567890',
                    false
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Missing required data for: customerId.');
        });
    });
});
