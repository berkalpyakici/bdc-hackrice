/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

Payments Constructor
- Should instantiate with an Auth property of an Auth Object instance

Payments.payBills
- Should return an array with a SentPay Entity Object with nested BillPay Entities 
- Should return an array with a SentPay Entity Object with nested BillCredit Entities
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Payments.chargeCustomer
- Should return an array with a ReceivedPay Entity Object with nested InvoicePay Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Payments.getAPSummary
- Should return an AP Summary for the account
- Should throw a FailedRequestException if request fails

Payments.getARSummary
- Should return an AR Summary for the account
- Should throw a FailedRequestException if request fails

Payments.recordAPPayment
- Should return a SentPay Entity Object with nested BillPay Entities 
- Should return a SentPay Entity Object with nested BillCredit Entities
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Payments.recordARPayment
- Should return an array with a ReceivedPay Entity Object with nested InvoicePay Entities 
- Should throw a MissingRequiredFieldException if a required argument is not passed in
- Should throw a FailedRequestException if request fails

Payments.listPayments

*/
const {
    username,
    password,
    devKey,
    env,
    orgId,
    mfaId,
    deviceId,
    vendorId,
    customerId,
    billId,
    invoiceId,
    vendorCreditId,
    customerBankAccountId
} = require('../testConfig');
const BDC = require('../index')(username, password, devKey, env);
const Auth = require('../lib/Auth');
const Payments = require('../lib/Payments');
const SentPayEntity = require('../lib/Entities/SentPayEntity');
const BillPayEntity = require('../lib/Entities/BillPayEntity');
const BillCreditEntity = require('../lib/Entities/BillCreditEntity');
const ReceivedPayEntity = require('../lib/Entities/ReceivedPayEntity');
const InvoicePayEntity = require('../lib/Entities/InvoicePayEntity');

