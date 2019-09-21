const util = require('./util');
const CustomerEntity = require('./Entities/CustomerEntity');

const IncorrectEntityException = require('./Exceptions/IncorrectEntityException');
const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * A Customer consumes goods or services from your organization.
 * This class houses the methods that manage Customers.
 *
 * @param {object} Auth the Auth object instance the BDC object is instantiated with - contains the credentials to
 * call the methods
 */

// class which houses instance methods regarding Customer Entities
class Customer {
    // instantiate class with an Entity type and Auth attribute for access to the credentials
    constructor(Auth) {
        this.entity = 'Customer';
        this.Auth = Auth;
        this.metadata = undefined;
    }

    /**
     * Creates a new customer.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208182666-Customer#sub-anchor-1-1" target="_blank">Create Customer</a>.
     *
     * @param   {object}  params                                   object which holds required and optional fields
     * @param   {string}  params.name                              the name of the customer
     * @param   {object}  params.options                           the options object which contains the optional fields
     * @param   {string}  [params.options.isActive="1"]            denotes if the customer is active [value="1"] or inactive [value="2"]
     * @param   {string}  [params.options.shortName=""]            the short version of the customer's name
     * @param   {string}  [params.options.parentCustomerId=""]     the ID of the parent object (denotes this object as child object)
     * @param   {string}  [params.options.companyName=""]          name of the customer's company
     * @param   {string}  [params.options.contactFirstName=""]     first name of the customer
     * @param   {string}  [params.options.contactLastName=""]      last name of the customer
     * @param   {string}  [params.options.accNumber=""]            a code or name to identify the customer
     * @param   {string}  [params.options.billAddress1=""]         first line of the billing address
     * @param   {string}  [params.options.billAddress2=""]         second line of the billing address
     * @param   {string}  [params.options.billAddress3=""]         third line of the billing address
     * @param   {string}  [params.options.billAddress4=""]         fourth line of the billing address
     * @param   {string}  [params.options.billAddressCity=""]      the city
     * @param   {string}  [params.options.billAddressState=""]     the state/county/province/region. Enter the state abbreviation for state.
     * @param   {string}  [params.options.billAddressCountry=""]   the country
     * @param   {string}  [params.options.billAddressZip=""]       the ZIP code or postal code
     * @param   {string}  [params.options.shipAddress1=""]         first line of the shipping address
     * @param   {string}  [params.options.shipAddress2=""]         second line of the shipping address
     * @param   {string}  [params.options.shipAddress3=""]         third line of the shipping address
     * @param   {string}  [params.options.shipAddress4=""]         fourth line of the shipping address
     * @param   {string}  [params.options.shipAddressCity=""]      the city
     * @param   {string}  [params.options.shipAddressState=""]     the state/county/province/region. Enter the state abbreviation for state.
     * @param   {string}  [params.options.shipAddressCountry=""]   the country
     * @param   {string}  [params.options.shipAddressZip=""]       the ZIP code or postal code
     * @param   {string}  [params.options.email=""]                the email of the customer
     * @param   {string}  [params.options.phone=""]                the phone number of the customer
     * @param   {string}  [params.options.altPhone=""]             the alternative phone number of the customer
     * @param   {string}  [params.options.fax=""]                  the fax number of the customer
     * @param   {string}  [params.options.description=""]          a description of the customer
     * @param   {string}  [params.options.printAs=""]
     * @param   {string}  [params.options.accountType="0"]         the type of the account. The default value is "0". If the customer runs a business, assign the value "1".
     *                                                             If the customer is an individual consuming your goods/services, assign the value "2".
     *
     * @return  {object}                                           the CustomerEntity object which includes the details of the customer
     *
     * @throws {MissingRequiredFieldException}                     this exception is thrown if the name is not defined
     * @throws {FailedRequestException}                            this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes a name (string) and an options object, from those arguments
    builds the body of a create request, makes a request to create a Customer, and if
    successful returns a Customer entity Object */
    async create(params = {}) {
        // destructured params object
        const { name, options = {} } = params;
        // throw an error if minimum required field(s) are not passed in
        if (!name) {
            throw new MissingRequiredFieldException('name');
        }

        // default values for request body
        const defaults = {
            isActive: '1',
            shortName: '',
            parentCustomerId: '',
            companyName: '',
            contactFirstName: '',
            contactLastName: '',
            accNumber: '',
            billAddress1: '',
            billAddress2: '',
            billAddress3: '',
            billAddress4: '',
            billAddressCity: '',
            billAddressState: '',
            billAddressCountry: '',
            billAddressZip: '',
            shipAddress1: '',
            shipAddress2: '',
            shipAddress3: '',
            shipAddress4: '',
            shipAddressCity: '',
            shipAddressState: '',
            shipAddressCountry: '',
            shipAddressZip: '',
            email: '',
            phone: '',
            altPhone: '',
            fax: '',
            description: '',
            printAs: '',
            accountType: '1'
        };

        // Order of sources determines what gets overwritten
        const optionalParams = Object.assign({}, defaults, options);

        const dataString = util.convertParamsToDataString(
            params,
            optionalParams,
            this.entity
        );

        const data = {
            data: dataString
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/Crud/Create/Customer.json`,
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

        return new CustomerEntity(res.data, this.metadata);
    }

    /**
     * Gets the details of a customer.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208182666-Customer#sub-anchor-1-2" target="_blank">Read Customer</a>.
     *
     * @param   {string}  customerId            the customer reference ID to fetch the customer record from the database
     *
     * @return  {object}                        the CustomerEntity object which includes the customer details
     *
     * @throws  {MissingRequiredFieldException} this exception is thrown if the customerId is not defined
     * @throws  {FailedRequestException}        this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a single Customer based on the id passed in and returns a CustomerEntity Object
    async read(customerId) {
        // throw an error if minimum required field(s) are not passed in
        if (!customerId) {
            throw new MissingRequiredFieldException('customerId');
        }

        const res = await util.readRequest(customerId, this.Auth, this.entity);

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        return new CustomerEntity(res.data, this.metadata);
    }

    /**
     * Lists the customers of the Organization associated with the orgId used to login. Additionally, you can specify how many customers to list,
     * apply filters, and sort the list based on customer fields.
     * If the request fails, the FailedRequestException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/210136993-List" target="_blank">List</a>.
     *
     * @param   {object}    [params = {}]               object which holds required and optional fields
     * @param   {boolean}   [params.nested = true]      if true, includes nested related data
     * @param   {number}    [params.start = 0]          the starting pagination index. Define start as 0 for the first listing.
     * @param   {number}    [params.max = 99]           the maximum number of objects that needs to be returned from the starting index
     * @param   {[object]}  [params.filters = []]       filters the results that match the criteria.
     *                                                  For more information, see <a href="https://developer.bill.com/hc/en-us/articles/210136993-List#sub-anchor-1-5" target="_blank">Filters.</a>
     * @param   {[object]}  [params.sort = []]          sort results by fields of a customer
     *
     * @return  {[object]}                              an array of CustomerEntity objects which include the customer details
     *
     * @throws  {FailedRequestException}                this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a list of Customers and returns an array of CustomerEntity Objects
    async list(params = {}) {
        const customers = [];

        const res = await util.listRequest(this.Auth, this.entity, params);

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        /* Iterate over the array of customer bank accounts sent back by the api and
        instantiate a new Customer entity object instance, then return an
        array of the Customer objects */
        res.data.forEach(async c => {
            const customer = new CustomerEntity(c, this.metadata);
            customers.push(customer);
        });

        // return array of CustomerEntity Objects
        return customers;
    }

    /**
     * Updates the details of a customer.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208182666-Customer#sub-anchor-1-3" target="_blank">Update Customer</a>.
     *
     * @param {object} customerEntity           a <a href="index.html#customerentity" target="_blank">CustomerEntity object</a> - fields which differ from the current customer record are
     *                                          overwritten
     *
     * @return {object}                         a CustomerEntity object with the updated customer details
     *
     * @throws {MissingRequiredFieldException}  this exception is thrown if customerEntity is not defined
     * @throws {IncorrectEntityException}       this exception is thrown if the object passed in is not of type CustomerEntity
     * @throws {FailedRequestException}         this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes a CustomerEntity object instance and, based on the ID
    attribute, updates the Customer record in the DB with the attributes of the
    CustomerEntity Object */
    async update(customerEntity) {
        /* throw an error if minimum required field(s) are not passed in
        and throw an error if the object passed in is of the wrong entity type */
        if (!customerEntity) {
            throw new MissingRequiredFieldException('CustomerEntity');
        } else if (!(customerEntity instanceof CustomerEntity)) {
            throw new IncorrectEntityException(
                customerEntity.entity,
                this.entity
            );
        }

        // build out request body from arguments, and set default values for what is not passed in
        const data = {
            data: `{
                "obj": {
                    "entity": "${this.entity}",
                    "id": "${customerEntity.id}",
                    "isActive": "${customerEntity.isActive}",
                    "name": "${customerEntity.name}",
                    "shortName": "${customerEntity.shortName}",
                    "parentCustomerId": "${customerEntity.parentCustomerId}",
                    "companyName": "${customerEntity.companyName}",
                    "contactFirstName": "${customerEntity.contactFirstName}",
                    "contactLastName": "${customerEntity.contactLastName}",
                    "accNumber": "${customerEntity.accNumber}",
                    "billAddress1": "${customerEntity.billAddress1}",
                    "billAddress2": "${customerEntity.billAddress2}",
                    "billAddress3": "${customerEntity.billAddress3}",
                    "billAddress4": "${customerEntity.billAddress4}",
                    "billAddressCity": "${customerEntity.billAddressCity}",
                    "billAddressState": "${customerEntity.billAddressState}",
                    "billAddressCountry": "${
                        customerEntity.billAddressCountry
                    }",
                    "billAddressZip": "${customerEntity.billAddressZip}",
                    "shipAddress1": "${customerEntity.shipAddress1}",
                    "shipAddress2": "${customerEntity.shipAddress2}",
                    "shipAddress3": "${customerEntity.shipAddress3}",
                    "shipAddress4": "${customerEntity.shipAddress4}",
                    "shipAddressCity": "${customerEntity.shipAddressCity}",
                    "shipAddressState": "${customerEntity.shipAddressState}",
                    "shipAddressCountry": "${
                        customerEntity.shipAddressCountry
                    }",
                    "shipAddressZip": "${customerEntity.shipAddressZip}",
                    "email": "${customerEntity.email || ''}",
                    "phone": "${customerEntity.phone}",
                    "altPhone": "${customerEntity.altPhone}",
                    "fax": "${customerEntity.fax}",
                    "description": "${customerEntity.description}",
                    "printAs": "${customerEntity.printAs}",
                    "accountType": "${customerEntity.accountType}"
                }
            }`
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/Crud/Update/Customer.json`,
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

