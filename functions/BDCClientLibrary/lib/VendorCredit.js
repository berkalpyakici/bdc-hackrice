const util = require('./util');
const VendorCreditEntity = require('./Entities/VendorCreditEntity');

const IncorrectEntityException = require('./Exceptions/IncorrectEntityException');
const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * Vendor Credits are reduced adjustments of the amount owed to a Vendor.
 * This class houses the methods that manage VendorCredits.
 *
 * @param {object}  Auth   the Auth object instance the BDC object is instantiated with - contains the credentials to
 *                         call the methods
 */

class VendorCredit {
    // instantiate class with an entity type and Auth attribute for access to the credentials
    constructor(Auth) {
        this.entity = 'VendorCredit';
        this.Auth = Auth;
        this.metadata = undefined;
    }

    /**
     * Creates a new vendor credit.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208196746-VendCredit#sub-anchor-1-1" target="_blank">Create Vendor Credit</a>.
     *
     * @param   {object}    [params = {}]                                   object which holds required and optional fields for request
     * @param   {string}    params.vendorId                                 the ID of the vendor which this vendorCredit was received from
     * @param   {string}    params.refNumber                                identification for Vendor Credit, provided by vendor on credit document
     * @param   {string}    params.creditDate                               date the Vendor Credit is issued. Typically provided by vendor on credit document.
     * @param   {object[]}  params.vendorCreditLineItems                    array of vendorCreditLineItem objects
     * @param   {number}    [vendorCreditLineItem.amount = null]            total cost due for the line item (quantity x price or ratePercent x amount)
     * @param   {string}    [vendorCreditLineItem.chartOfAccountId = ""]    the system generated ID of the account that the invoice line item needs to be recorded for account tracking purposes
     * @param   {string}    [vendorCreditLineItem.departmentId = ""]        the system generated ID of the department that the invoice line item needs to be recorded for account tracking purposes
     * @param   {string}    [vendorCreditLineItem.locationId = ""]          the system generated ID of the location that the invoice line item needs to be recorded for account tracking purposes
     * @param   {string}    [vendorCreditLineItem.customerId = ""]          the system generated ID of the customer that the bill line item is coded to
     * @param   {boolean}   [vendorCreditLineItem.jobBillable = false]      denotes if the job is billable [value = true] or not [value = false]
     * @param   {string}    [vendorCreditLineItem.description = ""]         a brief description of the vendor credit that was issued by the vendor for this line item
     * @param   {string}    [vendorCreditLineItem.lineType = ""]            read only field. Enum indicating the type of the vendor credit line item.
     *                                                                      For example, the type is considered an expense if the vendor credit is not
     *                                                                      associated with an item [value = "1"] or the type is considered an item [value = "2"]
     * @param   {string}    [vendorCreditLineItem.itemId = ""]              the system generated ID of the item that the invoice line item needs to be recorded for account tracking purposes
     * @param   {number}    [vendorCreditLineItem.quantity = null]          number of items sold or the hours/days spent providing the service
     * @param   {number}    [vendorCreditLineItem.unitPrice = null]         unit price of the item purchased. Only used if line item type is item
     * @param   {string}    [vendorCreditLineItem.employeeId = ""]          the system generated ID of the employee that the invoice line item needs to be recorded for account tracking purposes
     * @param   {string}    [vendorCreditLineItem.actgClassId = ""]         the system generated ID of the accounting class that the invoice line item needs to be recorded for account tracking purposes
     * @param   {object}    params.options                                  the options object which contains the optional fields
     * @param   {string}    [params.options.glPostingDate = ""]             date the Bill is posted to user's third-party system
     * @param   {string}    [params.options.description = ""]               a brief description of the vendor credit that was issued by the vendor
     * @param   {string}    [params.options.poNumber = ""]                  the purchase order (PO) number of the bill
     * @param   {string}    [params.options.applyToBankAccountId = ""]      the bank account with which you expect to associate the vendor credit
     * @param   {string}    [params.options.applyToChartOfAccountId = ""]   the chart of account to be used for offline vendor credit
     *
     * @return  {object}                                                    the VendorEntity object which includes the vendor credit details
     *
     * @throws  {MissingRequiredFieldException}                             this exception is thrown if vendorId, refNumber, creditDate, or vendorCreditLineItems is not defined
     * @throws  {FailedRequestException}                                    this exception is thrown if the request fails - exception includes error message and error code
     */

