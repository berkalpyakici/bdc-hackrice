const util = require('./util');
const VendorEntity = require('./Entities/VendorEntity');

const IncorrectEntityException = require('./Exceptions/IncorrectEntityException');
const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * A Vendor provides goods or services to the organization.
 * This class houses the methods that manage Vendors.
 *
 * @param {object} Auth the Auth object instance the BDC object is instantiated with - contains the credentials to
 * call the methods
 */

// class which houses instance methods regarding Vendor Entities
class Vendor {
    // instantiate class with an Entity type and Auth attribute for access to the credentials
    constructor(Auth) {
        this.entity = 'Vendor';
        this.Auth = Auth;
        this.metadata = undefined;
    }

    /**
     * Creates a new vendor.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/209605773-Vendor#sub-anchor-2-1" target="_blank">Create Vendor</a>.
     *
     * @param   {object}  params                                    object which holds required and optional fields
     * @param   {string}  params.name                               the name of the vendor
     * @param   {object}  params.options                            the options object which contains the optional fields
     * @param   {string}  [params.options.isActive="1"]             denotes if the vendor is active [value = "1"] or inactive [value = "2"]
     * @param   {string}  [params.options.shortName = ""]           the short version of the vendor's name
     * @param   {string}  [params.options.nameOnCheck = ""]         the name printed on the Pay To field of the  check or ACH addendum when payments are made.
     *                                                              If empty, vendor name is used instead.
     * @param   {string}  [params.options.companyName = ""]         name of the vendor's company
     * @param   {string}  [params.options.accNumber = ""]           a code or name to identify the vendor
     * @param   {string}  [params.options.taxId = ""]               the tax ID of the vendor. It is used by the accounting systems for 1099 reporting.
     * @param   {boolean} [params.options.track1099 = false]        if true, indicates that the vendor is a 1099 vendor
     * @param   {string}  [params.options.address1 = ""]            first line of the address
     * @param   {string}  [params.options.address2 = ""]            second line of the address
     * @param   {string}  [params.options.address3 = ""]            third line of the address
     * @param   {string}  [params.options.address4 = ""]            fourth line of the address
     * @param   {string}  [params.options.addressCity = ""]         the city
     * @param   {string}  [params.options.addressState = ""]        the state/county/province/region. Enter the state abbreviation for state.
     * @param   {string}  [params.options.addressZip = ""]          the ZIP code or postal code
     * @param   {string}  [params.options.addressCountry = ""]      the country
     * @param   {string}  [params.options.email = ""]               the primary email of the vendor
     * @param   {string}  [params.options.fax = ""]                 the fax number of the vendor
     * @param   {string}  [params.options.phone = ""]               the phone number of the vendor
     * @param   {string}  [params.options.paymentEmail = ""]        the email the payment notifications needs to be sent. If empty, the notifications
     *                                                              are sent to the primary email.
     * @param   {string}  [params.options.description = ""]         a brief description of the vendor
     * @param   {string}  [params.options.contactFirstName = ""]    first name of the vendor
     * @param   {string}  [params.options.contactLastName = ""]     last name of the vendor
     * @param   {string}  [params.options.accountType = "0"]        type of the account. The default value is "0". If the vendor runs a business, assign the value "1".
     *                                                              If the vendor is an individual that provides goods/services, assign the value "2".
     *
     * @return  {object}                                            the VendorEntity object which includes the details of the vendor
     *
     * @throws {MissingRequiredFieldException}                      this exception is thrown if the name is not defined
     * @throws {FailedRequestException}                             this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes a name (string) and an options object, from those arguments
    builds the body of a create request, makes a request to create a Vendor, and if
    successful returns a Vendor Entity Object */
    async create(params = {}) {
        const { name, options = {} } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!name) {
            throw new MissingRequiredFieldException('name');
        }

        // destructure options and set default values
        const defaults = {
            isActive: '1',
            shortName: '',
            nameOnCheck: '',
            companyName: '',
            accNumber: '',
            taxId: '',
            track1099: false,
            address1: '',
            address2: '',
            address3: '',
            address4: '',
            addressCity: '',
            addressState: '',
            addressZip: '',
            addressCountry: '',
            email: '',
            fax: '',
            phone: '',
            paymentEmail: '',
            paymentPhone: '',
            description: '',
            contactFirstName: '',
            contactLastName: '',
            accountType: '0'
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
            `${this.Auth.env}/Crud/Create/Vendor.json`,
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

        return new VendorEntity(res.data, this.metadata);
    }

