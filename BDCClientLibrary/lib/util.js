/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const formUrlEncoded = require('form-urlencoded').default;
const fetch = require('node-fetch');

// entities
const InvoiceEntity = require('./Entities/InvoiceEntity');
const RecurringInvoiceEntity = require('./Entities/RecurringInvoiceEntity');
const BillEntity = require('./Entities/BillEntity');
const RecurringBillEntity = require('./Entities/RecurringBillEntity');
const VendorCreditEntity = require('./Entities/VendorCreditEntity');
const SentPayEntity = require('./Entities/SentPayEntity');
const ReceivedPayEntity = require('./Entities/ReceivedPayEntity');

// nested entities
const InvoiceLineItemEntity = require('./Entities/InvoiceLineItemEntity');
const RecurringInvoiceLineItemEntity = require('./Entities/RecurringInvoiceLineItemEntity');
const BillLineItemEntity = require('./Entities/BillLineItemEntity');
const RecurringBillLineItemEntity = require('./Entities/RecurringBillLineItemEntity');
const VendorCreditLineItem = require('./Entities/VendorCreditLineItemEntity');
const BillPayEntity = require('./Entities/BillPayEntity');
const BillCreditEntity = require('./Entities/BillCreditEntity');
const InvoicePayEntity = require('./Entities/InvoicePayEntity');

const FailedRequestException = require('./Exceptions/FailedRequestException');