    async create(params = {}) {
        // destructure params
        const {
            vendorId,
            refNumber,
            creditDate,
            vendorCreditLineItems,
            options = {}
        } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!vendorId) {
            throw new MissingRequiredFieldException('vendorId');
        } else if (!refNumber) {
            throw new MissingRequiredFieldException('refNumber');
        } else if (!creditDate) {
            throw new MissingRequiredFieldException('creditDate');
        } else if (!vendorCreditLineItems) {
            throw new MissingRequiredFieldException('vendorCreditLineItems');
        }

        const lineItemDefaults = {
            entity: 'VendorCreditLineItem',
            amount: null,
            chartOfAccountId: '',
            departmentId: '',
            locationId: '',
            jobId: '',
            customerId: '',
            jobBillable: false,
            description: '',
            itemId: '',
            quantity: null,
            unitPrice: null,
            employeeId: '',
            actgClassId: ''
        };

        const completeLineItems = [];

        /* iterate over the vendorCreditLineItems passed in, validate that required fields are defined on each
        lineitem, create a new complete lineItem object which includes optional fields with the default values */
        vendorCreditLineItems.forEach(vendorCreditLineItem => {
            // destructure required field(s) from nested entity
            const { amount } = vendorCreditLineItem;

            // throw error if required field is missing
            if (!amount) {
                throw new MissingRequiredFieldException('amount');
            }

            // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
            const completeLineItem = Object.assign(
                {},
                lineItemDefaults,
                vendorCreditLineItem
            );

            // populate the completeLineitems array with the newly made lineItem object
            completeLineItems.push(completeLineItem);
        });

        params.vendorCreditLineItems = completeLineItems;

        // initialize default field values for optional fields
        const defaults = {
            glPostingDate: '',
            description: '',
            poNumber: '',
            applyToBankAccountId: '',
            applyToChartOfAccountId: ''
        };

        // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
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
            `${this.Auth.env}/Crud/Create/VendorCredit.json`,
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

        // from response data and metadata create appropriate entity object to be returned
        const vendorCredit = util.generateEntityWithNestedEntities(
            'VendorCredit',
            this.metadata,
            res.data
        );

