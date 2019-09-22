const util = require('./util');
const RecurringBillEntity = require('./Entities/RecurringBillEntity');

const IncorrectEntityException = require('./Exceptions/IncorrectEntityException');
const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * A Recurring Bill represents an identical bill created periodically for a Vendor. This is a template used to automatically
 * generate bills at a specified time and interval.
 * This class houses the methods that manage Recurring Bills.
 *
 * @param {object} Auth Auth  object instance the BDC object is instantiated with - contains the credentials to
 *                            call the methods
 */

// class which houses instance methods regarding RecurringBill Entities
class RecurringBill {
    // instantiate class with an Entity type and Auth attribute for access to the credentials
    constructor(Auth) {
        this.entity = 'RecurringBill';
        this.Auth = Auth;
        this.metadata = undefined;
    }

    /**
     * Creates a new recurring bill.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/213911066-RecurringBill#sub-anchor-1-1" target="_blank">Create Recurring Bill</a>.
     *
     * @param   {object}    [params = {}]                                           object which holds required and optional fields
     * @param   {string}    params.vendorId                                         the system generated ID of the vendor who sent this bill
     * @param   {string}    params.timePeriod                                       denotes how often the bill needs to be generated (daily [value = "0"], weekly [value = "1"], monthly [value = "2"], yearly [value = "3"], and none [value = "9"])
     * @param   {string}    params.frequencyPerTimePeriod                           defines how many times the bill needs to be generated during the defined time period
     * @param   {string}    params.nextDueDate                                      sets the due date of the next bill
     * @param   {string}    params.daysInAdvance                                    defines how many days in advance from the the nextDueDate, the next bill needs to be generated. If this date has already occurred for one or more
     *                                                                              bill, those bills are generated on the date the recurring bill details are defined.
     * @param   {object[]}  params.recurringBillLineItems                           an array of recurringBillLineItem objects
     * @param   {number}    params.recurringBillLineItems.amount                    required - total cost for the line item
     * @param   {string}    [params.recurringBillLineItems.chartOfAccountId = ""]   optional - the system generated ID of the account that the bill line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.recurringBillLineItems.departmentId = ""]       optional - the system generated ID of the department that the bill line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.recurringBillLineItems.locationId = ""]         optional - the system generated ID of the location that the bill line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.recurringBillLineItems.description = ""]        optional - a brief description of the goods/services
     * @param   {object}    params.options                                          the options object which contains the optional fields
     * @param   {string}    [params.options.isActive = "1"]                         denotes if the recurring bill is active [value = "1"] or inactive [value = "2"]
     * @param   {string}    [params.options.endDate = ""]                           the date after which the recurring bill no longer needs to be generated
     * @param   {string}    [params.options.description = ""]                       a brief description of the recurring bill
     *
     * @return  {object}                                                            the RecurringBillEntity object which includes the recurring bill details
     *
     * @throws {MissingRequiredFieldException}                                      this exception is thrown if the vendorId, timePeriod, frequencyPerTimePeriod, nextDueDate, daysInAdvance, or recurringBillLineItems is not defined
     * @throws {FailedRequestException}                                             this exception is thrown if the request fails - exception includes error message and error code
     */

    /* Method which takes a name (string) and an options object, from those arguments
    builds the body of a create request, makes a request to create a Bill, and if
    successful returns a Bill entity object */
    async create(params = {}) {
        const {
            vendorId,
            timePeriod,
            frequencyPerTimePeriod,
            nextDueDate,
            daysInAdvance,
            recurringBillLineItems,
            options = {}
        } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!vendorId) {
            throw new MissingRequiredFieldException('vendorId');
        } else if (!timePeriod) {
            throw new MissingRequiredFieldException('timePeriod');
        } else if (!frequencyPerTimePeriod) {
            throw new MissingRequiredFieldException('frequencyPerTimePeriod');
        } else if (!nextDueDate) {
            throw new MissingRequiredFieldException('nextDueDate');
        } else if (!daysInAdvance) {
            throw new MissingRequiredFieldException('daysInAdvance');
        } else if (!recurringBillLineItems) {
            throw new MissingRequiredFieldException('recurringBillLineItems');
        }

        const lineItemDefaults = {
            entity: 'RecurringBillLineItem',
            amount: null, // will be overwritten
            chartOfAccountId: '',
            departmentId: '',
            locationId: '',
            description: ''
        };

        // initialize a complete line items array
        const completeLineItems = [];

        /* iterate over the recurringBillLineItems passed in, validate that required fields are defined on each
        lineitem, create a new complete lineItem object which includes optional fields with the default values */
        recurringBillLineItems.forEach(recurringBillLineItem => {
            // destructure required field(s) from nested entity
            const { amount } = recurringBillLineItem;

            // throw error if required field is missing
            if (!amount) {
                throw new MissingRequiredFieldException('amount');
            }

            // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
            const completeLineItem = Object.assign(
                {},
                lineItemDefaults,
                recurringBillLineItem
            );

            // populate the completeLineitems array with the newly made lineItem object
            completeLineItems.push(completeLineItem);
        });

        params.recurringBillLineItems = completeLineItems;