        return new CustomerEntity(res.data, this.metadata);
    }

    /**
     * Grants permission for the organization to directly charge a customer.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/215507363-SetCustomerAuthorization" target="_blank">Set Customer Authorization</a>.
     *
     * @param   {string}  customerId            the customer reference ID that is unique to a customer record
     * @param   {boolean} hasAuthorizedToCharge argument which determines if the customer can be charged directly.
     *                                          If the value is set to true, the customer can be charged directly.
     *
     * @return  {object}                        the CustomerEntity object with the updated hasAuthorizedToCharge value
     *
     * @throws {MissingRequiredFieldException}  this exception is thrown if customerId or hasAuthorizedToCharge is not defined
     * @throws {FailedRequestException}         this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes a customerId (string) and hasAuthorizedToCharge (boolean)
    and based on the customerId updates the customer's hasAuthorizationToCharge
    attribute in the database to true or false */
    async setCustomerAuthorization(customerId, hasAuthorizedToCharge) {
        // throw an error if minimum required field(s) are not passed in
        if (!customerId) {
            throw new MissingRequiredFieldException('customerId');
        } else if (hasAuthorizedToCharge === undefined) {
            throw new MissingRequiredFieldException('hasAuthorizedToCharge');
        }

        const data = {
            data: `{
                "customerId": "${customerId}",
                "hasAuthorizedToCharge": ${hasAuthorizedToCharge}
            }`
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/SetCustomerAuthorization.json`,
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

        return new CustomerEntity(res.data, this.metadata);
    }
}

module.exports = Customer;