        return vendorCredit;
    }

    /**
     * Gets the details of a vendor credit.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208196746-VendCredit#sub-anchor-1-2" target="_blank">Read Vendor Credit</a>.
     *
     * @param   {string}  vendorCreditId            the system generated vendor credit ID to fetch the vendor credit record from the database
     *
     * @return  {object}                            the VendorCreditEntity object that includes the vendor credit details
     *
     * @throws {MissingRequiredFieldException}      this exception is thrown if vendorCreditId is not defined
     * @throws {FailedRequestException}             this exception is thrown if the request fails - exception includes error message and error code
     */

    async read(vendorCreditId) {
        // throw an error if minimum required field(s) are not passed in
        if (!vendorCreditId) {
            throw new MissingRequiredFieldException('vendorCreditId');
        }

        const res = await util.readRequest(
            vendorCreditId,
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

        // from response data and metadata create appropriate entity object to be returned
        const vendorCredit = util.generateEntityWithNestedEntities(
            'VendorCredit',
            this.metadata,
            res.data
        );

        return vendorCredit;
    }

    /**
     * Lists the vendor credits of the Organization associated with the orgId used to login. Additionally, you can specify how many vendor credits to list,
     * apply filters, and sort the list based on vendor credit fields.
     * If the request fails, the FailedRequestException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/210136993-List" target="_blank">List</a>.
     *
     *
     * @param   {object}    [params = {}]               object which holds required and optional fields for request
     * @param   {boolean}   [params.nested = true]      if true, includes nested related data
     * @param   {number}    [params.start = 0]          the starting pagination index. Define start as 0 for the first listing.
     * @param   {number}    [params.max = 99]           the maximum number of objects that needs to be returned from the starting index
     * @param   {[object]}  [params.filters = []]       filters the results that match the criteria.
     *                                                  For more information, see <a href="https://developer.bill.com/hc/en-us/articles/210136993-List#sub-anchor-1-5" target="_blank">Filters</a>.
     * @param   {[object]}  [params.sort = []]          sort results by fields of a bill
     *
     * @return  {[object]}                              an array of VendorCreditEntity objects that include the vendor credit details
     *
     * @throws  {FailedRequestException}                this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a list of vendor credits and returns an array of VendorCreditEntity Objects
    async list(params = {}) {
        const vendorCredits = [];

        const res = await util.listRequest(this.Auth, this.entity, params);

        // if metadata attribute has not been assigned fetch entity metadata to place on Entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        /* iterate over the array of vendorCredits sent back by the api and instantiate a new Bill entity object instance,
            then return an array of the Bill objects */
        res.data.forEach(async v => {
            // from response data and metadata create appropriate entity object to be returned
            const vendorCredit = util.generateEntityWithNestedEntities(
                'VendorCredit',
                this.metadata,
                v
            );

            vendorCredits.push(vendorCredit);
        });

        // return array of BillEntity Objects
        return vendorCredits;
    }

    /**
     * Updates the details in a vendor credit.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208196746-VendCredit#sub-anchor-1-3" target="_blank">Update Vendor Credit</a>.
     *
     * @param  {object}  vendorCreditEntity     <a href="index.html#vendorcreditentity" target="_blank">a VendorCreditEntity object</a> - fields that differ from the vendor credit record are overwritten
     *
     * @return {object}                         the VendorCreditEntity object with the updated vendor credit details
     *
     * @throws {MissingRequiredFieldException}  this exception is thrown if vendorCreditEntity is not defined
     * @throws {IncorrectEntityException}       this exception is thrown if the object passed in is not of type VendorCreditEntity
     * @throws {FailedRequestException}         this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes a BillEntity object instance and, based on the id
    attribute, updates the Bill record in the database with the attributes of the
    BillEntity Object */
    async update(vendorCreditEntity) {
        /* throw an error if minimum required field(s) are not passed in
        and throw an error if the object passed in is of the wrong entity type */
        if (!vendorCreditEntity) {
            throw new MissingRequiredFieldException('VendorCreditEntity');
        } else if (!(vendorCreditEntity instanceof VendorCreditEntity)) {
            throw new IncorrectEntityException(
                vendorCreditEntity.entity,
                this.entity
            );
        }

        // take lineitems argument and generate a string version of the key value pairs to include in the request body
        const vendorCreditLineItemsData = util.generateNestedEntitiesString(
            vendorCreditEntity.vendorCreditLineItems,
            'VendorCreditLineItem'
        );

        // build out request body from arguments, and set default values for what is not passed in
        const data = {
            data: `{
                "obj": {
                    "entity": "${this.entity}",
                    "id": "${vendorCreditEntity.id}",
                    "isActive": "${vendorCreditEntity.isActive}",
                    "vendorId": "${vendorCreditEntity.vendorId}",
                    "refNumber": "${vendorCreditEntity.refNumber}",
                    "approvalStatus": "${vendorCreditEntity.approvalStatus}",
                    "creditDate": "${vendorCreditEntity.creditDate}",
                    "glPostingDate": "${vendorCreditEntity.glPostingDate}",
                    "amount": ${vendorCreditEntity.amount},
                    "appliedAmount": ${vendorCreditEntity.appliedAmount},
                    "creditStatus": "${vendorCreditEntity.creditStatus}",
                    "description": "${vendorCreditEntity.description}",
                    "createdTime": "${vendorCreditEntity.createdTime}",
                    "updatedTime": "${vendorCreditEntity.updatedTime}",
                    "vendorCreditLineItems": ${vendorCreditLineItemsData}
                }
            }`
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/Crud/Update/VendorCredit.json`,
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

        // from response data and metadata create appropriate entity object to be returned
        const vendorCredit = util.generateEntityWithNestedEntities(
            'VendorCredit',
            this.metadata,
            res.data
        );

        return vendorCredit;
    }
}

module.exports = VendorCredit;
