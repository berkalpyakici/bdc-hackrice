const util = require('./util');
const BillEntity = require('./Entities/BillEntity');

const IncorrectEntityException = require('./Exceptions/IncorrectEntityException');
const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * A Bill is a document received from a vendor with the details of the products/services that were purchased from them.
 * This class houses the methods that manage Bills.
 *
 * @param   {object}     Auth   Auth object instance the BDC object is instantiated with - contains the credentials to
 * call the methods
 */

// class which houses instance methods regarding Bill Entities
class Bill {
    // instantiate class with an entity type and Auth attribute for access to the credentials
    constructor(Auth) {
        this.entity = 'Bill';
        this.Auth = Auth;
        this.metadata = undefined;
    }

    /**
     * Creates a new bill.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208155326-Bill#sub-anchor-1-1" target="_blank">Create Bill</a>.
     *
     * @param   {object}    [params = {}]                                 object which holds required and optional fields
     * @param   {string}    params.vendorId                               the system generated ID of the vendor who sent this bill
     * @param   {string}    params.invoiceNumber                          user defined unique identifier for the bill
     * @param   {string}    params.invoiceDate                            the date on which the bill is sent
     * @param   {string}    params.dueDate                                the date the payment is due for this bill
     * @param   {object[]}  params.billLineItems                          an array of billLineItem objects
     * @param   {number}    params.billLineItems.amount                   required - total cost for the line item (quantity x price or ratePercent x amount)
     * @param   {string}    [params.billLineItems.chartOfAccountId = ""]  optional - the system generated ID of the account that the bill line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.billLineItems.departmentId = ""]      optional - the system generated ID of the department that the bill line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.billLineItems.locationId = ""]        optional - the system generated ID of the location that the bill line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.billLineItems.jobId = ""]             optional - the system generated ID of the job that the bill line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.billLineItems.customerId = ""]        optional - the system generated customer ID of the customer that the bill line item is associated with
     * @param   {boolean}   [params.billLineItems.jobBillable = false]    optional - denotes if the job is billable [value = true] or not [value =false]
     * @param   {string}    [params.billLineItems.description = ""]       optional - a brief description of the goods/services
     * @param   {string}    [params.billLineItems.itemId = ""]            optional - the system generated ID of the item that the bill needs to be recorded for account tracking purposes
     * @param   {number}    [params.billLineItems.quantity = null]        optional - number of items sold or the hours/days spent providing the service
     * @param   {number}    [params.billLineItems.unitPrice = null]       optional - unit price of the item purchased. Only used if line item type is item
     * @param   {string}    [params.billLineItems.employeeId = ""]        optional - the system generated ID of the employee that the bill line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.billLineItems.actgClassId = ""]       optional - the system generated ID of the accounting class that the bill line item needs to be recorded for account tracking purposes
     * @param   {object}    params.options                                an options object which can contain any one of the optional fields
     * @param   {string}    [params.options.isActive = ""]                denotes if the bill is active [value = "1"] or inactive [value = "2"]
     * @param   {string}    [params.options.glPostingDate = ""]           date the bill is posted to the user's third-party system
     * @param   {string}    [params.options.description = ""]             a brief description of the bill
     * @param   {string}    [params.options.poNumber = ""]                the Purchase Order (PO) number of the bill
     *
     * @return  {object}                                                  the BillEntity object which includes the bill details
     *
     * @throws {MissingRequiredFieldException}                            this exception is thrown if vendorId, invoiceNumber, invoiceDate, dueDate, or billLineItems is not defined
     * @throws {FailedRequestException}                                   this exception is thrown if the request fails - exception includes error message and error code
     *
     */

    /* method which takes a name (string) and an options object, from those arguments
    builds the body of a create request, makes a request to create a Bill, and if
    successful returns a Bill entity Object */
    async create(params = {}) {
        // destructure params
        const {
            vendorId,
            invoiceNumber,
            invoiceDate,
            dueDate,
            billLineItems,
            options = {}
        } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!vendorId) {
            throw new MissingRequiredFieldException('vendorId');
        } else if (!invoiceNumber) {
            throw new MissingRequiredFieldException('invoiceNumber');
        } else if (!invoiceDate) {
            throw new MissingRequiredFieldException('invoiceDate');
        } else if (!dueDate) {
            throw new MissingRequiredFieldException('dueDate');
        } else if (!billLineItems) {
            throw new MissingRequiredFieldException('billLineItems');
        }

        // initialize default field values for optional fields of a lineitem
        const lineItemDefaults = {
            entity: 'BillLineItem',
            amount: null, // will be overwritten
            chartOfAccountId: '',
            departmentId: '',
            locationId: '',
            jobId: '',
            customerId: '',
            jobBillable: true,
            description: '',
            itemId: '',
            quantity: null,
            unitPrice: null,
            employeeId: '',
            actgClassId: ''
        };

        // initialize a complete line items array
        const completeLineItems = [];

