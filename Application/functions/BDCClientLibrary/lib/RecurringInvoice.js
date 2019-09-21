const util = require('./util');
const RecurringInvoiceEntity = require('./Entities/RecurringInvoiceEntity');

const IncorrectEntityException = require('./Exceptions/IncorrectEntityException');
const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * A Recurring Invoice is a document that needs to be sent to a customer at regular intervals with the details of the
 * products/services that were purchased from the organization.
 * This class houses the methods that manage Recurring Invoices.
 *
 * @param {object}  Auth   the Auth object instance the BDC object is instantiated with - contains the credentials to
 *                         call the methods
 */

// class which houses instance methods regarding RecurringInvoice Entities
class RecurringInvoice {
    // instantiate class with an Entity type and Auth attribute for access to the credentials
    constructor(Auth) {
        this.entity = 'RecurringInvoice';
        this.Auth = Auth;
        this.metadata = undefined;
    }

    /**
     * Creates a new recurring invoice.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/213911046-RecurringInvoices#sub-anchor-1-1" target="_blank">Create Recurring Invoice</a>.
     *
     * @param   {object}    [params={}]                                            object which holds the optional and required fields
     * @param   {string}    params.customerId                                      the system generated customer ID of the customer that the recurring invoice is sent to
     * @param   {string}    params.timePeriod                                      the time period of the recurring invoice (daily [value = "0"], weekly [value = "1"], monthly [value = "2"], yearly [value = "3"], and none [value = "9"])
     * @param   {string}    params.frequencyPerTimePeriod                          defines how many times the invoice needs to be generated during the defined time period
     * @param   {string}    params.nextDueDate                                     sets the due date of the next invoice
     * @param   {string}    params.daysInAdvance                                   defines how many days in advance from the the nextDueDate, the next invoice needs to be generated
     * @param   {string}    params.recurringInvoiceLineItems                       an array of recurringInvoiceLineItems objects
     * @param   {string}    [params.recurringInvoiceLineItems.departmentId=""]     optional - the system generated ID of the department that the recurring invoice line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.recurringInvoiceLineItems.locationId=""]       optional - the system generated ID of the location that the recurring invoice line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.recurringInvoiceLineItems.actgClassId=""]      optional - the system generated ID of the accounting class that the recurring invoice line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.recurringInvoiceLineItems.jobId=""]            optional - the system generated ID of the job that the recurring invoice line item needs to be recorded for account tracking purposes
     * @param   {string}    [params.recurringInvoiceLineItems.description=""]      optional - a brief description of the goods/services
     * @param   {string}    [params.recurringInvoiceLineItems.itemId=""]           optional - the system generated ID of the item
     * @param   {number}    [params.recurringInvoiceLineItems.amount=null]         optional - total cost line item (quantity x price or ratePercent x amount)
     * @param   {number}    params.recurringInvoiceLineItems.quantity              required - number of items sold or the hours/days spent providing the service
     * @param   {number}    [params.recurringInvoiceLineItems.price=null]          optional - price/rate of the product or service
     * @param   {number}    [params.recurringInvoiceLineItems.ratePercent=null]    optional - calculate the price of an item based on rate. Used if price field is empty
     * @param   {boolean}   [params.recurringInvoiceLineItems.taxable=false]       optional - denotes if the invoice line item is taxable [value = true] or not[value = false]
     * @param   {object}    params.options                                         the options object which contains the optional fields
     * @param   {string}    [params.options.isActive="1"]                          denotes if the recurring invoice is active [value = "1"] or inactive [value = "2"]
     * @param   {string}    [params.options.poNumber=""]                           the number on the Purchase Order (PO) associated with the invoice
     * @param   {string}    [params.options.salesRep=""]                           name of the sales representative associated with this invoice
     * @param   {string}    [params.options.departmentId=""]                       the ID of the department that the recurring invoice needs to be recorded for account tracking purposes
     * @param   {string}    [params.options.locationId=""]                         the ID of the location that the recurring invoice needs to be recorded for account tracking purposes
     * @param   {string}    [params.options.actgClassId=""]                        the ID of the accounting class that the recurring invoice needs to be recorded for account tracking purposes
     * @param   {string}    [params.options.jobId=""]                              the ID of the job that the recurring invoice needs to be recorded for account tracking purposes
     * @param   {string}    [params.options.itemSalesTax=""]                       the ID of the Sales Tax item that is applied to all the taxable line items on the recurring invoice
     * @param   {string}    [params.options.description=""]                        a brief description about the recurring invoice
     * @param   {boolean}   [params.options.isToBePrinted=false]                   denotes if the recurring invoice needs to be printed/mailed [value = true] or not [value = false]
     * @param   {boolean}   [params.options.isToBeEmailed=false]                   denotes if the recurring invoice needs to be emailed [value = true] or not [value = false]
     * @param   {boolean}   [params.options.isToBeAutoEmailed=false]               denotes if the recurring invoice needs to be generated and automatically emailed [value = true] or not [value = false]
     * @param   {boolean}   [params.options.isToBeAutoMailed=false]                denotes if the recurring invoice needs to be printed and automatically mailed [value = true] or not [value = false]
     * @param   {string}    [params.options.fromUserId=""]                         the system generated user ID of the user who needs to receive the emailed invoice
     * @param   {string}    [params.options.endDate=""]                            the date after which the recurring invoice no longer needs to be generated
     *
     * @return {object}                                                            the RecurringInvoiceEntity object which includes the recurring invoice details
     *
     * @throws {MissingRequiredFieldException}                                     this exception is thrown if the customerId, timePeriod, frequencyPerTimePeriod, nextDueDate, or daysInAdvance is not defined
     * @throws {FailedRequestException}                                            this exception is thrown if the request fails - exception includes error message and error code
     */

