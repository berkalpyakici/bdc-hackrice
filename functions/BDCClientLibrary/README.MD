# Disclaimer
This Node.js client library can only be used at the Hackrice-Hackathon.  

You may not, directly or indirectly: copy or distribute, use commercially for the benefit of a third party, reverse engineer, disassemble, decompile, attempt to discover the source code or structure, sequence and organization of, or remove any proprietary notices from, the Client Library.

# Overview
This is a Node.js client library which wraps Bill.com's API for simple and straightforward consumption.

## Dependencies
- [node-fetch](https://www.npmjs.com/package/node-fetch) version ^4.0.0
- [form-urlencoded](https://www.npmjs.com/package/form-urlencoded) version ^2.6.0

## Documentation
- [API documentation](https://developer.bill.com/hc/en-us/categories/201195646)
- [Bill.com-Node.js client library documentation]( https://zgreathouse-bdc.github.io/BDC-NodeJS-Client-Library/#javascript-client-library/)

## Before you begin
1. [Sign up](https://developer.bill.com/hc/en-us/requests/new?ticket_form_id=154803) for the API Developer Key and create a developer account (Organization).
   A Sales Specialist will review the request and reach out to discuss your objectives.
1. Once API access is provisioned, you receive an email with the following details:
    * Organization ID
    * Developer Key
    * API Endpoint URL

## Installation guide
1. Clone the Bill.com-Node.js client library or download the source.
1. Run the `npm install` command to install dependencies.
1. Copy the client library you cloned or downloaded into your project.
```
    Project Directory

    |+-- Project
    |   +-- BDCClientLibrary
    |   +-- index.js
```
## Import the library
Before you start using the inbuilt methods, you need to import the BDC library and instantiate it with your credentials. For more information, see [Bill.com-Node.js client library documentation]( https://zgreathouse-bdc.github.io/BDC-NodeJS-Client-Library/#bdc).

``` javascript
const BDC = require('./BDCClientLibrary')(username, password, devKey, env);
```
Example:
```javascript
const BDC = require('./index')('sam@foo.com', 'samF1@34#', '05TRWGUJKERYYILOFMRT009', 'sandbox');
```

## Get started with authentication

Authenticating through the client library is done by calling the `BDC.Auth.login(orgId)` method. This method returns a `sessionID`. However, it also sets the request credentials on the Auth class to effectively authenticate subsequent calls made through the client library.

Attempting to call a method within the Client Library before authenticating, will result in a Session Invalid Error.

``` javascript
    (async () => {
        try {
            // replace `<your organization ID>` with the organization ID that was shared when API access was provisioned.
            const orgId = '<your organization ID>';

            // authenticates the user and returns the response JSON
            await BDC.Auth.login(orgId);

        } catch (err) {
            console.log(err);

        }
    })();
```


# Usage
You can use the client library within your project. Given below are a few examples on how to call the methods.

* **Creating a bill**
    Before running this method, [create a vendor]( https://zgreathouse-bdc.github.io/BDC-NodeJS-Client-Library/#vendor), and replace `<vendor ID>` with the system generated ID of the vendor you created.

    ```javascript
    (async () => {
    try {
        // instantiate params object for the create bill method (see docs:  https://zgreathouse-bdc.github.io/BDC-NodeJS-Client-Library/#billcreate)
        const bill = {
            vendorId: '<vendor ID>',
            invoiceNumber: '123',
            invoiceDate: '2019-10-1',
            dueDate: '2019-10-31',
            billLineItems: [
                {
                    amount: 3190
                }
            ],
            options: {
                isActive: '1',
                description: 'this is a bill'
            }
        };

        // creates a Bill and returns a BillEntity Object
        await BDC.Bill.create(bill);

    } catch (err) {
        console.log(err);

        }
    })();
    ```
* **Making a custom request**  
    Currently, the client library does not cover all the Bill.com developer platform APIs. If you want to use an API that is not implemented, use the `BDC.makeRequest()` method.
    ```javascript
    (async () => {
    try {
        // request endpoint
        const endpoint = '/Crud/Create/Invoice.json';

        // request body in JSON format
        const invoice = `{
            "obj" : {
                "entity" : "Invoice",
                "customerId" : "0cu01QRJUQPTKMMYijuo",
                "invoiceNumber" : "1950",
                "invoiceDate" : "2016-12-12",
                "dueDate" : "2016-12-19",
                "invoiceLineItems" : [
                    {
                        "entity" : "InvoiceLineItem",
                        "quantity" : 3,
                        "amount" : 1800.00
                    }
                ]
            }
        }`;

        // creates an invoice and returns JSON response (see docs:  https://zgreathouse-bdc.github.io/BDC-NodeJS-Client-Library/#bdcmakerequest)
        await BDC.makeRequest(endpoint, invoice);

    } catch (err) {
        console.log(err);

        }
    })();
    ```