        // destructure options and set default values
        const defaults = {
            entity: 'RecurringBill',
            isActive: '1',
            endDate: '',
            description: ''
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
            `${this.Auth.env}/Crud/Create/RecurringBill.json`,
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
        const bill = util.generateEntityWithNestedEntities(
            'RecurringBill',
            this.metadata,
            res.data
        );

        return bill;
    }

    /**
     * Gets the details of a recurring bill.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/213911066-RecurringBill#sub-anchor-1-2" target="_blank">Read Recurring Bill</a>.
     *
     * @param   {string}  recurringBillId           the system generated bill ID to fetch the recurring bill record from the database
     *
     * @return  {object}                            the RecurringBillEntity object that includes the recurring bill details
     *
     * @throws {MissingRequiredFieldException}      this exception is thrown if recurringBillID is not defined
     * @throws {FailedRequestException}             this exception is thrown if the request fails - exception includes error message and error code
     */

    async read(recurringBillId) {
        // throw an error if minimum required field(s) are not passed in
        if (!recurringBillId) {
            throw new MissingRequiredFieldException('recurringBillId');
        }

        const res = await util.readRequest(
            recurringBillId,
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
        const bill = util.generateEntityWithNestedEntities(
            'RecurringBill',
            this.metadata,
            res.data
        );

        return bill;
    }

    /**
    * Lists the recurring bills of the Organization associated with the orgId used to login. Additionally, you can specify how many recurring bills to list,
    * apply filters, and sort the list based on recurring bill fields.
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
     *                                                  For more information, see <a href="https://developer.bill.com/hc/en-us/articles/210136993-List#sub-anchor-1-5" target="_blank">Filters</a>.
     * @param   {[object]}  [params.sort = []]          sort results by fields of a recurring bill
     *
     * @return  {[object]}                              an array of RecurringBillEntity objects
     *
     * @throws  {FailedRequestException}                this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a list of Bills and returns an array of BillEntity objects
    async list(params = {}) {
        const recurringBills = [];

        const res = await util.listRequest(this.Auth, this.entity, params);

        // if metadata attribute has not been assigned fetch entity metadata to place on Eetity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        /* iterate over the array of bills sent back by the API and instantiate a new Bill Entity Object instance,
        then return an array of the Bill Objects */
        res.data.forEach(async r => {
            // from response data and metadata create appropriate entity object to be returned
            const bill = util.generateEntityWithNestedEntities(
                'RecurringBill',
                this.metadata,
                r
            );

            recurringBills.push(bill);
        });

        // return array of BillEntity objects
        return recurringBills;
    }

    /**
     * Updates the details in a recurring bill.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208155326-Bill#sub-anchor-1-3" target="_blank">Update Recurring Bill</a>.
     *
     * @param  {object}  billEntity             <a href="index.html#recurringbillentity" target="_blank">a RecurringBillEntity object</a> - fields that differ from the recurring bill record are overwritten
     *
     * @return {object}                         the RecurringBillEntity object with the updated recurring bill details
     *
     * @throws {MissingRequiredFieldException}  this exception is thrown if recurringBillEntity is not defined
     * @throws {IncorrectEntityException}       this exception is thrown if the object passed in is not of type recurringBillEntity
     * @throws {FailedRequestException}         this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes a BillEntity object instance and, based on the id
    attribute, updates the Bill record in the database with the attributes of the
    BillEntity object */
    async update(recurringBillEntity) {
        /* throw an error if minimum required field(s) are not passed in
        and throw an error if the object passed in is of the wrong entity type */
        if (!recurringBillEntity) {
            throw new MissingRequiredFieldException('recurringBillEntity');
        } else if (!(recurringBillEntity instanceof RecurringBillEntity)) {
            throw new IncorrectEntityException(
                recurringBillEntity.entity,
                this.entity
            );
        }

        // take lineitems argument and generate a string version of the key value pairs to include in the request body
        const recurringBillLineItemsData = util.generateNestedEntitiesString(
            recurringBillEntity.recurringBillLineItems,
            'RecurringBillLineItem'
        );

        // build out request body from arguments, and set default values for what is not passed in
        const data = {
            data: `{
                "obj": {
                    "entity": "${this.entity}",
                    "id": "${recurringBillEntity.id}",
                    "isActive": "${recurringBillEntity.isActive}",
                    "vendorId": "${recurringBillEntity.vendorId}",
                    "invoiceNumber": "${recurringBillEntity.invoiceNumber}",
                    "invoiceDate": "${recurringBillEntity.invoiceDate}",
                    "dueDate": "${recurringBillEntity.dueDate}",
                    "glPostingDate": "${recurringBillEntity.glPostingDate}",
                    "description": "${recurringBillEntity.description}",
                    "poNumber": "${recurringBillEntity.poNumber}",
                    "payFromBankAccountId": "${recurringBillEntity.payFromBankAccountId}",
                    "payFromChartOfAccountId": "${recurringBillEntity.payFromChartOfAccountId}",
                    "recurringBillLineItems": ${recurringBillLineItemsData}
                }
            }`
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/Crud/Update/RecurringBill.json`,
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
        const bill = util.generateEntityWithNestedEntities(
            'RecurringBill',
            this.metadata,
            res.data
        );

        return bill;
    }
}

module.exports = RecurringBill;