    async create(params = {}) {
        const {
            customerId,
            timePeriod,
            frequencyPerTimePeriod,
            nextDueDate,
            daysInAdvance,
            recurringInvoiceLineItems,
            options = {}
        } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!customerId) {
            throw new MissingRequiredFieldException('customerId');
        } else if (!timePeriod) {
            throw new MissingRequiredFieldException('timePeriod');
        } else if (!frequencyPerTimePeriod) {
            throw new MissingRequiredFieldException('frequencyPerTimePeriod');
        } else if (!nextDueDate) {
            throw new MissingRequiredFieldException('nextDueDate');
        } else if (!daysInAdvance) {
            throw new MissingRequiredFieldException('daysInAdvance');
        } else if (!recurringInvoiceLineItems) {
            throw new MissingRequiredFieldException(
                'recurringInvoiceLineItems'
            );
        }
        // initialize default field values for optional fields of a lineitem
        const lineItemDefaults = {
            entity: 'RecurringInvoiceLineItem',
            id: '',
            departmentId: '',
            locationId: '',
            actgClassId: '',
            jobId: '',
            description: '',
            recurringInvoiceId: '',
            itemId: '',
            amount: null,
            quantity: null, // will be overwritten
            price: null,
            ratePercent: null,
            taxable: false
        };

        // initialize a complete line items array
        const completeLineItems = [];

        /* iterate over the invoiceLineItems passed in, validate that required fields are defined on each
        lineitem, create a new complete lineItem object which includes optional fields with the default values */
        recurringInvoiceLineItems.forEach(recurringInvoiceLineItem => {
            // destructure required field(s) from nested entity
            const { quantity } = recurringInvoiceLineItem;

            // throw error if required field is missing
            if (!quantity) {
                throw new MissingRequiredFieldException('quantity');
            }

            // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
            const completeLineItem = Object.assign(
                {},
                lineItemDefaults,
                recurringInvoiceLineItem
            );

            // populate the completeLineitems array with the newly made lineItem object
            completeLineItems.push(completeLineItem);
        });

        params.recurringInvoiceLineItems = completeLineItems;

