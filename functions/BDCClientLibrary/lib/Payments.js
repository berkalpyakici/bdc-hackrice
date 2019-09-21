const util = require('./util');

const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * Payments module holds methods for making payments to bills, charging customers, and fetching overall payments information.
 *
 * @param   {object}    Auth    the Auth object instance the BDC object is instantiated with - contains the credentials to call the methods
 */

class Payments {
    // instantiate class with an entity type and Auth attribute for access to the credentials
    constructor(Auth) {
        this.Auth = Auth;

        // different types of entity metadata
        this.sentPayMetadata = undefined;
        this.receivedPayMetadata = undefined;
    }

    /**
     * Pays one or more bill. You can apply vendor credits that were issued by a vendor when paying bills.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/215407363-PayBills" target="_blank">Pay Bills</a>.
     *
     * @param   {object}    [params = {}]                               object which holds required and optional fields for request
     * @param   {string}    params.vendorId                             ID of the Vendor to be paid
     * @param   {object[]}  params.billPays                             array of one or more bills (up to 200) to be paid
     * @param   {string}    params.billPays.billId                      the ID of the bill to be paid
     * @param   {number}    params.billPays.amount                      the  amount of the bill to be paid
     * @param   {string}    params.options                              object which contains all optional parameters
     * @param   {string}    [params.options.processDate = ""]           process date for paid bills
     * @param   {object[]}  [params.options.billCredits = []]           array of one or more vendor credits to be applied
     * @param   {string}    params.options.billCredits.billId           the ID of the bill to be paid
     * @param   {string}    params.options.billCredits.vendorCreditId   the ID of the vendorCredit
     * @param   {number}    params.options.billCredits.amount           the amount of the vendor credit to be applied
     *
     * @return  {object[]}                                              Array containing SentPayEntity object
     *
     * @throws  {MissingRequiredFieldException}                         this exception is thrown if vendorId or billPays is not defined, the billId or amount field is not
     *                                                                  defined within each billPay object, and lastly if the billId, vendorCreditId, or amount is not defined when billCredits are passed in
     * @throws  {FailedRequestException}                                this exception is thrown if the request fails - exception includes error message and error code
     */

    /* This method takes a parameters object containing fields to build request, builds the request, calls the /PayBills
    endpoint, then returns an array containing the SentPay object. Sentpay object returned contains the billPay objects
    and billCedit objects */
    async payBills(params = {}) {
        // destructure params
        const { vendorId, billPays, options = {} } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!vendorId) {
            throw new MissingRequiredFieldException('vendorId');
        } else if (!billPays) {
            throw new MissingRequiredFieldException('billPays');
        }

        /* iterate over the billPays passed in, validate that required fields are defined on each
        billPay, create a new complete billPay object which includes optional fields with the default values */
        billPays.forEach(billPay => {
            // destructure required field(s) from nested entity
            const { billId, amount } = billPay;

            // throw error if a required field is missing
            if (!billId) {
                throw new MissingRequiredFieldException('billId');
            } else if (!amount) {
                throw new MissingRequiredFieldException('amount');
            }
        });

        /* iterate over the billCredits passed in, validate that required fields are defined on each
        billCredit, create a new complete billCredit object which includes optional fields with the default values */
        if (options.billCredits) {
            const { billCredits } = options;

            billCredits.forEach(billCredit => {
                // destructure required field(s) from nested entity
                const { billId, vendorCreditId, amount } = billCredit;

                // throw error if a required field is missing
                if (!billId) {
                    throw new MissingRequiredFieldException('billId');
                } else if (!vendorCreditId) {
                    throw new MissingRequiredFieldException('vendorCreditId');
                } else if (!amount) {
                    throw new MissingRequiredFieldException('amount');
                }
            });
        }

        // initialize default field values for optional fields
        const defaults = {
            processDate: '',
            billCredits: []
        };

        // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
        const optionalParams = Object.assign({}, defaults, options);

        // build formatted dataString for request
        const dataString = util.convertParamsToDataString(
            params,
            optionalParams,
            '',
            true
        );

