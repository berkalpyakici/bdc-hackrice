const util = require('./util');
const Auth = require('./Auth');

// entities
const Customer = require('./Customer');
const CustomerBankAccount = require('./CustomerBankAccount');
const Vendor = require('./Vendor');
const VendorBankAccount = require('./VendorBankAccount');
const Invoice = require('./Invoice');
const RecurringInvoice = require('./RecurringInvoice');
const Bill = require('./Bill');
const RecurringBill = require('./RecurringBill');
const VendorCredit = require('./VendorCredit');
const Payments = require('./Payments');

/**
 * This is the base class of the library and houses all of the other libraries. When importing the
 * library, it must be instantiated with your credentials.
 *
 * @param {string} userName the email that is used to login to the Bill.com account
 * @param {string} password the password that is used used to login to the Bill.com account
 * @param {string} devKey   the developer key that is shared when the sandbox account is provisioned
 * @param {string} env      refers to the production or sandbox environment
 */

// base Class of Library
class BDC {
    constructor(userName, password, devKey, env) {
        // create instance of Auth class, instantiated with credentials to be mutated via the Auth instance methods
        this.Auth = new Auth({
            userName,
            password,
            devKey,
            env
        });

        // instantiate BDC object instance with the following api reference classes and pass in the Auth class
        this.Customer = new Customer(this.Auth);
        this.CustomerBankAccount = new CustomerBankAccount(this.Auth);
        this.Vendor = new Vendor(this.Auth);
        this.VendorBankAccount = new VendorBankAccount(this.Auth);
        this.Invoice = new Invoice(this.Auth);
        this.RecurringInvoice = new RecurringInvoice(this.Auth);
        this.Bill = new Bill(this.Auth);
        this.RecurringBill = new RecurringBill(this.Auth);
        this.VendorCredit = new VendorCredit(this.Auth);
        this.Payments = new Payments(this.Auth);
    }

    /**
     * Lists the organizations that the current user has permission to access.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/211163843-ListOrgs" target="_blank">List Organizations</a>.
     *
     * @return {Object[]}                 an object which includes the organization ID and organization name
     *
     * @throws {FailedRequestException}   this exception is thrown if the request fails - exception includes error message and error code
     */

    // method which hits the listOrgs endpoint, providing a list of orgs associated with the provided credentials
    async listOrgs() {
        const res = await util.makeRequest(`${this.Auth.env}/ListOrgs.json`, {
            userName: this.Auth._credentials.userName,
            password: this.Auth._credentials.password,
            devKey: this.Auth._credentials.devKey,
            client_library: this.Auth.clientLibrary
        });

        return res.data;
    }

    /**
     * A method which can make a request specified by the endpoint which is passed in.
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/categories/201195646" target="_blank">Developer Docs</a>.
     *
     * @param   {string}    endpoint        the api endpoint not including the base url, ie: "/Crud/Create/Bill.json"
     * @param   {string}    [data = ""]     request data to be served up as the request body, for reference on how to structure the JSON string
     *                                      closely review the example requests within the developer docs
     *
     * @return  {Object}                    JSON response object
     *
     * @throws  {FailedRequestException}    this exception is thrown if the request fails - exception includes error message and error code
     */

    // Method which makes a request based on the endpoint
    async makeRequest(endpoint, data = '') {
        const requestData = {
            data
        };

        const res = await util.makeRequest(
            `${this.Auth.env}${endpoint}`,
            this.Auth._requestCredentials,
            requestData
        );

        return res.data;
    }
}

module.exports = BDC;