    /**
     * Gets the details of a vendor.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/209605773-Vendor#sub-anchor-2-2" target="_blank">Read Vendor</a>.
     *
     * @param   {string}  vendorId               the vendor reference ID to fetch the vendor record from the database
     *
     * @return  {object}                         the VendorEntity object which includes the vendor details
     *
     * @throws {MissingRequiredFieldException}   this exception is thrown if vendorId is not defined
     * @throws {FailedRequestException}          this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a single Vendor based on the id and returns a VendorEntity Object
    async read(vendorId) {
        // throw an error if minimum required field(s) are not passed in
        if (!vendorId) {
            throw new MissingRequiredFieldException('vendorId');
        }

        const res = await util.readRequest(vendorId, this.Auth, this.entity);

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        return new VendorEntity(res.data, this.metadata);
    }

    /**
     * Lists the vendors of the Organization associated with the orgId used to login. Additionally, you can specify how many vendors to list,
     * apply filters, and sort the list based on vendor fields.
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
     * @param   {[object]}  [params.sort = []]          sort results by fields of an vendor
     *
     * @return  {[object]}                              an array of VendorEntity objects which include the vendor details
     *
     * @throws  {FailedRequestException}                this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a list of Vendors and returns an array of VendorEntity Objects
    async list(params = {}) {
        const vendors = [];
        const res = await util.listRequest(this.Auth, this.entity, params);

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        /* iterate over the array of customer bank accounts sent back by the api and
        instantiate a new Vendor entity object instance, then return an
        array of the Vendor objects */
        res.data.forEach(v => {
            const vendor = new VendorEntity(v, this.metadata);
            vendors.push(vendor);
        });

        // return array of VendorEntity objects
        return vendors;
    }

    /**
     * Updates the details of a vendor.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/209605773-Vendor#sub-anchor-2-3" target="_blank">Update Vendor</a>.
     *
     * @param   {object}  vendorEntity          a <a href="index.html#vendorentity" target="_blank">VendorEntity object</a> - fields which differ from the current vendor record are overwritten
     *
     * @return {object}                         a endorEntity object with the updated vendor details
     *
     * @throws {MissingRequiredFieldException}  this exception is thrown if vendorEntity is not defined
     * @throws {IncorrectEntityException}       this exception is thrown if the object passed in is not of type VendorEntity
     * @throws {FailedRequestException}         this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes a VendorEntity object instance and, based on the ID
    attribute, updates the Vendor record in the DB with the attributes of the
    VendorEntity Object */
    async update(vendorEntity) {
        /* throw an error if minimum required field(s) are not passed in
        and throw an error if the object passed in is of the wrong entity type */
        if (!vendorEntity) {
            throw new MissingRequiredFieldException('VendorEntity');
        } else if (!(vendorEntity instanceof VendorEntity)) {
            throw new IncorrectEntityException(
                vendorEntity.entity,
                this.entity
            );
        }

        // build out request body from arguments, and set default values for what is not passed in
        const data = {
            data: `{
                "obj": {
                    "entity": "${this.entity}",
                    "id": "${vendorEntity.id}",
                    "isActive": "${vendorEntity.isActive}",
                    "name": "${vendorEntity.name}",
                    "shortName": "${vendorEntity.shortName}",
                    "nameOnCheck": "${vendorEntity.nameOnCheck}",
                    "companyName": "${vendorEntity.companyName}",
                    "accNumber": "${vendorEntity.accNumber}",
                    "taxId": "${vendorEntity.taxId}",
                    "track1099": ${vendorEntity.track1099},
                    "address1": "${vendorEntity.address1}",
                    "address2": "${vendorEntity.address2}",
                    "address3": "${vendorEntity.address3}",
                    "address4": "${vendorEntity.address4}",
                    "addressCity": "${vendorEntity.addressCity}",
                    "addressState": "${vendorEntity.addressState}",
                    "addressZip": "${vendorEntity.addressZip}",
                    "addressCountry": "${vendorEntity.addressCountry}",
                    "email": "${vendorEntity.email || ''}",
                    "fax": "${vendorEntity.fax}",
                    "phone": "${vendorEntity.phone}",
                    "paymentEmail": "${vendorEntity.paymentEmail || ''}",
                    "paymentPhone": "${vendorEntity.paymentPhone}",
                    "description": "${vendorEntity.description}",
                    "contactFirstName": "${vendorEntity.contactFirstName}",
                    "contactLastName": "${vendorEntity.contactLastName}",
                    "accountType": "${vendorEntity.accountType}"
                }
            }`
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/Crud/Update/Vendor.json`,
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

        return new VendorEntity(res.data, this.metadata);
    }
}

module.exports = Vendor;