        // initialize data object to be passed into the request
        const data = {
            data: dataString
        };

        // make request to /PayBills endpoint
        const res = await util.makeRequest(
            `${this.Auth.env}/PayBills.json`,
            this.Auth._requestCredentials,
            data
        );

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.sentPayMetadata) {
            this.sentPayMetadata = await util.getEnitityMetadata(
                'SentPay',
                this.Auth
            );
        }

        // from response data and metadata create appropriate entity object to be returned
        const payment = util.generateEntityWithNestedEntities(
            'SentPay',
            this.sentPayMetadata,
            res.data
        );

        return payment;
    }

    /**
     * This method allows you to charge a customer
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/215407243-ChargeCustomer" target="_blank">Charge Customer</a>.
     *
     * @param   {object}    [params = {}]                       object which holds required and optional fields for request
     * @param   {string}    params.customerId                   ID of the Customer to be paid
     * @param   {string}    params.paymentType                  payment type to charge customer. Currently, only bank account is supported. Set value to "3" to charge
     *                                                          customer's bank account.
     * @param   {string}    params.paymentAccountId             payment method ID. To charge the user's bank account, pass Bill.com ID of bank account (customerBankAccountId)
     * @param   {object[]}  params.invoicePays                  array of one or more invoices (up to 200) to be paid
     * @param   {string}    params.invoicePays.invoiceId        ID of the invoice to be paid
     * @param   {number}    params.invoicePays.amount           amount to be charged
     * @param   {object}    params.options                      object which contains all optional parameters
     * @param   {string}    [params.options.paymentDate = '']   date of the charge
     * @param   {string}    [params.options.Memo = '']          description of charge details
     *
     * @return  {object}                                        the ReceivePayEntity object which includes the details of the payments received
     *
     * @throws  {MissingRequiredFieldException}                 this exception is thrown if customerId, paymentType, paymentAccountId, or invoicePays are not defined.
     *                                                          Additionally, this exception will be thrown if invoicePay objects are missing an invoiceId or amount value.
     * @throws  {FailedRequestException}                        this exception is thrown if the request fails - exception includes error message and error code
     */

    /* This method takes a parameters object containing fields to build request, builds the request, calls the /ChargeCustomer
    endpoint, then returns a ReceivePay object. ReceivePay object returned contains the invoicePay objects as well */
    async chargeCustomer(params = {}) {
        // destructure params
        const {
            customerId,
            paymentType,
            paymentAccountId,
            invoicePays,
            options = {}
        } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!customerId) {
            throw new MissingRequiredFieldException('customerId');
        } else if (!paymentType) {
            throw new MissingRequiredFieldException('paymentType');
        } else if (!paymentAccountId) {
            throw new MissingRequiredFieldException('paymentAccountId');
        } else if (!invoicePays) {
            throw new MissingRequiredFieldException('invoicePays');
        }

        /* iterate over the invoicePays passed in, validate that required fields are defined on each
        invoicePay, create a new complete invoicePay object which includes optional fields with the default values */
        invoicePays.forEach(invoicePay => {
            // destructure required field(s) from nested entity
            const { invoiceId, amount } = invoicePay;

            // throw error if a required field is missing
            if (!invoiceId) {
                throw new MissingRequiredFieldException('invoiceId');
            } else if (!amount) {
                throw new MissingRequiredFieldException('amount');
            }
        });

        // initialize default values for optional params
        const defaults = {
            paymentDate: '',
            Memo: ''
        };

        // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
        const optionalParams = Object.assign({}, defaults, options);

        // build formatted dataString for request
        const dataString = util.convertParamsToDataString(
            params,
            optionalParams,
            '',
            true
        );

        // build formatted data string for request
        const data = {
            data: dataString
        };

        // make request to /ChargeCustomer endpoint
        const res = await util.makeRequest(
            `${this.Auth.env}/ChargeCustomer.json`,
            this.Auth._requestCredentials,
            data
        );

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.receivedPayMetadata) {
            this.receivedPayMetadata = await util.getEnitityMetadata(
                'ReceivedPay',
                this.Auth
            );
        }

        // from response data and metadata create appropriate entity object to be returned
        const charge = util.generateEntityWithNestedEntities(
            'ReceivedPay',
            this.receivedPayMetadata,
            res.data
        );

        // make return object nested in an object with key 'chargedReceivedPay' to be consistent with API
        return {
            chargedReceivedPay: charge
        };
    }

    /**
     * Gets the AP (Accounts Payable - outgoing Payments) summary of the account.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208197206-GetAPSummary" target="_blank">Get AP Summary</a>.
     *
     * @return {object}                 the APSummary object which includes the details of the account payable
     *
     * @throws {FailedRequestException} this exception is thrown if the request fails - exception includes error message and error code
     */

    // method which hits the /GetAPSummary endpoint, method returns JSON and not a typed object
    async getAPSummary() {
        // make request to /GetAPSummary endpoint
        const res = await util.makeRequest(
            `${this.Auth.env}/GetAPSummary.json`,
            this.Auth._requestCredentials
        );

        const apSummary = res.data;

        return apSummary;
    }

    /**
     * Gets the AR (Accounts Receivable - incoming payments) summary of the account.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/211295143-GetARSummary" target="_blank">Get AR Summary</a>.
     *
     * @return {object}                 the ARSummary object which includes the details of the account receivable
     *
     * @throws {FailedRequestException} this exception is thrown if the request fails - exception includes error message and error code
     */

    // method which hits the /GetARSummary endpoint, method returns JSON and not a typed object
    async getARSummary() {
        // make request to /GetARSummary endpoint
        const res = await util.makeRequest(
            `${this.Auth.env}/GetARSummary.json`,
            this.Auth._requestCredentials
        );

        const arSummary = res.data;

        return arSummary;
    }

    /**
     * Payment records are automatically created for payments made through Bill.com. This method creates an Accounts Payable (AP) payment record to account for payments made outside of Bill.com
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/215407343-RecordAPPayment" target="_blank">Record AP Payment</a>.
     *
     * @param   {object}    [params = {}]                               object which holds required and optional fields for request
     * @param   {string}    params.vendorId                             ID of the Vendor to be paid
     * @param   {string}    params.processDate                          process date for paid bills
     * @param   {boolean}   params.toPrintCheck                         denotes whether a check should be printed [value = true] or not [value = false] for this payment
     * @param   {object[]}  params.billPays                             array of one or more bills to be paid which includes the <a href="index.html#billpayentity" target="_blank">BillPayEntity object</a>
     * @param   {string}    params.billPays.billId                      ID of the bill to be paid
     * @param   {number}    params.billPays.amount                      amount to be charged
     * @param   {object}    params.options                              object which contains all optional parameters
     * @param   {string}    [params.options.chartOfAccountId = ""]    	ID of the payment account
     * @param   {string}    [params.options.description = ""]           a description of the payment
     * @param   {string}    [params.options.syncReference = ""]         Indicate the reference number for the offline payment
     * @param   {object[]}  [params.options.billCredits = []]           array of one or more vendor credits to be applied
     * @param   {string}    params.options.billCredits.billId           the ID of the bill to be paid
     * @param   {string}    params.options.billCredits.vendorCreditId   the ID of the vendorCredit
     * @param   {number}    params.options.billCredits.amount           the amount of the vendor credit to be applied
     *
     * @return  {object}                                                the SentEntity object which includes the details of the payment that was sent
     *
     * @throws {MissingRequiredFieldException}                          this exception is thrown if vendorId, paymentDate, processDate, toPrintCheck or billPays are not defined.
     *                                                                  Additionally, this exception will be thrown if billPay objects are missing an billId or amount value.
     * @throws {FailedRequestException}                                 this exception is thrown if the request fails - exception includes error message and error code
     */

    /* This method takes a parameters object containing fields to build request, builds the request, calls the /RecordAPPayment
    endpoint, then returns a SentPay object. */
    async recordAPPayment(params = {}) {
        // destructure params
        const {
            vendorId,
            processDate,
            toPrintCheck,
            billPays,
            options = {}
        } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!vendorId) {
            throw new MissingRequiredFieldException('vendorId');
        } else if (!processDate) {
            throw new MissingRequiredFieldException('processDate');
        } else if (toPrintCheck === undefined) {
            throw new MissingRequiredFieldException('toPrintCheck');
        } else if (!billPays) {
            throw new MissingRequiredFieldException('billPays');
        }

        /* iterate over the billPays passed in, validate that required fields are defined on each
        billPay, create a new complete billPay object which includes optional fields with the default values */
        billPays.forEach(billPay => {
            // destructure required field(s) from nested entity
            const { billId, amount } = billPay;

            // throw error if a required field is missing
            if (!billId) {
                throw new MissingRequiredFieldException('billId');
            } else if (!amount) {
                throw new MissingRequiredFieldException('amount');
            }
        });

        /* iterate over the billCredits passed in, validate that required fields are defined on each
        billCredit, create a new complete billCredit object which includes optional fields with the default values */
        if (options.billCredits) {
            const { billCredits } = options;

            billCredits.forEach(billCredit => {
                // destructure required field(s) from nested entity
                const { billId, vendorCreditId, amount } = billCredit;

                // throw error if a required field is missing
                if (!billId) {
                    throw new MissingRequiredFieldException('billId');
                } else if (!vendorCreditId) {
                    throw new MissingRequiredFieldException('vendorCreditId');
                } else if (!amount) {
                    throw new MissingRequiredFieldException('amount');
                }
            });
        }

        // intitialize default values for optional params
        const defaults = {
            chartOfAccountId: '',
            description: '',
            syncReference: '',
            billCredits: []
        };

        // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
        const optionalParams = Object.assign({}, defaults, options);

        // build formatted dataString for request
        const dataString = util.convertParamsToDataString(
            params,
            optionalParams,
            '',
            true
        );

        // initialize data object to be passed into request
        const data = {
            data: dataString
        };

        // make request to /RecordAPPayment endpoint
        const res = await util.makeRequest(
            `${this.Auth.env}/RecordAPPayment.json`,
            this.Auth._requestCredentials,
            data
        );

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.sentPayMetadata) {
            this.sentPayMetadata = await util.getEnitityMetadata(
                'SentPay',
                this.Auth
            );
        }

        // from response data and metadata create appropriate entity object to be returned
        const apPaymentRecord = util.generateEntityWithNestedEntities(
            'SentPay',
            this.sentPayMetadata,
            res.data
        );

        return apPaymentRecord;
    }

    /**
     * Payment records are automatically created for payments made through Bill.com. This method creates an Accounts Receivable (AR) payment record to account for payments received outside of Bill.com
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/213911106-RecordARPayment" target="_blank">Record AR Payment</a>.
     *
     * @param   {object}    [params = {}]                               object which holds required and optional fields for request
     * @param   {string}    params.customerId                           ID of the Customer to be paid
     * @param   {string}    params.paymentDate                          the date the payment was made
     * @param   {string}    params.paymentType                          The form of payment: Cash [value = "0"], Check [value = "1"], CreditCard [value = "2"], ACH [value = "3"], PayPal [value = "4"], Other [value = "5"]
     * @param   {object[]}  params.invoicePays                          array of one or more invoices (up to 200) to be paid
     * @param   {string}    params.invoicePays.invoiceId                ID of the invoice to be paid
     * @param   {number}    params.invoicePays.amount                   amount to be charged
     * @param   {object}    params.options                              object which contains all optional parameters
     * @param   {string}    [params.options.depositToAccountId = '']    the account where the payment is to be deposited
     * @param   {string}    [params.options.description = '']           a description of the payment
     * @param   {string}    [params.options.refNumber = '']             the payment reference or invoice number
     *
     * @return  {object}                                                the ReceivePayEntity object which includes the details of the payments received
     *
     * @throws {MissingRequiredFieldException}                          this exception is thrown if customerId, paymentDate, paymentType, amount or invoicePays are not defined.
     *                                                                  Additionally, this exception will be thrown if invoicePay objects are missing an invoiceId or amount value.
     * @throws {FailedRequestException}                                 this exception is thrown if the request fails - exception includes error message and error code
     */

    /* This method takes a parameters object containing fields to build request, builds the request, calls the /RecordARPayment
    endpoint, then returns a ReceivePay object. */
    async recordARPayment(params = {}) {
        // destructure params
        const {
            customerId,
            paymentDate,
            paymentType,
            amount,
            invoicePays,
            options = {}
        } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!customerId) {
            throw new MissingRequiredFieldException('customerId');
        } else if (!paymentDate) {
            throw new MissingRequiredFieldException('paymentDate');
        } else if (!paymentType) {
            throw new MissingRequiredFieldException('paymentType');
        } else if (amount === undefined) {
            throw new MissingRequiredFieldException('amount');
        } else if (!invoicePays) {
            throw new MissingRequiredFieldException('invoicePays');
        }

        /* iterate over the invoicePays passed in, validate that required fields are defined on each
        invoicePay, create a new complete invoicePay object which includes optional fields with the default values */
        invoicePays.forEach(invoicePay => {
            // destructure required field(s) from nested entity
            const { invoiceId } = invoicePay;

            // throw error if a required field is missing
            if (!invoiceId) {
                throw new MissingRequiredFieldException('invoiceId');
            } else if (!invoicePay.amount) {
                throw new MissingRequiredFieldException('amount');
            }
        });

        // initialize default values for optional params
        const defaults = {
            depositToAccountId: '',
            description: '',
            refNumber: ''
        };

        // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
        const optionalParams = Object.assign({}, defaults, options);

        // build formatted dataString for request
        const dataString = util.convertParamsToDataString(
            params,
            optionalParams,
            '',
            true
        );

        // intitialize data object to be passed into request
        const data = {
            data: dataString
        };

        // make request to /RecordARPayment endpoint
        const res = await util.makeRequest(
            `${this.Auth.env}/RecordARPayment.json`,
            this.Auth._requestCredentials,
            data
        );

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.receivePayMetadata) {
            this.receivePayMetadata = await util.getEnitityMetadata(
                'ReceivedPay',
                this.Auth
            );
        }

        // from response data and metadata create appropriate entity object to be returned
        const apPaymentRecord = util.generateEntityWithNestedEntities(
            'ReceivedPay',
            this.receivePayMetadata,
            res.data
        );

        return apPaymentRecord;
    }

    // method which lists payments based on disbursement status
    async listPayments(params = {}) {
        // destructure params
        const { disbursementStatus, start, max } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!disbursementStatus) {
            throw new MissingRequiredFieldException('disbursementStatus');
        } else if (start === undefined) {
            throw new MissingRequiredFieldException('start');
        } else if (max === undefined) {
            throw new MissingRequiredFieldException('max');
        }

        // build formatted dataString for request
        const dataString = util.convertParamsToDataString(params, {}, '', true);

        // intitialize data object to be passed into request
        const data = {
            data: dataString
        };

        // make request to /RecordARPayment endpoint
        const res = await util.makeRequest(
            `${this.Auth.env}/ListPayments.json`,
            this.Auth._requestCredentials,
            data
        );

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.sentPayMetadata) {
            this.sentPayMetadata = await util.getEnitityMetadata(
                'SentPay',
                this.Auth
            );
        }

        const payments = [];

        /* Iterate over the array of invoice bank accounts sent back by the API and
            instantiate a new Invoice Entity Object instance, then return an
            array of the Invoice Objects */
        res.data.payments.forEach(p => {
            // from response data and metadata create appropriate entity object to be returned
            const payment = util.generateEntityWithNestedEntities(
                'SentPay',
                this.metadata,
                p
            );

            payments.push(payment);
        });

        // return array of InvoiceEntity Objects
        return payments;
    }
}

module.exports = Payments;
