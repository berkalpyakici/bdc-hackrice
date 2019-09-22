/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

util.formUrlEncode
- Successfully formUrlEncodes data to be passed up in request bodies

util.parseCookies
- Successfully parses cookies from headers

util.makeRequest
- Successfully fetches session info
- Throw a FailedRequestException if request is unsuccessful

util.readRequest
- should throw an error if an id is not passed in
- Throw a FailedRequestException if request is unsuccessful

util.listRequest
- should return an array of entities
- Throw a FailedRequestException if request is unsuccessful

util.getEntityMetadata
- Should successfully return the metadata for the specified entity
- Throw a FailedRequestException if request is unsuccessful

util.generateNestedEntitiesString
- should return a stringified array of invoiceLineItem json objects
- should return a stringified array of recurringInvoiceLineItem json objects
- should return a stringified array of billLineItem json objects
- should return a stringified array of recurringBillLineItem json objects

util.convertNestedEntitiesToEntityObjects
- should successfully convert an invoiceLineItem json object into an InvoiceLineItemEntity object
- should successfully convert an recurringInvoiceLineItem json object into an RecurringInvoiceLineItemEntity object
- should successfully convert an BillLineItem json object into an BillLineItemEntity object
- should successfully convert an recurringBillLineItem json object into an RecurringBillLineItemEntity object
- should successfully convert an VendorCreditLineItem json object into an VendorCreditLineItemEntity object
- should successfully convert an BillPay json object into an BillPayEntity object
- should successfully convert an BillCredit json object into an BillCreditEntity object
- should successfully convert an InvoicePay json object into an InvoicePayEntity object

util.generateEntityWithNestedEntities
- should successfully convert Invoice JSON object into an InvoiceEntity object
- should successfully convert RecurringInvoice JSON object into an RecurringInvoiceEntity object
- should successfully convert Bill JSON object into an BillEntity object
- should successfully convert RecurringBill JSON object into an RecurringBillEntity object
- should successfully convert VendorCredit JSON object into an VendorCreditEntity object
- should successfully convert SentPay JSON object into an SentPayEntity object
- should successfully convert ReceivedPay JSON object into an ReceivedPayEntity object

util.convertParamsToDataString
- should successfully convert params to a formatted string which can be consumed by our API

*/
const fetch = require('node-fetch');
const { username, password, devKey, env, orgId } = require('../testConfig');
const BDC = require('../../index')(username, password, devKey, env);
const util = require('../lib/util');

const InvoiceEntity = require('../lib/Entities/InvoiceEntity');
const RecurringInvoiceEntity = require('../lib/Entities/RecurringInvoiceEntity');
const BillEntity = require('../lib/Entities/BillEntity');
const RecurringBillEntity = require('../lib/Entities/RecurringBillEntity');
const VendorCreditEntity = require('../lib/Entities/VendorCreditEntity');
const SentPayEntity = require('../lib/Entities/SentPayEntity');
const ReceivedPayEntity = require('../lib/Entities/ReceivedPayEntity');

const InvoiceLineItemEntity = require('../lib/Entities/InvoiceLineItemEntity');
const RecurringInvoiceLineItemEntity = require('../lib/Entities/RecurringInvoiceLineItemEntity');
const BillLineItemEntity = require('../lib/Entities/BillLineItemEntity');
const RecurringBillLineItemEntity = require('../lib/Entities/RecurringBillLineItemEntity');
const VendorCreditLineItemEntity = require('../lib/Entities/VendorCreditLineItemEntity');
const BillPayEntity = require('../lib/Entities/BillPayEntity');
const BillCreditEntity = require('../lib/Entities/BillCreditEntity');
const InvoicePayEntity = require('../lib/Entities/InvoicePayEntity');

