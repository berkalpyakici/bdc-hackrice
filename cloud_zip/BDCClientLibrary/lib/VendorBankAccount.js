const util = require('./util');
const VendorBankAccountEntity = require('./Entities/VendorBankAccountEntity');

const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * To pay vendors via an Automated Clearing House (ACH), the vendor must provide bank account information.
 * This information is encrypted and stored securely. The session needs to be Multi Factor Authentication (MFA) trusted
 * before calling any of the vendor bank account methods, and the read results only display the last 4 digits of the account
 * and routing details.
 * This class houses the methods that manage the vendor bank account details.
 *
 * @param {object}  Auth   the Auth object instance the BDC object is instantiated with- contains the credentials required  to
 *                         call the methods
 */

// class which houses instance methods regarding VendorBankAccount Entities
class VendorBankAccount {
    // instantiate class with an entity type and Auth attribute for access to the credentials
    constructor(Auth) {
        this.entity = 'VendorBankAccount';
        this.Auth = Auth;
        this.metadata = undefined;
    }

    /**
     * Adds the bank account details for a vendor.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/209610646-VendorBankAccount#sub-anchor-2-1" target="_blank">Add Vendor Bank Account</a>.
     *
     * @param   {object}  params                                    object which holds required and optional fields
     * @param   {string}  params.vendorId                           the system generated vendor ID of the vendor you need to add the bank account
     * @param   {string}  params.routingNumber                      the bank routing number
     * @param   {string}  params.accountNumber                      the bank account number
     * @param   {boolean} params.usersId                            the system generated ID of the user who is adding this bank account
     * @param   {object}  params.options                            the options object which contains the optional fields
     * @param   {string}  [params.options.isActive = "1"]           denotes if the vendor bank account is active [value = "1"] or inactive [value = "2"]
     * @param   {boolean} [params.options.isSavings = false]        denotes if the account is a savings account [value = true] or not [value = false]
     * @param   {boolean} [params.options.isPersonalAcct = false]   denotes if the account is a personal account [value = true] or business bank account [value = false]
     *
     * @return  {object}                                            the VendorBankAccountEntity object which includes the vendors's bank account details
     *
     * @throws  {MissingRequiredFieldException}                     this exception is thrown if the vendorId, routingNumber, accountNumber, or userId
     *                                                              fields are not defined
     * @throws  {FailedRequestException}                            this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes required arguments (vendorId, nameOnAccount, routingNumber,
    accountNumber, usersId) and an options object (for optional fields), from
    those arguments builds the body of a create request, makes a request to create a
    VendorBankAccount, and if successful returns a VendorBankAccount Entity Object */
    async create(params = {}) {
        // destructured params object
        const {
            vendorId,
            routingNumber,
            accountNumber,
            usersId,
            options = {}
        } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!vendorId) {
            throw new MissingRequiredFieldException('vendorId');
        } else if (!routingNumber) {
            throw new MissingRequiredFieldException('routingNumber');
        } else if (!accountNumber) {
            throw new MissingRequiredFieldException('accountNumber');
        } else if (!usersId) {
            throw new MissingRequiredFieldException('usersId');
        }

        // destructure options and set default values
        const defaults = {
            isActive: 1,
            isSavings: false,
            isPersonalAcct: false
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
            `${this.Auth.env}/Crud/Create/VendorBankAccount.json`,
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

        return new VendorBankAccountEntity(res.data, this.metadata);
    }

    /**
     * Gets the details of the vendor bank account.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/209610646-VendorBankAccount#sub-anchor-2-2" target="_blank">Read Vendor Bank Account</a>.
     *
     * @param   {string}  vendorBankAccountId   the system generated bank account ID to fetch the vendor bank account record from the database
     *
     * @return  {object}                        the VendorBankAccountEntity object which includes the bank account details
     *
     * @throws  {MissingRequiredFieldException} this exception is thrown if the vendorBankAccountId is not defined
     * @throws  {FailedRequestException}        this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a single VendorBankAccount based on the id and returns a VendorBankAccountEntity Object
    async read(vendorBankAccountId) {
        // throw an error if minimum required field(s) are not passed in
        if (!vendorBankAccountId) {
            throw new MissingRequiredFieldException('vendorBankAccountId');
        }

        const res = await util.readRequest(
            vendorBankAccountId,
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

        return new VendorBankAccountEntity(res.data, this.metadata);
    }

    /**
     * Lists the vendor bank accounts of the Organization associated with the orgId used to login. Additionally, you can specify how many vendor bank accounts to list,
     * apply filters, and sort the list based on VendorBankAccount fields.
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
     * @param   {[object]}  [params.sort = []]          sort results by fields of a vendor bank account
     *
     * @return  {[object]}                              an array of VendorBankAccountEntity objects which include the vendor bank account details
     *
     * @throws  {FailedRequestException}                this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a list of VendorBankAccounts and returns an array of VendorBankAccountEntity Objects
    async list(params = {}) {
        const vendorBankAccounts = [];

        const res = await util.listRequest(this.Auth, this.entity, params);

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        /* iterate over the array of customer bank accounts sent back by the api and
        instantiate a new VendorBankAccount entity object instance, then return an
        array of the VendorBankAccount objects */
        res.data.forEach(vBankAccount => {
            const vendorBankAccount = new VendorBankAccountEntity(
                vBankAccount,
                this.metadata
            );
            vendorBankAccounts.push(vendorBankAccount);
        });

        // return array of VendorBankAccountEntity objects
        return vendorBankAccounts;
    }
}

module.exports = VendorBankAccount;