        // destructure options and set default values
        const defaults = {
            isActive: '1',
            poNumber: '',
            salesRep: '',
            departmentId: '',
            locationId: '',
            actgClassId: '',
            jobId: '',
            itemSalesTax: '',
            description: '',
            isToBePrinted: false,
            isToBeEmailed: false,
            isToBeAutoEmailed: false,
            isToBeAutoMailed: false,
            fromUserId: '',
            endDate: ''
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
            `${this.Auth.env}/Crud/Create/RecurringInvoice.json`,
            this.Auth._requestCredentials,
            data
        );

        // if metadata attribute has not been assigned fetch entity metadata to place on Entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        // from response data and metadata create appropriate entity object to be returned
        const recurringInvoice = util.generateEntityWithNestedEntities(
            'RecurringInvoice',
            this.metadata,
            res.data
        );

        return recurringInvoice;
    }

    /**
     * Gets the details of a recurring invoice.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/213911046-RecurringInvoices#sub-anchor-1-2" target="_blank">Read Recurring Invoice</a>.
     *
     * @param {string}   recurringInvoiceId      the recurringInvoice reference ID to fetch the recurringInvoice record from the database
     *
     * @return {object}                          the RecurringInvoiceEntity object which includes the invoice details
     *
     * @throws {MissingRequiredFieldException}   this exception is thrown if the recurringInvoiceId is not defined
     * @throws {FailedRequestException}          this exception is thrown if the request fails - exception includes error message and error code
     */

    async read(recurringInvoiceId) {
        // throw an error if minimum required field(s) are not passed in
        if (!recurringInvoiceId) {
            throw new MissingRequiredFieldException('recurringInvoiceId');
        }

        const res = await util.readRequest(
            recurringInvoiceId,
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
        const recurringInvoice = util.generateEntityWithNestedEntities(
            'RecurringInvoice',
            this.metadata,
            res.data
        );

        return recurringInvoice;
    }

    /**
     * Lists the recurring invoices of the Organization associated with the orgId used to login. Additionally, you can specify how many recurring invoices to list,
     * apply filters, and sort the list based on recurring invoice fields.
     * If the request fails, the FailedRequestException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/210136993-List" target="_blank">List</a>.
     *
     *
     * @param   {object}    [params = {}]               object which holds required and optional fields for request
     * @param   {boolean}   [params.nested = true]      if true, includes nested related data
     * @param   {number}    [params.start = 0]          the starting pagination index. Define start as 0 for the first listing.
     * @param   {number}    [params.max = 99]           the maximum number of objects that need to be returned from the starting index
     * @param   {[object]}  [params.filters = []]       filters the results that match the criteria.
     *                                                  For more information, see <a href="https://developer.bill.com/hc/en-us/articles/210136993-List#sub-anchor-1-5" target="_blank">Filters</a>.
     * @param   {[object]}  [params.sort = []]          sort results by fields of an recurring invoice
     *
     * @return  {[object]}                              an array of RecurringInvoiceEntity objects that include the recurring invoice details
     *
     * @throws  {FailedRequestException}                this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a list of RecurringInvoices and returns an array of RecurringInvoiceEntity Objects
    async list(params = {}) {
        const recurringInvoices = [];

        const res = await util.listRequest(this.Auth, this.entity, params);

        // if metadata attribute has not been assigned fetch entity metadata to place on entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        /* iterate over the array of recurringInvoice bank accounts sent back by the api and
            instantiate a new RecurringInvoice entity object instance, then return an
            array of the RecurringInvoice objects */
        res.data.forEach(async r => {
            // from response data and metadata create appropriate entity object to be returned
            const recurringInvoice = util.generateEntityWithNestedEntities(
                'RecurringInvoice',
                this.metadata,
                r
            );

            recurringInvoices.push(recurringInvoice);
        });

        // return array of InvoiceEntity objects
        return recurringInvoices;
    }

    /**
     * Updates the details of a recurring invoice.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/213911046-RecurringInvoices#sub-anchor-1-3" target="_blank">Update Recurring Invoice</a>.
     *
     * @param   {object}  recurringInvoiceEntity    a <a href="index.html#recurringinvoiceentity" target="_blank">RecurringInvoiceEntity object</a> - fields which differ from the recurring invoice record are overwritten
     *
     * @return {object}                             the RecurringInvoiceEntity object with the updated recurring invoice details
     *
     * @throws {MissingRequiredFieldException}      this exception is thrown if recurringInvoiceEntity is not defined
     * @throws {IncorrectEntityException}           this exception is thrown if the object passed in is not of type RecurringInvoiceEntity
     * @throws {FailedRequestException}             this exception is thrown if the request fails - exception includes error message and error code
     */

    /* method which takes a RecurringInvoiceEntity object instance and, based on the ID
    attribute, updates the RecurringInvoice record in the DB with the attributes of the
    RecurringInvoiceEntity Object */
    async update(recurringInvoiceEntity) {
        /* throw an error if minimum required field(s) are not passed in
        and throw an error if the object passed in is of the wrong entity type */
        if (!recurringInvoiceEntity) {
            throw new MissingRequiredFieldException('recurringInvoiceEntity');
        } else if (
            !(recurringInvoiceEntity instanceof RecurringInvoiceEntity)
        ) {
            throw new IncorrectEntityException(
                recurringInvoiceEntity.entity,
                this.entity
            );
        }

        // take lineitems argument and generate a string version of the key value pairs to include in the request body
        const recurringInvoiceLineItemsData = util.generateNestedEntitiesString(
            recurringInvoiceEntity.recurringInvoiceLineItems,
            'RecurringInvoiceLineItem'
        );

        // build out request body from arguments, and set default values for what is not passed in
        const data = {
            data: `{
                "obj": {
                    "entity": "${this.entity}",
                    "id": "${recurringInvoiceEntity.id}",
                    "isActive": "${recurringInvoiceEntity.isActive}",
                    "customerId": "${recurringInvoiceEntity.customerId}",
                    "poNumber": "${recurringInvoiceEntity.poNumber}",
                    "salesRep": "${recurringInvoiceEntity.salesRep}",
                    "departmentId": "${recurringInvoiceEntity.departmentId}",
                    "locationId": "${recurringInvoiceEntity.locationId}",
                    "actgClassId": "${recurringInvoiceEntity.actgClassId}",
                    "jobId": "${recurringInvoiceEntity.jobId}",
                    "itemSalesTax": "${recurringInvoiceEntity.itemSalesTax}",
                    "description": "${recurringInvoiceEntity.description}",
                    "isToBePrinted": ${recurringInvoiceEntity.isToBePrinted},
                    "isToBeEmailed": ${recurringInvoiceEntity.isToBeEmailed},
                    "isToBeAutoEmailed": ${
                        recurringInvoiceEntity.isToBeAutoEmailed
                    },
                    "isToBeAutoMailed": ${
                        recurringInvoiceEntity.isToBeAutoMailed
                    },
                    "fromUserId": "${recurringInvoiceEntity.fromUserId}",
                    "timePeriod": "${recurringInvoiceEntity.timePeriod}",
                    "frequencyPerTimePeriod": ${
                        recurringInvoiceEntity.frequencyPerTimePeriod
                    },
                    "nextDueDate": "${recurringInvoiceEntity.nextDueDate}",
                    "endDate": "${recurringInvoiceEntity.endDate || ''}",
                    "daysInAdvance": ${recurringInvoiceEntity.daysInAdvance},
                    "recurringInvoiceLineItems": ${recurringInvoiceLineItemsData}
                }
            }`
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/Crud/Update/RecurringInvoice.json`,
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
        const recurringInvoice = util.generateEntityWithNestedEntities(
            'RecurringInvoice',
            this.metadata,
            res.data
        );

        return recurringInvoice;
    }
}

module.exports = RecurringInvoice;