const util = {
    // wrapping the from-urlencoded npm module
    formUrlEncode: data => formUrlEncoded(data),

    // function is expecting an array of cookies (strings)
    parseCookies: cookies => {
        if (cookies) {
            return cookies
                .map(entry => {
                    const parts = entry.split(';');
                    const cookiePart = parts[0];
                    return cookiePart;
                })
                .join(';');
        }
    },

    makeRequest: async (url, credentials, data = {}) => {
        // initialize formUrlEncoded data & credentials to set on params object
        const encodedData = module.exports.formUrlEncode(data);
        const encodedCredentials = module.exports.formUrlEncode(credentials);

        // initialize params for request
        /* given a quirk of the formUrlEncoding library with how nested our request bodies are 
        and what our API is expecting, it is necessary to ad the '&' between data and credentials */
        const params = {
            method: 'post',
            body: `${encodedData}&${encodedCredentials}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: credentials.cookies
            }
        };

        // send request and assign response to variable
        const res = await fetch(url, params);

        let parsedCookies;

        /* if the credentials object does not include cookies, then 
            pull cookies off of request, parse them, and then assign 
            parsed cookies to variable to be returned, so they may be 
            set on the Auth class instance */
        if (!credentials.cookie) {
            const cookies = res.headers.raw()['set-cookie'];
            parsedCookies = module.exports.parseCookies(cookies);
        }

        const json = await res.json();

        /* BDC api always returns http status code 200, so if the request 
            failed you must check the error message. In the event the request 
            failed then throw exception */
        if (json.response_status === 1) {
            throw new FailedRequestException(json);
        }

        // initialize response data object to be returned
        const responseData = {
            data: json.response_data
        };

        /* parsedCookies only has a value when using the login method. 
            Therefore we only add parsedCookies into the responsedata object
            on login so the cookies can be set on the Auth Object instance */
        if (parsedCookies) {
            responseData.cookies = parsedCookies;
        }

        return responseData;
    },

    // shared logic for read requests
    readRequest: async (id, Auth, entity) => {
        const credentials = Auth._requestCredentials;

        const data = {
            data: `{
                "id": "${id}"
            }`
        };

        const res = await module.exports.makeRequest(
            `${Auth.env}/Crud/Read/${entity}.json`,
            credentials,
            data
        );

        return res;
    },

    /* shared logic for list requests- if no specifications are passed in, by default we only request up to 
    100 entities with no filters, unsorted, & including nested fields */
    listRequest: async (Auth, entity, params) => {
        const credentials = Auth._requestCredentials;

        const defaults = {
            nested: true,
            start: 0,
            max: 99,
            filters: [],
            sort: []
        };

        const optionalParams = Object.assign({}, defaults, params);

        const dataString = util.convertParamsToDataString(
            optionalParams,
            {},
            this.entity,
            true
        );

        const data = {
            data: dataString
        };

        const res = await module.exports.makeRequest(
            `${Auth.env}/List/${entity}.json`,
            credentials,
            data
        );

        return res;
    },

    // method which hits the listOrgs endpoint, providing a list of orgs associated with the provided credentials
    getEnitityMetadata: async (entity, Auth) => {
        const data = {
            data: `{
                "entity": ["${entity}"]
            }`
        };

        const res = await module.exports.makeRequest(
            `${Auth.env}/GetEntityMetadata.json`,
            Auth._requestCredentials,
            data
        );

        return res.data[`${entity}`];
    },

    // function which takes an array of nested entities and generates the string to be injected into request body
    generateNestedEntitiesString: nestedEntities => {
        let nestedEntitiesString = '[';

        // iterate over nestedEntities convert json to formatted string and at them to nestedEntitiesString
        nestedEntities.forEach((lineItem, i) => {
            const dataString = module.exports.convertParamsToDataString(
                lineItem,
                {},
                lineItem.entity,
                true
            );

            // add formatted string to nestedEntitiesString
            nestedEntitiesString += dataString;

            // As long as this is the final element in the array, add a comma
            if (i !== nestedEntities.length - 1) {
                nestedEntitiesString += ',';
            }
        });

        // add closing bracket
        nestedEntitiesString += ']';

        return nestedEntitiesString;
    },

    /* function which takes an array of entites json from an API response and converts 
    the entities into the appropriate entity object */
    convertNestedEntitiesToEntityObjects: (nestedEntities, entity) => {
        const convertedEntities = [];
        nestedEntities.forEach(nestedEntity => {
            let convertedEntity;

            switch (entity) {
                case 'InvoiceLineItem':
                    convertedEntity = new InvoiceLineItemEntity(nestedEntity);
                    break;

                case 'RecurringInvoiceLineItem':
                    convertedEntity = new RecurringInvoiceLineItemEntity(
                        nestedEntity
                    );
                    break;

                case 'BillLineItem':
                    convertedEntity = new BillLineItemEntity(nestedEntity);
                    break;

                case 'RecurringBillLineItem':
                    convertedEntity = new RecurringBillLineItemEntity(
                        nestedEntity
                    );
                    break;

                case 'VendorCreditLineItem':
                    convertedEntity = new VendorCreditLineItem(nestedEntity);
                    break;

                case 'BillPay':
                    convertedEntity = new BillPayEntity(nestedEntity);
                    break;

                case 'BillCredit':
                    convertedEntity = new BillCreditEntity(nestedEntity);
                    break;

                case 'InvoicePay':
                    convertedEntity = new InvoicePayEntity(nestedEntity);
                    break;

                default:
                    break;
            }

            convertedEntities.push(convertedEntity);
        });

        return convertedEntities;
    },

    // function which takes api response json and converts the json into an entity object of the appropriate type, along with nested entities
    generateEntityWithNestedEntities: (entity, metadata, data) => {
        let generatedEntity;
        let convertedNestedEntities;

        switch (entity) {
            case 'Invoice':
                // convert invoiceLineItems in the res.data object to be InvoiceLineItemEntity objects
                convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                    data.invoiceLineItems,
                    'InvoiceLineItem'
                );

                data.invoiceLineItems = convertedNestedEntities;

                generatedEntity = new InvoiceEntity(data, metadata);
                break;

            case 'RecurringInvoice':
                // convert recurringInvoiceLineItems in the res.data object to be RecurringInvoiceLineItemEntity objects
                convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                    data.recurringInvoiceLineItems,
                    'RecurringInvoiceLineItem'
                );

                data.recurringInvoiceLineItems = convertedNestedEntities;

                generatedEntity = new RecurringInvoiceEntity(data, metadata);
                break;

            case 'Bill':
                // convert billLineItems in the data object to be BillLineItemEntity objects
                convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                    data.billLineItems,
                    'BillLineItem'
                );

                data.billLineItems = convertedNestedEntities;

                generatedEntity = new BillEntity(data, metadata);
                break;

            case 'RecurringBill':
                // convert billLineItems in the data object to be BillLineItemEntity objects
                convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                    data.recurringBillLineItems,
                    'RecurringBillLineItem'
                );

                data.billLineItems = convertedNestedEntities;

                generatedEntity = new RecurringBillEntity(data, metadata);

                break;

            case 'VendorCredit':
                convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                    data.vendorCreditLineItems,
                    'VendorCreditLineItem'
                );

                data.vendorCreditLineItems = convertedNestedEntities;

                generatedEntity = new VendorCreditEntity(data, metadata);

                break;

            case 'SentPay':
                if (data.sentPays || data.payments) {
                    generatedEntity = {
                        sentPays: []
                    };

                    data.sentPays.forEach(sentPay => {
                        convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                            sentPay.billPays,
                            'BillPay'
                        );

                        sentPay.billPays = convertedNestedEntities;
                        // if bill credits are present, convert those as well
                        if (sentPay.billCredits) {
                            convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                                sentPay.billCredits,
                                'BillCredit'
                            );

                            sentPay.billCredits = convertedNestedEntities;
                        }

                        const convertedSentPay = new SentPayEntity(
                            sentPay,
                            metadata
                        );

                        generatedEntity.sentPays.push(convertedSentPay);
                    });
                } else {
                    convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                        data.billPays,
                        'BillPay'
                    );

                    data.billPays = convertedNestedEntities;

                    if (data.billCredits) {
                        convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                            data.billCredits,
                            'BillCredit'
                        );

                        data.billCredits = convertedNestedEntities;
                    }

                    generatedEntity = new SentPayEntity(data, metadata);
                }

                break;

            case 'ReceivedPay':
                if (data.chargedReceivedPay) {
                    convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                        data.chargedReceivedPay.invoicePays,
                        'InvoicePay'
                    );

                    data.chargedReceivedPay.invoicePays = convertedNestedEntities;

                    generatedEntity = new ReceivedPayEntity(
                        data.chargedReceivedPay,
                        metadata
                    );
                } else {
                    convertedNestedEntities = module.exports.convertNestedEntitiesToEntityObjects(
                        data.invoicePays,
                        'InvoicePay'
                    );

                    data.invoicePays = convertedNestedEntities;

                    generatedEntity = new ReceivedPayEntity(data, metadata);
                }

                break;

            default:
                break;
        }

        return generatedEntity;
    },

    // function which dynamically converts params json object into a properly formatted string to be passed up within a request
    convertParamsToDataString: (
        params,
        optionalParams,
        entity,
        isNested = false
    ) => {
        // initialize dataString
        let dataString = '{';

        // if this json object is not representative of a nested entity, than append this to beginning of dataString
        if (!isNested) {
            dataString += `"obj": { "entity": "${entity}",`;
        }

        // initialize special field to account for field which exists outside of the 'obj' field such as agreedWithTOS
        let specialField;

        // iterate through params and add required optionalParams to dataString
        for (const param in params) {
            // check only required params
            if (param !== 'options' && param !== 'agreedWithTOS') {
                // build param dataString based on the data type and handle the special case for nested entities
                if (params[param] instanceof Array) {
                    // handle nested entities
                    const lineItems = module.exports.generateNestedEntitiesString(
                        params[param]
                    );

                    dataString += `"${param}": ${lineItems},`;
                } else if (typeof params[param] === 'string') {
                    dataString += `"${param}": "${params[param]}",`;
                } else {
                    dataString += `"${param}": ${params[param]},`;
                }
            }
        }

        /* this functionality is required for the creation of customerBankAccounts, as the 
        request bodies are structured slightly different than that of other requests */
        if (params.agreedWithTOS) {
            specialField = `"agreedWithTOS": ${params.agreedWithTOS}`;
        }

        // iterate through optionalParams and them to dataString (if optional params are present)
        if (params.options) {
            for (const optionalParam in optionalParams) {
                if (optionalParams[optionalParam] instanceof Array) {
                    // handle nested entities
                    const nestedEntities = module.exports.generateNestedEntitiesString(
                        optionalParams[optionalParam]
                    );

                    dataString += `"${optionalParam}": ${nestedEntities},`;
                } else if (typeof optionalParam === 'string') {
                    dataString += `"${optionalParam}": "${optionalParams[optionalParam]}",`;
                } else {
                    dataString += `"${optionalParam}": ${optionalParams[optionalParam]},`;
                }
            }
        }

        // remove final comma (so the json can be parsed)
        dataString = dataString.slice(0, -1);

        // add closing brackets to dataString (so the json can be parsed)
        if (specialField) {
            dataString += `},${specialField}}`;
        } else if (isNested) {
            dataString += '}';
        } else {
            dataString += '}}';
        }

        return dataString;
    }
};

module.exports = util;
