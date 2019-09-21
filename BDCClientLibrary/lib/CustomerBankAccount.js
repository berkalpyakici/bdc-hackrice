const util = require('./util');
const CustomerBankAccountEntity = require('./Entities/CustomerBankAccountEntity');

const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * A Customer can only have one bank account. If the customer wants to change the details or switch to another
 * bank account, you need to delete the current bank account, and create a new bank account.
 * This class houses the methods that manage the customer bank account details.
 *
 * @param {object} Auth the Auth object instance the BDC object is instantiated with - contains the credentials required  to
 * call the methods
 */

// class which houses instance methods regarding CustomerBankAccount Entities
class CustomerBankAccount {
    // instantiate class with an Entity type and Auth attribute for access to the credentials
    constructor(Auth) {
        this.entity = 'CustomerBankAccount';
        this.Auth = Auth;
        this.metadata = undefined;
    }

    /**
     * Adds the bank account details of a customer. To successfully add the bank account, the customer must
     * agree to the bill payments Terms of Service.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/209713223-CustomerBankAccount#sub-anchor-1-1" target="_blank">Add Customer Bank Account</a>.
     *
     * @param   {object}    params                                  object which holds required and optional fields
     * @param   {string}    params.customerId                       the system generated customer ID of the customer you need to add the bank account
     * @param   {string}    params.nameOnAccount                    the name associated with the bank account
     * @param   {string}    params.routingNumber                    the bank routing number
     * @param   {string}    params.accountNumber                    the bank account number
     * @param   {boolean}   params.agreedWithTOS                    if the value is true, the customer has agreed with the Terms of Service and you can charge the customer directly for payments.
     *                                                              If the value is false, you are not able to charge the customer directly.
     * @param   {object}    params.options                          the options object which contains the optional fields
     * @param   {string}    [params.options.isActive="1"]           denotes if the bank account is active [value="1"] or inactive [value="2"]
     * @param   {string}    [params.options.nickname=""]            the user-friendly or short version of the customer's name
     * @param   {boolean}   [params.options.isLockedByOrg=false]    denotes whether the bank account can be edited/deleted by the customer [value = true] or not [value=false] through the customer portal
     * @param   {boolean}   [params.options.isSavings=false]        denotes if the account is a savings account [value = true] or checking account [value=false]
     * @param   {boolean}   [params.options.isPersonalAcct=false]   denotes if the account is a personal account [value = true] or business bank account [value=false]
     * @param   {boolean}   [params.options.isWrittenAuth=true]
     *
     * @return  {object}                                            the CustomerBankAccountEntity object which includes the customer's bank account details
     *
     * @throws  {MissingRequiredFieldException}                     this exception is thrown if the customerId, nameOnAccount, routingNumber, accountNumber, or agreedWithTOS
     *                                                              fields is not defined
     * @throws  {FailedRequestException}                            this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes required arguments (customerId, nameOnAccount, routingNumber,
    accountNumber, agreedWithTOS) and an options object (for optional fields), from
    those arguments builds the body of a create request, makes a request to create a
    CustomerBankAccount, and if successful returns a CustomerBankAccount Entity Object */
    async create(params = {}) {
        // destructured params object
        const {
            customerId,
            nameOnAccount,
            routingNumber,
            accountNumber,
            agreedWithTOS,
            options = {}
        } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!customerId) {
            throw new MissingRequiredFieldException('customerId');
        } else if (!nameOnAccount) {
            throw new MissingRequiredFieldException('nameOnAccount');
        } else if (!routingNumber) {
            throw new MissingRequiredFieldException('routingNumber');
        } else if (!accountNumber) {
            throw new MissingRequiredFieldException('accountNumber');
        } else if (!agreedWithTOS) {
            throw new MissingRequiredFieldException('agreedWithTOS');
        }

        // destructure options and set default values
        const defaults = {
            isActive: '1',
            nickname: '',
            isLockedByOrg: false,
            isSavings: false,
            isPersonalAcct: false,
            isWrittenAuth: true
        };

        // Order of sources determines what gets overwritten
        const optionalParams = Object.assign({}, defaults, options);

        // build out request body from arguments, and set default values for what is not passed in
        const dataString = util.convertParamsToDataString(
            params,
            optionalParams,
            this.entity
        );

        const data = {
            data: dataString
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/Crud/Create/CustomerBankAccount.json`,
            this.Auth._requestCredentials,
            data
        );

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        return new CustomerBankAccountEntity(res.data, this.metadata);
    }

    /**
     * Gets the details of the customer bank account.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/209713223-CustomerBankAccount#sub-anchor-1-2" target="_blank">Read Customer Bank Account</a>.
     *
     * @param   {string}  customerBankAccountId   the system generated bank account ID to fetch the customer bank account record from the database
     *
     * @return  {object}                          the CustomerBankAccountEntity object which includes the bank account details
     *
     * @throws {MissingRequiredFieldException}    this exception is thrown if customerBankAccountId is not defined
     * @throws {FailedRequestException}           this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a single CustomerBankAccount based on the id and returns a CustomerBankAccountEntity Object
    async read(customerBankAccountId) {
        // throw an error if minimum required field(s) are not passed in
        if (!customerBankAccountId) {
            throw new MissingRequiredFieldException('customerBankAccountId');
        }

        const res = await util.readRequest(
            customerBankAccountId,
            this.Auth,
            this.entity
        );

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        return new CustomerBankAccountEntity(res.data, this.metadata);
    }

    /**
     * Lists the customer bank accounts of the Organization associated with the orgId used to login. Additionally, you can specify how many customer bank accounts to list,
     * apply filters, and sort the list based on customer bank account fields.
     * If the request fails, the FailedRequestException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/210136993-List" target="_blank">List</a>.
     *
     *
     * @param   {object}    [params = {}]               object which holds required and optional fields
     * @param   {boolean}   [params.nested = true]      if true, includes nested related data
     * @param   {number}    [params.start = 0]          the starting pagination index. Define start as 0 for the first listing.
     * @param   {number}    [params.max = 99]           the maximum number of objects that needs to be returned from the starting index
     * @param   {[object]}  [params.filters = []]       filters the results that match the criteria.
     *                                                  For more information, see <a href="https://developer.bill.com/hc/en-us/articles/210136993-List#sub-anchor-1-5" target="_blank">Filters</a>.
     * @param   {[object]}  [params.sort = []]          sort results by fields of a customer bank account
     *
     * @return  {[object]}                              an array of CustomerBankAccountEntity objects which include the customer bank account details
     *
     * @throws  {FailedRequestException}                this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a list of CustomerBankAccounts and returns an array of CustomerBankAccountEntity Objects
    async list(params = {}) {
        const customerBankAccounts = [];

        const res = await util.listRequest(this.Auth, this.entity, params);

        // if metadata attribute has not been assigned fetch entity metadata to place on Entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        /* iterate over the array of customer bank accounts sent back by the api and
        instantiate a new CustomerBankAccount entity object instance, then return an
        array of the CustomerBankAccount objects */
        res.data.forEach(cBankAccount => {
            const customerBankAccount = new CustomerBankAccountEntity(
                cBankAccount,
                this.metadata
            );
            customerBankAccounts.push(customerBankAccount);
        });

        // return array of CustomerBankAccountEntity objects
        return customerBankAccounts;
    }
}

module.exports = CustomerBankAccount;
