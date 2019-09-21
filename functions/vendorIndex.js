
/* Credentials */
const BDC_username = "bay+sandbox@rice.edu";
const BDC_password = "Billtest123";
const BDC_devKey = "01JFJIGOPULHADWJD201";
const BDC_env = "sandbox";
const BDC_orgId = '00801ZVAIUEZDYTOIme7';

const BDC = require('./../BDCClientLibrary')(username, password, devKey, env);

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
