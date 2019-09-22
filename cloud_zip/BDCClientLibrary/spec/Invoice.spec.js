/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

Invoice Constructor
- Should instantiate with entity attribute: 'Invoice'
- Should instantiate with an Auth property of an Auth Object instance

Invoice.create
- Should return an Invoice Entity Object with nested InvoiceLineItem Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Invoice.read
- Should return a Invoice Entity Object with nested InvoiceLineItem Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Invoice.list
- Should return a list of Invoice Entity Objects with nested InvoiceLineItem Entities 
- Should throw a FailedRequestException if request fails

Invoice.update
- Should return a InvoiceEntity Object with nested InvoiceLineItem Entities 
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
    customerId,
    invoiceId
} = require('../testConfig');
const BDC = require('../../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const Invoice = require('../lib/Invoice');
const InvoiceEntity = require('../lib/Entities/InvoiceEntity');

describe('Invoice', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
        await BDC.Auth.login(orgId);
    });

    afterAll(async () => {
        await BDC.Auth.logout();
    });

    describe('constructor', () => {
        const invoice = new Invoice(BDC.Auth);

        it('should instantiate Invoice instance with an entity attribute of `Invoice`', () => {
            expect(invoice.entity).toEqual('Invoice');
        });

        it('should instantiate Invoice object with an Auth property of an Auth Object instance', () => {
            expect(invoice.Auth).toEqual(jasmine.any(Auth));
        });
    });

    describe('create', () => {
        it('should return an Invoice Entity Object', async () => {
            const invoiceNumber = `${Math.floor(
                Math.random() * Math.floor(99999)
            )}`;

            const invoice = await BDC.Invoice.create({
                customerId,
                invoiceNumber,
                invoiceDate: '2025-9-1',
                dueDate: '2025-9-15',
                invoiceLineItems: [{ quantity: 5 }]
            });

            expect(invoice).toEqual(jasmine.any(InvoiceEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Invoice.create();
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
                await BDC.Invoice.create({
                    customerId: '1234567890',
                    invoiceNumber: 'invoiceNumber',
                    invoiceDate: '2015-9-1',
                    dueDate: '2025-9-15',
                    invoiceLineItems: [{ quantity: 7 }]
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid field,value: customerId, 1234567890.'
            );
        });
    });

    describe('read', () => {
        it('should return an Invoice Object', async () => {
            const invoice = await BDC.Invoice.read(invoiceId);
            expect(invoice).toEqual(jasmine.any(InvoiceEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Invoice.read();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: invoiceId, please define invoiceId.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invalidInvoiceId = '1234567890';

            try {
                await BDC.Invoice.read(invalidInvoiceId);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: id, 1234567890.'
            );
        });
    });

    describe('list', () => {
        it('should return an array of InvoiceEntity Objects', async () => {
            const invoicesAccounts = await BDC.Invoice.list();
            expect(invoicesAccounts[0]).toEqual(jasmine.any(InvoiceEntity));
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
        it('should return an InvoiceEntity Object', async () => {
            const invoice = await BDC.Invoice.read('00e01PVSRNLRJYVE1016');
            const updatedInvoice = await BDC.Invoice.update(invoice);

            expect(updatedInvoice).toEqual(jasmine.any(InvoiceEntity));
        });

        it('should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Invoice.update();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: InvoiceEntity, please define InvoiceEntity.'
            );
        });

        it('should throw an IncorrectEntityType Exception if entity passed in is not of type: Invoice', async () => {
            let errorMessage = 'No error thrown.';

            const invoice = await BDC.Vendor.read(vendorId);

            try {
                await BDC.Invoice.update(invoice);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Vendor. Expected entity type: Invoice.'
            );
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            const invoice = await BDC.Invoice.read(invoiceId);

            invoice.isToBeEmailed = 9;

            try {
                await BDC.Invoice.update(invoice);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Invalid field datatype: isToBeEmailed.');
        });
    });
});