describe('Payments', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
        await BDC.Auth.login(orgId, mfaId, deviceId);
    });

    describe('constructor', () => {
        const payments = new Payments(BDC.Auth);

        it('should instantiate VendorCredit object with an Auth property of an Auth Object instance', () => {
            expect(payments.Auth).toEqual(jasmine.any(Auth));
        });
    });

    describe('payBills', () => {
        it('should return an array containing a SentPay Entity Object with nested BillPay objects', async () => {
            const payment = await BDC.Payments.payBills({
                vendorId,
                billPays: [
                    {
                        billId,
                        amount: 1
                    }
                ]
            });

            expect(payment.sentPays[0]).toEqual(jasmine.any(SentPayEntity));
            expect(payment.sentPays[0].billPays[0]).toEqual(
                jasmine.any(BillPayEntity)
            );
        });

        it('Should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Payments.payBills();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: vendorId, please define vendorId.'
            );

            try {
                await BDC.Payments.payBills({
                    vendorId
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: billPays, please define billPays.'
            );
        });

        it('should return a SentPay Entity Object with nested BillCredit objects', async () => {
            const payment = await BDC.Payments.payBills({
                vendorId,
                billPays: [
                    {
                        billId,
                        amount: 1
                    }
                ],
                options: {
                    billCredits: [
                        {
                            billId,
                            vendorCreditId,
                            amount: 1
                        }
                    ]
                }
            });

            expect(payment.sentPays[0].billCredits[0]).toEqual(
                jasmine.any(BillCreditEntity)
            );
        });

        it('should throw a FailedRequestException if request fails', async () => {
            const fakeVendorId = '00901SZQNDBJSAXN1josx';

            let errorMessage = 'No error thrown.';

            try {
                await BDC.Payments.payBills({
                    vendorId: fakeVendorId,
                    billPays: [
                        {
                            billId,
                            amount: 1
                        }
                    ]
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: vendorId, 00901SZQNDBJSAXN1josx.'
            );
        });
    });

    describe('chargeCustomer', () => {
        it('should return a ReceivedPay Entity Object with nested InvoicePay objects', async () => {
            const payment = await BDC.Payments.chargeCustomer({
                customerId,
                paymentType: '3',
                paymentAccountId: customerBankAccountId,
                invoicePays: [
                    {
                        invoiceId,
                        amount: 1
                    }
                ]
            });

            expect(payment.chargedReceivedPay).toEqual(
                jasmine.any(ReceivedPayEntity)
            );

            expect(payment.chargedReceivedPay.invoicePays[0]).toEqual(
                jasmine.any(InvoicePayEntity)
            );
        });

        it('Should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Payments.chargeCustomer();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: customerId, please define customerId.'
            );

            try {
                await BDC.Payments.chargeCustomer({
                    customerId
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: paymentType, please define paymentType.'
            );

            try {
                await BDC.Payments.chargeCustomer({
                    customerId,
                    paymentType: '3'
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: paymentAccountId, please define paymentAccountId.'
            );

            try {
                await BDC.Payments.chargeCustomer({
                    customerId,
                    paymentType: '3',
                    paymentAccountId: customerBankAccountId
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: invoicePays, please define invoicePays.'
            );
        });

        it('should throw a FailedRequestException if request fails', async () => {
            const fakeInvoiceId = '0cu01GTWXVFCEJWM12lyx';

            let errorMessage = 'No error thrown.';

            try {
                await BDC.Payments.chargeCustomer({
                    customerId,
                    paymentDate: '2019-10-15',
                    paymentType: '3',
                    paymentAccountId: customerBankAccountId,
                    invoicePays: [
                        {
                            invoiceId: fakeInvoiceId,
                            amount: 1
                        }
                    ]
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Invalid Id: 0cu01GTWXVFCEJWM12lyx.');
        });
    });

    describe('getAPSummary', () => {
        it('should return an AP Summary for the account', async () => {
            const apSummary = await BDC.Payments.getAPSummary();

            expect(apSummary.bills).not.toBeUndefined();
            expect(apSummary.approvals).not.toBeUndefined();
        });

        it('should throw a FailedRequestException if request fails', async () => {
            const cookies = BDC.Auth._requestCredentials.cookies;
            BDC.Auth._requestCredentials.cookies = undefined;

            let errorMessage = 'No error thrown.';

            try {
                await BDC.Payments.getAPSummary();
            } catch (error) {
                errorMessage = error.message;
            }

            BDC.Auth._requestCredentials.cookies = cookies;

            expect(errorMessage).toBe('Session is invalid.  Please log in.');
        });
    });

    describe('getARSummary', () => {
        it('should return an AR Summary for the account', async () => {
            const arSummary = await BDC.Payments.getARSummary();

            expect(arSummary.invoices).not.toBeUndefined();
            expect(arSummary.payments).not.toBeUndefined();
        });

        it('should throw a FailedRequestException if request fails', async () => {
            const cookies = BDC.Auth._requestCredentials.cookies;
            BDC.Auth._requestCredentials.cookies = undefined;

            let errorMessage = 'No error thrown.';

            try {
                await BDC.Payments.getARSummary();
            } catch (error) {
                errorMessage = error.message;
            }

            BDC.Auth._requestCredentials.cookies = cookies;

            expect(errorMessage).toBe('Session is invalid.  Please log in.');
        });
    });

    describe('recordAPPayment', () => {
        it('should return a SentPay Entity Object with nested BillPay objects', async () => {
            const apPayment = await BDC.Payments.recordAPPayment({
                vendorId,
                processDate: '2025-10-15',
                toPrintCheck: false,
                billPays: [
                    {
                        billId,
                        amount: 1
                    }
                ]
            });

            expect(apPayment).toEqual(jasmine.any(SentPayEntity));
            expect(apPayment.billPays[0]).toEqual(jasmine.any(BillPayEntity));
        });

        it('should return a SentPay Entity Object with nested BillCredit objects', async () => {
            const apPayment = await BDC.Payments.recordAPPayment({
                vendorId,
                processDate: '2025-10-15',
                toPrintCheck: false,
                billPays: [
                    {
                        billId,
                        amount: 1
                    }
                ],
                options: {
                    billCredits: [
                        {
                            billId,
                            vendorCreditId,
                            amount: 1
                        }
                    ]
                }
            });

            expect(apPayment.billCredits[0]).toEqual(
                jasmine.any(BillCreditEntity)
            );
        });

        it('Should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Payments.recordAPPayment();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: vendorId, please define vendorId.'
            );

            try {
                await BDC.Payments.recordAPPayment({
                    vendorId
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: processDate, please define processDate.'
            );

            try {
                await BDC.Payments.recordAPPayment({
                    vendorId,
                    processDate: '2025-10-15'
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: toPrintCheck, please define toPrintCheck.'
            );

            try {
                await BDC.Payments.recordAPPayment({
                    vendorId,
                    processDate: '2025-10-15',
                    toPrintCheck: false
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: billPays, please define billPays.'
            );
        });

        it('should throw a FailedRequestException if request fails', async () => {
            const fakeVendorId = '00901SZQNDBJSAXN1josx';

            let errorMessage = 'No error thrown.';

            try {
                await BDC.Payments.recordAPPayment({
                    vendorId: fakeVendorId,
                    processDate: '2025-10-15',
                    toPrintCheck: false,
                    billPays: [
                        {
                            billId,
                            amount: 1
                        }
                    ]
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Invalid value for data key,value: vendorId, 00901SZQNDBJSAXN1josx.'
            );
        });
    });

    describe('recordARPayment', () => {
        it('should return a ReceivedPay Entity Object with nested InvoicePay objects', async () => {
            const arPayment = await BDC.Payments.recordARPayment({
                customerId,
                paymentDate: '2025-10-15',
                paymentType: '0',
                amount: 1,
                invoicePays: [
                    {
                        invoiceId,
                        amount: 1
                    }
                ]
            });

            expect(arPayment).toEqual(jasmine.any(ReceivedPayEntity));
            expect(arPayment.invoicePays[0]).toEqual(
                jasmine.any(InvoicePayEntity)
            );
        });

        it('Should throw a MissingRequiredFieldException if a required argument is not passed in', async () => {
            let errorMessage = 'No error thrown.';

            try {
                await BDC.Payments.recordARPayment();
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: customerId, please define customerId.'
            );

            try {
                await BDC.Payments.recordARPayment({
                    customerId
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: paymentDate, please define paymentDate.'
            );

            try {
                await BDC.Payments.recordARPayment({
                    customerId,
                    paymentDate: '2025-10-15'
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: paymentType, please define paymentType.'
            );

            try {
                await BDC.Payments.recordARPayment({
                    customerId,
                    paymentDate: '2025-10-15',
                    paymentType: '3'
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: amount, please define amount.'
            );

            try {
                await BDC.Payments.recordARPayment({
                    customerId,
                    paymentDate: '2025-10-15',
                    paymentType: '3',
                    amount: 1
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Missing required field: invoicePays, please define invoicePays.'
            );
        });

        it('should throw a FailedRequestException if request fails', async () => {
            const fakeInvoiceId = '0cu01GTWXVFCEJWM12lyx';

            let errorMessage = 'No error thrown.';

            try {
                await BDC.Payments.recordARPayment({
                    customerId,
                    paymentDate: '2025-10-15',
                    paymentType: '0',
                    amount: 1,
                    invoicePays: [
                        {
                            invoiceId: fakeInvoiceId,
                            amount: 1
                        }
                    ]
                });
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Invoice is not found.');
        });
    });

    // describe('listPayments', () => {
    //     it('should return an array of SentPay entity objects with nested BillPay entity objects', async () => {
    //         const payments = await BDC.Payments.listPayments({
    //             disbursementStatus: '3',
    //             start: 0,
    //             max: 10
    //         });
    //
    //         expect(payments[0]).toEqual(jasmine.any(SentPayEntity));
    //         expect(payments[0].billPays[0]).toEqual(jasmine.any(BillPayEntity));
    //     });
    // });
});