describe('util', () => {
    beforeAll(async () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
        await BDC.Auth.login(orgId);
    });

    describe('formUrlEncode method', () => {
        it('should successfully formUrlEncode the data passed in', async () => {
            const encodedCredentials = util.formUrlEncode(
                BDC.Auth._requestCredentials
            );

            const params = {
                method: 'post',
                body: encodedCredentials,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Cookie: BDC.Auth._requestCredentials.cookies
                }
            };

            let json;

            // test if data is properly encoded. If it is, login should be successful
            try {
                const res = await fetch(
                    'https://app-sandbox.bill.com/api/v2/GetSessionInfo.json',
                    params
                );

                json = await res.json();
            } catch (error) {
                console.log(error);
            }

            expect(json.response_data.userId).not.toBeUndefined();
        });
    });

    describe('parseCookies method', () => {
        it('should successfully parse the sessionId from cookies', async () => {
            const parsedCookies = util.parseCookies([
                'exputc=; path=/;; secure; expires=thisisanexpirationdate',
                'expurl=; path=/;; secure; expires=thisisanexpirationdate',
                'expredurl=; path=/;; secure; expires=thisisanexpirationdate',
                'sid=thisisasamplesessionid; path=/; HTTPOnly; secure',
                'pageuid=thisisasamplepageuid; path=/; HTTPOnly; secure',
                'un_csrf=thisisasampleun_cserf; path=/;; secure',
                'un_csrf=; domain=thisisadomain; path=/;; ' +
                    'secure; expires=thisisadateofexpiration ' +
                    'GMT'
            ]);

            expect(parsedCookies).toEqual(
                'exputc=;expurl=;expredurl=;sid=thisisasamplesessionid;pageuid=thisisasamplepageuid;un_csrf=thisisasampleun_cserf;un_csrf='
            );
        });
    });

    describe('makeRequest method', () => {
        it('should successfully make a request', async () => {
            const res = await util.makeRequest(
                'https://app-sandbox.bill.com/api/v2/GetSessionInfo.json',
                BDC.Auth._requestCredentials
            );

            expect(res.data.organizationId).not.toBeUndefined();
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            BDC.Auth._requestCredentials.devKey = undefined;

            let errorMessage = 'No error thrown.';

            try {
                await util.makeRequest(
                    'https://app-sandbox.bill.com/api/v2/GetSessionInfo.json',
                    BDC.Auth._requestCredentials
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Developer key must be specified.');

            // reset the BDC.Auth._requestCredentials.devKey to its original value
            BDC.Auth._requestCredentials.devKey = devKey;
        });
    });

    describe('getEntityMetadata method', () => {
        it('should successfully fetch entity metadata', async () => {
            const metadata = await util.getEnitityMetadata('Vendor', BDC.Auth);
            expect(metadata.fields.id.entity).toEqual('Vendor');
        });

        it('should throw a FailedRequestException if request is unsuccessful', async () => {
            BDC.Auth._requestCredentials.devKey = undefined;

            let errorMessage = 'No error thrown.';

            try {
                await util.getEnitityMetadata('Vendor', BDC.Auth);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe('Developer key must be specified.');

            // reset the BDC.Auth._requestCredentials.devKey to its original value
            BDC.Auth._requestCredentials.devKey = devKey;
        });
    });

    describe('generateNestedEntitiesString method', () => {
        it('should return a stringified array of invoiceLineItem json objects', async () => {
            const invoiceLineItemJSON = [
                {
                    entity: 'InvoiceLineItem',
                    itemId: '00000000000000000000',
                    quantity: 2,
                    amount: null,
                    price: null,
                    ratePercent: null,
                    chartOfAccountId: '00000000000000000000',
                    departmentId: '00000000000000000000',
                    locationId: '00000000000000000000',
                    actgClassId: '00000000000000000000',
                    jobId: '00000000000000000000',
                    description: '',
                    taxable: false,
                    taxCode: ''
                }
            ];

            const exampleString = `[{
                "entity": "InvoiceLineItem",
                "itemId":"00000000000000000000",
                "quantity":2,
                "amount":null,
                "price":null,
                "ratePercent":null,
                "chartOfAccountId":"00000000000000000000",
                "departmentId":"00000000000000000000",
                "locationId":"00000000000000000000",
                "actgClassId":"00000000000000000000",
                "jobId":"00000000000000000000",
                "description":"",
                "taxable":false,
                "taxCode":""
            }]`;

            const stringifiedJSON = util.generateNestedEntitiesString(
                invoiceLineItemJSON
            );

            // use regex to remove all white space from strings so they may equal one another
            expect(stringifiedJSON.replace(/\s/g, '')).toEqual(
                exampleString.replace(/\s/g, '')
            );
        });

        it('should return a stringified array of recurringInvoiceLineItem json objects', async () => {
            const recurringInvoiceLineItemJSON = [
                {
                    entity: 'RecurringInvoiceLineItem',
                    id: 'xxxxxxxxxxxxxxxxxxxxx',
                    departmentId: '00000000000000000000',
                    locationId: '00000000000000000000',
                    actgClassId: '00000000000000000000',
                    jobId: '00000000000000000000',
                    description: '',
                    recurringInvoiceId: 'xxxxxxxxxxxxxxxxxxxxx',
                    itemId: '00000000000000000000',
                    amount: null,
                    quantity: 1,
                    price: null,
                    ratePercent: null,
                    taxable: false
                }
            ];

            const exampleString = `[
                {
                    "entity":"RecurringInvoiceLineItem",
                    "id":"xxxxxxxxxxxxxxxxxxxxx",
                    "departmentId":"00000000000000000000",
                    "locationId":"00000000000000000000",
                    "actgClassId":"00000000000000000000",
                    "jobId":"00000000000000000000",
                    "description":"",
                    "recurringInvoiceId":"xxxxxxxxxxxxxxxxxxxxx",
                    "itemId":"00000000000000000000",
                    "amount":null,
                    "quantity":1,
                    "price":null,
                    "ratePercent":null,
                    "taxable":false
                }
            ]`;

            const stringifiedJSON = util.generateNestedEntitiesString(
                recurringInvoiceLineItemJSON
            );

            // use regex to remove all white space from strings so they may equal one another
            expect(stringifiedJSON.replace(/\s/g, '')).toEqual(
                exampleString.replace(/\s/g, '')
            );
        });

        it('should return a stringified array of billLineItem json objects', async () => {
            const billLineItemJSON = [
                {
                    entity: 'BillLineItem',
                    amount: 1189.99,
                    chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                    departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                    locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                    jobId: 'xxxxxxxxxxxxxxxxxxxxx',
                    customerId: 'xxxxxxxxxxxxxxxxxxxxx',
                    jobBillable: true,
                    description: '',
                    itemId: 'xxxxxxxxxxxxxxxxxxxxx',
                    quantity: 1,
                    unitPrice: 1189.99,
                    employeeId: 'xxxxxxxxxxxxxxxxxxxxx',
                    actgClassId: 'xxxxxxxxxxxxxxxxxxxxx'
                }
            ];

            const exampleString = `[{
                "entity" : "BillLineItem",
                "amount" : 1189.99,
                "chartOfAccountId" : "xxxxxxxxxxxxxxxxxxxxx",
                "departmentId" : "xxxxxxxxxxxxxxxxxxxxx",
                "locationId" : "xxxxxxxxxxxxxxxxxxxxx",
                "jobId" : "xxxxxxxxxxxxxxxxxxxxx",
                "customerId" : "xxxxxxxxxxxxxxxxxxxxx",
                "jobBillable" : true,
                "description" : "",
                "itemId" : "xxxxxxxxxxxxxxxxxxxxx",
                "quantity" : 1,
                "unitPrice" : 1189.99,
                "employeeId" : "xxxxxxxxxxxxxxxxxxxxx",
                "actgClassId" : "xxxxxxxxxxxxxxxxxxxxx"
            }]`;

            const stringifiedJSON = util.generateNestedEntitiesString(
                billLineItemJSON
            );

            // use regex to remove all white space from strings so they may equal one another
            expect(stringifiedJSON.replace(/\s/g, '')).toEqual(
                exampleString.replace(/\s/g, '')
            );
        });

        it('should return a stringified array of recurringBillLineItem json objects', async () => {
            const recurringBillLineItemJSON = [
                {
                    entity: 'RecurringBillLineItem',
                    amount: 350,
                    chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                    departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                    locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                    description: ''
                }
            ];
            const exampleString = `[{
                "entity" : "RecurringBillLineItem",
                "amount" : 350,
                "chartOfAccountId" : "xxxxxxxxxxxxxxxxxxxxx",
                "departmentId" : "xxxxxxxxxxxxxxxxxxxxx",
                "locationId" : "xxxxxxxxxxxxxxxxxxxxx",
                "description" : ""
            }]`;

            const stringifiedJSON = util.generateNestedEntitiesString(
                recurringBillLineItemJSON
            );

            // use regex to remove all white space from strings so they may equal one another
            expect(stringifiedJSON.replace(/\s/g, '')).toEqual(
                exampleString.replace(/\s/g, '')
            );
        });
    });

    describe('convertNestedEntitiesToEntityObjects method', () => {
        it('should successfully convert an invoiceLineItem json object into an InvoiceLineItemEntity object', async () => {
            const invoiceLineItemsJSON = [
                {
                    entity: 'InvoiceLineItem',
                    id: 'xxxxxxxxxxxxxxxxxxxxx',
                    createdTime: '2019-08-21T18:24:28.000+0000',
                    updatedTime: '2019-08-21T18:24:28.000+0000',
                    invoiceId: 'xxxxxxxxxxxxxxxxxxxxx',
                    itemId: '00000000000000000000',
                    quantity: 2,
                    amount: null,
                    price: null,
                    ratePercent: null,
                    chartOfAccountId: '00000000000000000000',
                    departmentId: '00000000000000000000',
                    locationId: '00000000000000000000',
                    actgClassId: '00000000000000000000',
                    jobId: '00000000000000000000',
                    description: null,
                    taxable: false,
                    taxCode: 'Non'
                }
            ];

            const invoiceLineItems = util.convertNestedEntitiesToEntityObjects(
                invoiceLineItemsJSON,
                'InvoiceLineItem'
            );

            expect(invoiceLineItems[0]).toEqual(
                jasmine.any(InvoiceLineItemEntity)
            );
        });

        it('should successfully convert an recurringInvoiceLineItem json object into an RecurringInvoiceLineItemEntity object', async () => {
            const recurringInvoiceLineItemsJSON = [
                {
                    entity: 'RecurringInvoiceLineItem',
                    id: 'xxxxxxxxxxxxxxxxxxxxx',
                    departmentId: '00000000000000000000',
                    locationId: '00000000000000000000',
                    actgClassId: '00000000000000000000',
                    jobId: '00000000000000000000',
                    description: null,
                    recurringInvoiceId: 'xxxxxxxxxxxxxxxxxxxxx',
                    itemId: '00000000000000000000',
                    amount: null,
                    quantity: 1,
                    price: null,
                    ratePercent: null,
                    taxable: false,
                    createdTime: '2019-08-21T21:25:32.000+0000',
                    updatedTime: '2019-08-21T21:25:32.000+0000'
                }
            ];

            const recurringInvoiceLineItems = util.convertNestedEntitiesToEntityObjects(
                recurringInvoiceLineItemsJSON,
                'RecurringInvoiceLineItem'
            );

            expect(recurringInvoiceLineItems[0]).toEqual(
                jasmine.any(RecurringInvoiceLineItemEntity)
            );
        });

        it('should successfully convert an billLineItem json object into an BillLineItemEntity object', async () => {
            const billLineItemsJSON = [
                {
                    entity: 'BillLineItem',
                    amount: 1189.99,
                    chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                    departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                    locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                    jobId: 'xxxxxxxxxxxxxxxxxxxxx',
                    customerId: 'xxxxxxxxxxxxxxxxxxxxx',
                    jobBillable: true,
                    description: '',
                    itemId: 'xxxxxxxxxxxxxxxxxxxxx',
                    quantity: 1,
                    unitPrice: 1189.99,
                    employeeId: 'xxxxxxxxxxxxxxxxxxxxx',
                    actgClassId: 'xxxxxxxxxxxxxxxxxxxxx'
                }
            ];

            const billLineItems = util.convertNestedEntitiesToEntityObjects(
                billLineItemsJSON,
                'BillLineItem'
            );

            expect(billLineItems[0]).toEqual(jasmine.any(BillLineItemEntity));
        });

        it('should successfully convert a recurringBillLineItem json object into an RecurringBillLineItemEntity object', async () => {
            const recurringBillLineItemsJSON = [
                {
                    entity: 'RecurringBillLineItem',
                    amount: 350.0,
                    chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                    departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                    locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                    description: ''
                }
            ];

            const recurringBillLineItems = util.convertNestedEntitiesToEntityObjects(
                recurringBillLineItemsJSON,
                'RecurringBillLineItem'
            );

            expect(recurringBillLineItems[0]).toEqual(
                jasmine.any(RecurringBillLineItemEntity)
            );
        });

        it('should successfully convert a vendorCreditLineItem json object into an VendorCreditLineItemEntity object', async () => {
            const vendorCreditLineItemsJSON = [
                {
                    entity: 'VendorCreditLineItem',
                    amount: 100.0,
                    chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                    departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                    locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                    jobId: 'xxxxxxxxxxxxxxxxxxxxx',
                    customerId: 'xxxxxxxxxxxxxxxxxxxxx',
                    jobBillable: true,
                    description: 'Vocal machine',
                    itemId: 'xxxxxxxxxxxxxxxxxxxxx',
                    quantity: 1,
                    unitPrice: 200.0,
                    employeeId: 'xxxxxxxxxxxxxxxxxxxxx',
                    actgClassId: 'xxxxxxxxxxxxxxxxxxxxx'
                }
            ];

            const vendorCreditLineItems = util.convertNestedEntitiesToEntityObjects(
                vendorCreditLineItemsJSON,
                'VendorCreditLineItem'
            );

            expect(vendorCreditLineItems[0]).toEqual(
                jasmine.any(VendorCreditLineItemEntity)
            );
        });

        it('should successfully convert a billPay json object into an BillPayEntity object', async () => {
            const billPaysJSON = [
                {
                    entity: 'BillPay',
                    id: 'xxxxxxxxxxxxxxxxxxxxx',
                    billId: 'xxxxxxxxxxxxxxxxxxxxx',
                    name: 'xxxxxxxxxxxxxxxxxxxxx',
                    paymentStatus: '1',
                    amount: 985.0,
                    description: 'Inv #July 2016',
                    processDate: '2016-11-27',
                    createdTime: '2016-11-24T08:33:44.000+0000',
                    updatedTime: '2016-11-24T08:33:44.000+0000',
                    syncReference: null,
                    toPrintCheck: false,
                    chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                    sentPayId: 'xxxxxxxxxxxxxxxxxxxxx',
                    allowExport: true
                }
            ];

            const billPays = util.convertNestedEntitiesToEntityObjects(
                billPaysJSON,
                'BillPay'
            );

            expect(billPays[0]).toEqual(jasmine.any(BillPayEntity));
        });

        it('should successfully convert a billCredit json object into an BillCreditEntity object', async () => {
            const billCreditsJSON = [
                {
                    entity: 'BillCredit',
                    id: 'xxxxxxxxxxxxxxxxxxxxx',
                    billId: 'xxxxxxxxxxxxxxxxxxxxx',
                    sentPayId: 'xxxxxxxxxxxxxxxxxxxxx',
                    vendorCreditId: 'xxxxxxxxxxxxxxxxxxxxx',
                    amount: 10.0,
                    createdTime: '2016-11-24T08:33:40.000+0000',
                    updatedTime: '2016-11-24T08:33:44.000+0000'
                }
            ];

            const billCredits = util.convertNestedEntitiesToEntityObjects(
                billCreditsJSON,
                'BillCredit'
            );

            expect(billCredits[0]).toEqual(jasmine.any(BillCreditEntity));
        });

        it('should successfully convert a invoicePay json object into an InvoicePayEntity object', async () => {
            const invoicePaysJSON = [
                {
                    entity: 'InvoicePay',
                    id: 'xxxxxxxxxxxxxxxxxxxxx',
                    invoiceId: 'xxxxxxxxxxxxxxxxxxxxx',
                    amount: 100.0,
                    description: 'Brass Ring Washers',
                    createdTime: '2016-11-19T23:07:21.000+0000',
                    updatedTime: '2016-11-19T23:07:21.000+0000'
                }
            ];

            const invoicePays = util.convertNestedEntitiesToEntityObjects(
                invoicePaysJSON,
                'InvoicePay'
            );

            expect(invoicePays[0]).toEqual(jasmine.any(InvoicePayEntity));
        });
    });

    describe('generateEntityWithNestedEntities method', () => {
        it('should successfully convert Invoice JSON object into an InvoiceEntity object', async () => {
            const invoiceJSON = {
                entity: 'Invoice',
                id: 'xxxxxxxxxxxxxxxxxxxxx',
                isActive: '1',
                createdTime: '2016-12-12T15:38:32.000+0000',
                updatedTime: '2016-12-12T15:38:32.000+0000',
                customerId: 'xxxxxxxxxxxxxxxxxxxxx',
                invoiceNumber: '1950',
                invoiceDate: '2016-12-12',
                dueDate: '2016-12-19',
                glPostingDate: '2016-12-12',
                amount: 2600.0,
                amountDue: 2600.0,
                paymentStatus: '1',
                description: 'Purchase of musical instruments & tools',
                poNumber: 'PO1818',
                isToBePrinted: true,
                isToBeEmailed: true,
                lastSentTime: null,
                itemSalesTax: '00000000000000000000',
                salesTaxPercentage: 0,
                salesTaxTotal: 0.0,
                terms: 'Net 15',
                salesRep: 'George',
                FOB: null,
                shipDate: '2016-12-20',
                shipMethod: null,
                departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                actgClassId: 'xxxxxxxxxxxxxxxxxxxxx',
                jobId: 'xxxxxxxxxxxxxxxxxxxxx',
                payToBankAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                payToChartOfAccountId: '00000000000000000000',
                invoiceLineItems: [
                    {
                        entity: 'InvoiceLineItem',
                        id: 'xxxxxxxxxxxxxxxxxxxxx',
                        createdTime: '2016-12-12T15:38:32.000+0000',
                        updatedTime: '2016-12-12T15:38:32.000+0000',
                        invoiceId: 'xxxxxxxxxxxxxxxxxxxxx',
                        itemId: 'xxxxxxxxxxxxxxxxxxxxx',
                        quantity: 3,
                        amount: 1800.0,
                        price: 600.0,
                        ratePercent: null,
                        chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                        departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                        locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                        actgClassId: 'xxxxxxxxxxxxxxxxxxxxx',
                        jobId: 'xxxxxxxxxxxxxxxxxxxxx',
                        description: 'Back up Vocal Machines',
                        taxable: false,
                        taxCode: 'Non'
                    }
                ]
            };

            const metadata = {
                fields: {
                    id: {
                        readonly: true,
                        required: false,
                        type: 'IdField',
                        entity: 'Invoice',
                        label: 'Id'
                    }
                }
            };

            const invoice = util.generateEntityWithNestedEntities(
                'Invoice',
                metadata,
                invoiceJSON
            );

            expect(invoice).toEqual(jasmine.any(InvoiceEntity));
        });

        it('should successfully convert RecurringInvoice JSON object into an RecurringInvoiceEntity object', async () => {
            const recurringInvoiceJSON = {
                entity: 'RecurringInvoice',
                isActive: '1',
                customerId: 'xxxxxxxxxxxxxxxxxxxxx',
                poNumber: '4555',
                salesRep: 'George Smith',
                departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                actgClassId: 'xxxxxxxxxxxxxxxxxxxxx',
                jobId: 'xxxxxxxxxxxxxxxxxxxxx',
                itemSalesTax: '00000000000000000000',
                description: 'Please pay soonest.',
                isToBePrinted: true,
                isToBeEmailed: true,
                isToBeAutoEmailed: true,
                isToBeAutoMailed: false,
                fromUserId: 'xxxxxxxxxxxxxxxxxxxxx',
                timePeriod: '2',
                frequencyPerTimePeriod: 1,
                nextDueDate: '2017-01-02',
                endDate: '2018-01-01',
                daysInAdvance: 10,
                recurringInvoiceLineItems: [
                    {
                        entity: 'RecurringInvoiceLineItem',
                        id: 'xxxxxxxxxxxxxxxxxxxxx',
                        departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                        locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                        actgClassId: 'xxxxxxxxxxxxxxxxxxxxx',
                        jobId: 'xxxxxxxxxxxxxxxxxxxxx',
                        description: 'Rent at Building',
                        recurringInvoiceId: 'xxxxxxxxxxxxxxxxxxxxx',
                        itemId: 'xxxxxxxxxxxxxxxxxxxxx',
                        amount: 300.0,
                        quantity: 1,
                        price: 300.0,
                        ratePercent: null,
                        taxable: false
                    }
                ]
            };

            const metadata = {
                fields: {
                    id: {
                        readonly: true,
                        required: false,
                        type: 'IdField',
                        entity: 'RecurringInvoice',
                        label: 'Id'
                    }
                }
            };

            const recurringInvoice = util.generateEntityWithNestedEntities(
                'RecurringInvoice',
                metadata,
                recurringInvoiceJSON
            );

            expect(recurringInvoice).toEqual(
                jasmine.any(RecurringInvoiceEntity)
            );
        });

        it('should successfully convert Bill JSON object into an BillEntity object', async () => {
            const billJSON = {
                entity: 'Bill',
                isActive: '1',
                vendorId: 'xxxxxxxxxxxxxxxxxxxxx',
                invoiceNumber: '14800',
                invoiceDate: '2016-12-05',
                dueDate: '2016-12-05',
                glPostingDate: '2016-12-05',
                description: 'Purchase for a new band',
                poNumber: '1122',
                billLineItems: [
                    {
                        entity: 'BillLineItem',
                        amount: 1189.99,
                        chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                        departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                        locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                        jobId: 'xxxxxxxxxxxxxxxxxxxxx',
                        customerId: 'xxxxxxxxxxxxxxxxxxxxx',
                        jobBillable: true,
                        description: '',
                        itemId: 'xxxxxxxxxxxxxxxxxxxxx',
                        quantity: 1,
                        unitPrice: 1189.99,
                        employeeId: 'xxxxxxxxxxxxxxxxxxxxx',
                        actgClassId: 'xxxxxxxxxxxxxxxxxxxxx'
                    }
                ]
            };

            const metadata = {
                fields: {
                    id: {
                        readonly: true,
                        required: false,
                        type: 'IdField',
                        entity: 'Bill',
                        label: 'Id'
                    }
                }
            };

            const bill = util.generateEntityWithNestedEntities(
                'Bill',
                metadata,
                billJSON
            );

            expect(bill).toEqual(jasmine.any(BillEntity));
        });

        it('should successfully convert RecurringBill JSON object into an RecurringBillEntity object', async () => {
            const recurringBillJSON = {
                entity: 'RecurringBill',
                isActive: '1',
                vendorId: 'xxxxxxxxxxxxxxxxxxxxx',
                timePeriod: '2',
                frequencyPerTimePeriod: 1,
                nextDueDate: '2017-01-05',
                endDate: '2017-12-05',
                daysInAdvance: 1,
                description: 'Services and deliveries.',
                recurringBillLineItems: [
                    {
                        entity: 'RecurringBillLineItem',
                        amount: 350.0,
                        chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                        departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                        locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                        description: ''
                    }
                ]
            };

            const metadata = {
                fields: {
                    id: {
                        readonly: true,
                        required: false,
                        type: 'IdField',
                        entity: 'RecurringBill',
                        label: 'id'
                    }
                }
            };

            const recurringBill = util.generateEntityWithNestedEntities(
                'RecurringBill',
                metadata,
                recurringBillJSON
            );

            expect(recurringBill).toEqual(jasmine.any(RecurringBillEntity));
        });

        it('should successfully convert VendorCreditEntity JSON object into an VendorCreditEntity object', async () => {
            const vendorCreditEntityJSON = {
                entity: 'VendorCredit',
                vendorId: 'xxxxxxxxxxxxxxxxxxxxx',
                refNumber: '1234',
                creditDate: '2016-12-05',
                glPostingDate: '2016-12-05',
                description: 'Returned musical Toys',
                poNumber: '1234',
                applyToBankAccountId: 'bac01OOZNCHMLQNK8naj',
                applyToChartOfAccountId: '',
                vendorCreditLineItems: [
                    {
                        entity: 'VendorCreditLineItem',
                        amount: 100.0,
                        chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                        departmentId: 'xxxxxxxxxxxxxxxxxxxxx',
                        locationId: 'xxxxxxxxxxxxxxxxxxxxx',
                        jobId: 'xxxxxxxxxxxxxxxxxxxxx',
                        customerId: 'xxxxxxxxxxxxxxxxxxxxx',
                        jobBillable: true,
                        description: 'Vocal machine',
                        itemId: 'xxxxxxxxxxxxxxxxxxxxx',
                        quantity: 1,
                        unitPrice: 200.0,
                        employeeId: 'xxxxxxxxxxxxxxxxxxxxx',
                        actgClassId: 'xxxxxxxxxxxxxxxxxxxxx'
                    }
                ]
            };

            const metadata = {
                fields: {
                    id: {
                        readonly: true,
                        required: false,
                        type: 'IdField',
                        entity: 'VendorCreditEntity',
                        label: 'id'
                    }
                }
            };

            const vendorCreditEntity = util.generateEntityWithNestedEntities(
                'VendorCredit',
                metadata,
                vendorCreditEntityJSON
            );

            expect(vendorCreditEntity).toEqual(jasmine.any(VendorCreditEntity));
        });

        it('should successfully convert SentPay JSON object into an SentPayEntity object', async () => {
            const snetPayJSON = {
                entity: 'SentPay',
                id: 'xxxxxxxxxxxxxxxxxxxxx',
                processDate: '2016-11-27',
                amount: 985.0,
                status: '1',
                description: 'Inv #July 2016',
                txnNumber: 'xxxxxxxxxxxxxxxxxxxxx',
                name: 'xxxxxxxxxxxxxxxxxxxxx',
                vendorId: 'xxxxxxxxxxxxxxxxxxxxx',
                isOnline: true,
                chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                syncReference: null,
                toPrintCheck: false,
                createdTime: '2016-11-24T08:33:44.000+0000',
                updatedTime: '2016-11-24T08:33:44.000+0000',
                bankAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                needAttnReviewed: false,
                source: '0',
                billPays: [
                    {
                        entity: 'BillPay',
                        id: 'xxxxxxxxxxxxxxxxxxxxx',
                        billId: 'xxxxxxxxxxxxxxxxxxxxx',
                        name: 'xxxxxxxxxxxxxxxxxxxxx',
                        paymentStatus: '1',
                        amount: 985.0,
                        description: 'Inv #July 2012',
                        processDate: '2012-11-27',
                        createdTime: '2016-11-24T08:33:44.000+0000',
                        updatedTime: '2016-11-24T08:33:44.000+0000',
                        syncReference: null,
                        toPrintCheck: false,
                        chartOfAccountId: 'xxxxxxxxxxxxxxxxxxxxx'
                    }
                ]
            };

            const metadata = {
                fields: {
                    id: {
                        readonly: true,
                        required: false,
                        type: 'IdField',
                        entity: 'SentPay',
                        label: 'id'
                    }
                }
            };

            const sentPay = util.generateEntityWithNestedEntities(
                'SentPay',
                metadata,
                snetPayJSON
            );

            expect(sentPay).toEqual(jasmine.any(SentPayEntity));
        });

        it('should successfully convert ReceivedPay JSON object into an ReceivedPayEntity object', async () => {
            const receivedPayJSON = {
                entity: 'ReceivedPay',
                id: 'xxxxxxxxxxxxxxxxxxxxx',
                createdTime: '2016-11-19T23:07:20.000+0000',
                updatedTime: '2016-11-19T23:07:21.000+0000',
                customerId: '0cu01IYYXIMNXSPN4fyw',
                status: '0',
                paymentDate: '2016-11-19',
                depositToAccountId: 'xxxxxxxxxxxxxxxxxxxxx',
                isOnline: false,
                paymentType: '1',
                amount: 200.0,
                description: 'Various Ring Washers',
                refNumber: '123',
                convFeeAmount: 0.0,
                rPConvFee: [{}],
                invoicePays: [
                    {
                        entity: 'InvoicePay',
                        id: 'xxxxxxxxxxxxxxxxxxxxx',
                        invoiceId: 'xxxxxxxxxxxxxxxxxxxxx',
                        amount: 100.0,
                        description: 'Brass Ring Washers',
                        createdTime: '2016-11-19T23:07:21.000+0000',
                        updatedTime: '2016-11-19T23:07:21.000+0000'
                    }
                ]
            };

            const metadata = {
                fields: {
                    id: {
                        readonly: true,
                        required: false,
                        type: 'IdField',
                        entity: 'ReceivedPay',
                        label: 'id'
                    }
                }
            };

            const receivedPay = util.generateEntityWithNestedEntities(
                'ReceivedPay',
                metadata,
                receivedPayJSON
            );

            expect(receivedPay).toEqual(jasmine.any(ReceivedPayEntity));
        });
    });

    describe('generateEntityWithNestedEntities method', () => {
        it('should successfully convert an object into a formatted string which can be consumed by the API', async () => {
            let params = {
                vendorId: 'xxxxxxxxxxxxxxxxxxxxx',
                billPays: [
                    {
                        billId: 'xxxxxxxxxxxxxxxxxxxxx',
                        amount: 1
                    }
                ]
            };

            let optionalParams = {
                processDate: '',
                billCredits: []
            };

            let dataString = util.convertParamsToDataString(
                params,
                optionalParams,
                '',
                true
            );

            expect(dataString).toEqual(
                '{"vendorId": "xxxxxxxxxxxxxxxxxxxxx","billPays": [{"billId": "xxxxxxxxxxxxxxxxxxxxx","amount": 1}]}'
            );

            params = {
                customerId: 'xxxxxxxxxxxxxxxxxxxxx',
                nameOnAccount: 'test account',
                routingNumber: '322271627',
                accountNumber: '1234567890',
                agreedWithTOS: true
            };

            optionalParams = {
                isActive: '1',
                nickname: '',
                isLockedByOrg: false,
                isSavings: false,
                isPersonalAcct: false,
                isWrittenAuth: true
            };

            dataString = util.convertParamsToDataString(
                params,
                optionalParams,
                'CustomerBankAccount'
            );

            expect(dataString).toEqual(
                '{"obj": { "entity": "CustomerBankAccount","customerId": "xxxxxxxxxxxxxxxxxxxxx","nameOnAccount": "test account","routingNumber": "322271627","accountNumber": "1234567890"},"agreedWithTOS": true}'
            );
        });
    });
});