        /* iterate over the billLineItems passed in, validate that required fields are defined on each
        lineitem, create a new complete lineItem object which includes optional fields with the default values */
        billLineItems.forEach(billLineItem => {
            // destructure required field(s) from nested entity
            const { amount } = billLineItem;

            // throw error if required field is missing
            if (!amount) {
                throw new MissingRequiredFieldException('amount');
            }

            // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
            const completeLineItem = Object.assign(
                {},
                lineItemDefaults,
                billLineItem
            );

            // populate the completeLineitems array with the newly made lineItem object
            completeLineItems.push(completeLineItem);
        });

        params.billLineItems = completeLineItems;

        // initialize default field values for optional fields
        const defaults = {
            isActive: '1',
            glPostingDate: '',
            description: '',
            poNumber: ''
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
            `${this.Auth.env}/Crud/Create/Bill.json`,
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
            'Bill',
            this.metadata,
            res.data
        );

        return bill;
    }

    /**
     * Gets the details of a bill.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208155326-Bill#sub-anchor-1-2" target="_blank">Read Bill</a>.
     *
     * @param   {string}  billId                    the system generated bill ID to fetch the bill record from the database
     *
     * @return  {object}                            the BillEntity object that includes the bill details
     *
     * @throws {MissingRequiredFieldException}      this exception is thrown if billId is not defined
     * @throws {FailedRequestException}             this exception is thrown if the request fails - exception includes error message and error code
     */

    async read(billId) {
        // throw an error if minimum required field(s) are not passed in
        if (!billId) {
            throw new MissingRequiredFieldException('billId');
        }

        const res = await util.readRequest(billId, this.Auth, this.entity);

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        // from response data and metadata create appropriate entity object to be returned
        const bill = util.generateEntityWithNestedEntities(
            'Bill',
            this.metadata,
            res.data
        );

        return bill;
    }

    /**
     * Lists the bills of the Organization associated with the orgId used to login. Additionally, you can specify how many bills to list,
     * apply filters, and sort the list based on bill fields.
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
     * @param   {[object]}  [params.sort = []]          sort results by fields of a bill
     *
     * @return  {[object]}                              an array of BillEntity objects which include the bill details
     *
     * @throws  {FailedRequestException}                this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a list of Bills and returns an array of BillEntity Objects
    async list(params = {}) {
        const bills = [];

        const res = await util.listRequest(this.Auth, this.entity, params);

        // if metadata attribute has not been assigned fetch entity metadata to place on Entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        /* iterate over the array of bills sent back by the api and instantiate a new Bill entity object instance,
        then return an array of the Bill objects */
        res.data.forEach(async b => {
            // from response data and metadata create appropriate entity object to be returned
            const bill = util.generateEntityWithNestedEntities(
                'Bill',
                this.metadata,
                b
            );

            bills.push(bill);
        });

        // return array of BillEntity Objects
        return bills;
    }

    /**
     * Updates the details in a bill.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208155326-Bill#sub-anchor-1-3" target="_blank">Update Bill</a>.
     *
     * @param  {object}  billEntity             <a href="index.html#billentity" target="_blank">a BillEntity object</a> - fields that differ from the bill record are overwritten
     *
     * @return {object}                         the BillEntity object with the updated bill details
     *
     * @throws {MissingRequiredFieldException}  this exception is thrown if billEntity is not defined
     * @throws {IncorrectEntityException}       this exception is thrown if the object passed in is not of type BillEntity
     * @throws {FailedRequestException}         this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes a BillEntity object instance and, based on the id
    attribute, updates the Bill record in the database with the attributes of the
    BillEntity Object */
    async update(billEntity) {
        /* throw an error if minimum required field(s) are not passed in
        and throw an error if the object passed in is of the wrong entity type */
        if (!billEntity) {
            throw new MissingRequiredFieldException('BillEntity');
        } else if (!(billEntity instanceof BillEntity)) {
            throw new IncorrectEntityException(billEntity.entity, this.entity);
        }

        // take lineitems argument and generate a string version of the key value pairs to include in the request body
        const billLineItemsData = util.generateNestedEntitiesString(
            billEntity.billLineItems,
            'BillLineItem'
        );

        // build out request body from arguments, and set default values for what is not passed in
        const data = {
            data: `{
                "obj": {
                    "entity": "${this.entity}",
                    "id": "${billEntity.id}",
                    "isActive": "${billEntity.isActive}",
                    "vendorId": "${billEntity.vendorId}",
                    "invoiceNumber": "${billEntity.invoiceNumber}",
                    "invoiceDate": "${billEntity.invoiceDate}",
                    "dueDate": "${billEntity.dueDate}",
                    "glPostingDate": "${billEntity.glPostingDate}",
                    "description": "${billEntity.description}",
                    "poNumber": "${billEntity.poNumber}",
                    "payFromBankAccountId": "${billEntity.payFromBankAccountId}",
                    "payFromChartOfAccountId": "${billEntity.payFromChartOfAccountId}",
                    "billLineItems": ${billLineItemsData}
                }
            }`
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/Crud/Update/Bill.json`,
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
            'Bill',
            this.metadata,
            res.data
        );

        return bill;
    }
}

module.exports = Bill;
