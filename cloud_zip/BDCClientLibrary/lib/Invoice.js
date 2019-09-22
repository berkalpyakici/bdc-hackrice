const util = require('./util');
const InvoiceEntity = require('./Entities/InvoiceEntity');

const IncorrectEntityException = require('./Exceptions/IncorrectEntityException');
const MissingRequiredFieldException = require('./Exceptions/MissingRequiredFieldException');

/**
 * An Invoice is a document sent to the customer with the details of the products/services that were purchased from
 * the organization.
 * This class houses the methods that manage Invoices.
 *
 * @param {object}  Auth   the Auth object instance the BDC object is instantiated with - contains the credentials to
 *                         call the methods
 */

// class which houses instance methods regarding Invoice Entities
class Invoice {
    constructor(Auth) {
        this.entity = 'Invoice';
        this.Auth = Auth;
        this.metadata = undefined;
    }

    /**
     * Creates a new invoice.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208196656-Invoice#sub-anchor-1-1" target="_blank">Create Invoice</a>.
     *
     * @param {object}   [params = {}]                                      object which holds required and optional fields
     * @param {string}   params.customerId                                  the system generated customer ID that is unique to a customer record
     * @param {string}   params.invoiceNumber                               the user defined unique identifier for the bill
     * @param {string}   params.invoiceDate                                 the date the invoice is issued to the customer
     * @param {string}   params.dueDate                                     the date the payment is due for this invoice
     * @param {[object]} params.invoiceLineItems                            an array of invoiceLineItem objects
     * @param {string}   [params.invoiceLineItems.itemId = ""]              optional - the system generated ID of the item that the invoice line item needs to be recorded for account tracking purposes
     * @param {number}   params.invoiceLineItems.quantity                   required - number of items sold or the hours/days spent providing the service
     * @param {number}   [params.invoiceLineItems.amount = null]            optional - total cost for the line item (quantity * price or ratePercent * amount)
     * @param {number}   [params.invoiceLineItems.price = null]             optional - price/rate of the product or service
     * @param {number}   [params.invoiceLineItems.ratePercent = null]       optional - calculate the price of an item based on rate. Used if price field is empty.
     * @param {string}   [params.invoiceLineItems.chartOfAccountId = ""]    optional - the system generated ID of the account that the invoice line item needs to be recorded for account tracking purposes
     * @param {string}   [params.invoiceLineItems.departmentId = ""]        optional - the system generated ID of the department that the invoice line item needs to be recorded for account tracking purposes
     * @param {string}   [params.invoiceLineItems.locationId = ""]          optional - the system generated ID of the location that the invoice line item needs to be recorded for account tracking purposes
     * @param {string}   [params.invoiceLineItems.actgClassId = ""]         optional - the system generated ID of the accounting class that the invoice line item needs to be recorded for account tracking purposes
     * @param {string}   [params.invoiceLineItems.jobId = ""]               optional - the system generated ID of the job that the invoice line item needs to be recorded for account tracking purposes
     * @param {string}   [params.invoiceLineItems.description = ""]         optional - a brief description of the goods/services
     * @param {string}   [params.invoiceLineItems.taxable = ""]             optional - denotes if the invoice line item is taxable [value = true] or not[value = false]
     * @param {string}   [params.invoiceLineItems.taxCode = ""]             optional - the tax code that can be applied on the invoice line item
     * @param {object}   params.options                                     the options object which contains the optional fields
     * @param {string}   [params.options.isActive = "1"]                    denotes if the object is active [value = "1"] or inactive [value = "2"]. By default, the object is in the active state.
     * @param {string}   [params.options.glPostingDate = ""]                date the invoice is posted to the organizations third-party system
     * @param {string}   [params.options.description = ""]                  a brief description about the invoice
     * @param {string}   [params.options.poNumber = ""]                     the number on the Purchase Order (PO) associated with the invoice
     * @param {boolean}  [params.options.isToBePrinted = false]             denotes if the invoice needs to be printed/mailed [value = true] or not [value = false]
     * @param {boolean}  [params.options.isToBeEmailed = false]             denotes if the invoice needs to be emailed [value = true] or not [value = false]
     * @param {string}   [params.options.itemSalesTax = ""]                 the ID of the Sales Tax item that is applied to all the taxable line items on the invoice
     * @param {number}   [params.options.salesTaxTotal = null]              the total amount of sales tax applied to this invoice
     * @param {string}   [params.options.terms = ""]                        payment terms chosen for the invoice
     * @param {string}   [params.options.salesRep = ""]                     name of the sales representative associated with this invoice
     * @param {string}   [params.options.FOB = ""]                          shipping information for this invoice
     * @param {string}   [params.options.shipDate = ""]                     date the product(s) were shipped to the customer
     * @param {string}   [params.options.shipMethod = ""]                   the method by which product(s) were shipped to the customer
     * @param {string}   [params.options.departmentId = ""]                 the ID of the department that the invoice needs to be recorded for account tracking purposes
     * @param {string}   [params.options.locationId = ""]                   the ID of the location that the invoice needs to be recorded for account tracking purposes
     * @param {string}   [params.options.actgClassId = ""]                  the ID of the accounting class that the invoice needs to be recorded for account tracking purposes
     * @param {string}   [params.options.jobId = ""]                        the ID of the job that the invoice needs to be recorded for account tracking purposes
     * @param {string}   [params.options.payToBankAccountId = ""]           the system generated ID of the bank account that receives the payment
     * @param {string}   [params.options.payToChartOfAccountId = ""]        the ID of the account that the invoice needs to be recorded for account tracking purposes
     *
     * @return {object}                                                     the InvoiceEntity object which includes the invoice details
     *
     * @throws {MissingRequiredFieldException}                              this exception is thrown if the customerId, invoiceNumber, invoiceDate, dueDate, or invoiceLineItems is not defined
     * @throws {FailedRequestException}                                     this exception is thrown if the request fails - exception includes error message and error code
     */

    async create(params = {}) {
        // destructure params
        const {
            customerId,
            invoiceNumber,
            invoiceDate,
            dueDate,
            invoiceLineItems,
            options = {}
        } = params;

        // throw an error if minimum required field(s) are not passed in
        if (!customerId) {
            throw new MissingRequiredFieldException('customerId');
        } else if (!invoiceNumber) {
            throw new MissingRequiredFieldException('invoiceNumber');
        } else if (!invoiceDate) {
            throw new MissingRequiredFieldException('invoiceDate');
        } else if (!dueDate) {
            throw new MissingRequiredFieldException('dueDate');
        } else if (!invoiceLineItems) {
            throw new MissingRequiredFieldException('invoiceLineItems');
        }

        // initialize default field values for optional fields of a lineitem
        const lineItemDefaults = {
            entity: 'InvoiceLineItem',
            itemId: '',
            quantity: null, // will be overwritten
            amount: null,
            price: null,
            ratePercent: null,
            chartOfAccountId: '',
            departmentId: '',
            locationId: '',
            actgClassId: '',
            jobId: '',
            description: '',
            taxable: false,
            taxCode: ''
        };

        // initialize a complete line items array
        const completeLineItems = [];

        /* iterate over the invoiceLineItems passed in, validate that required fields are defined on each
        lineitem, create a new complete lineItem object which includes optional fields with the default values */
        invoiceLineItems.forEach(invoiceLineItem => {
            // destructure required field(s) from nested entity
            const { quantity } = invoiceLineItem;

            // throw error if required field is missing
            if (!quantity) {
                throw new MissingRequiredFieldException('quantity');
            }

            // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
            const completeLineItem = Object.assign(
                {},
                lineItemDefaults,
                invoiceLineItem
            );

            // populate the completeLineitems array with the newly made lineItem object
            completeLineItems.push(completeLineItem);
        });

        params.invoiceLineItems = completeLineItems;

        // initialize default field values for optional fields
        const defaults = {
            isActive: '1',
            glPostingDate: '',
            description: '',
            poNumber: '',
            isToBePrinted: false,
            isToBeEmailed: false,
            itemSalesTax: '',
            salesTaxTotal: null,
            terms: '',
            salesRep: '',
            FOB: '',
            shipDate: '',
            shipMethod: '',
            departmentId: '',
            locationId: '',
            actgClassId: '',
            jobId: '',
            payToBankAccountId: '',
            payToChartOfAccountId: ''
        };

        // merge the default optional values with what values were passed in (values which have been passed in overwrite the default values)
        const optionalParams = Object.assign({}, defaults, options);

        // build formatted dataString for request
        const dataString = util.convertParamsToDataString(
            params,
            optionalParams,
            this.entity
        );

        // initialize data object to be passed into request
        const data = {
            data: dataString
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/Crud/Create/Invoice.json`,
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
        const invoice = util.generateEntityWithNestedEntities(
            'Invoice',
            this.metadata,
            res.data
        );

        return invoice;
    }

    /**
     * Gets the details of an invoice.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208196656-Invoice#sub-anchor-1-2" target="_blank">Read Invoice</a>.
     *
     * @param   {string}  invoiceId              the system generated invoice ID to fetch the invoice record from the database
     *
     * @return  {object}                         the InvoiceEntity object which includes the invoice details
     *
     * @throws {MissingRequiredFieldException}   this exception is thrown if invoiceId is not defined
     * @throws {FailedRequestException}          this exception is thrown if the request fails - exception includes error message and error code
     */

    async read(invoiceId) {
        // throw an error if minimum required field(s) are not passed in
        if (!invoiceId) {
            throw new MissingRequiredFieldException('invoiceId');
        }

        const res = await util.readRequest(invoiceId, this.Auth, this.entity);

        // if metadata attribute has not been assigned fetch entity metadata to place on Entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        // from response data and metadata create appropriate entity object to be returned
        const invoice = util.generateEntityWithNestedEntities(
            'Invoice',
            this.metadata,
            res.data
        );

        return invoice;
    }

    /**
     * Lists the invoices of the Organization associated with the orgId used to login. Additionally, you can specify how many invoices to list,
     * apply filters, and sort the list based on invoice fields.
     * If the request fails, the FailedRequestException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/210136993-List" target="_blank">List</a>.
     *
     *
     * @param   {object}    [params = {}]               object which holds required and optional fields
     * @param   {boolean}   [params.nested = true]      if true, includes nested related data
     * @param   {number}    [params.start = 0]          the starting pagination index. Define start as 0 for the first listing.
     * @param   {number}    [params.max = 99]           the maximum number of objects that need to be returned from the starting index
     * @param   {[object]}  [params.filters = []]       filters the results that match the criteria.
     *                                                  For more information, see <a href="https://developer.bill.com/hc/en-us/articles/210136993-List#sub-anchor-1-5" target="_blank">Filters</a>.
     * @param   {[object]}  [params.sort = []]          sort results by fields of an invoice
     *
     * @return  {[object]}                              an array of InvoiceEntity objects which include the invoice details
     *
     * @throws  {FailedRequestException}                this exception is thrown if the request fails - exception includes error message and error code
     */

    // fetches a list of Invoices and returns an array of InvoiceEntity Objects
    async list(params = {}) {
        const invoices = [];

        const res = await util.listRequest(this.Auth, this.entity, params);

        // if metadata attribute has not been assigned fetch entity metadata to place on Entity object when instantiated to be returned
        if (!this.metadata) {
            this.metadata = await util.getEnitityMetadata(
                this.entity,
                this.Auth
            );
        }

        /* Iterate over the array of invoice bank accounts sent back by the API and
            instantiate a new Invoice Entity Object instance, then return an
            array of the Invoice Objects */
        res.data.forEach(i => {
            // from response data and metadata create appropriate entity object to be returned
            const invoice = util.generateEntityWithNestedEntities(
                'Invoice',
                this.metadata,
                i
            );

            invoices.push(invoice);
        });

        // return array of InvoiceEntity Objects
        return invoices;
    }

    /**
     * Updates the details in an invoice.
     * If the request fails, the FailedRequestException is thrown and if it is missing required fields,
     * the MissingRequiredFieldException is thrown.
     *
     * <p> For information on calling the method and to check out a sample request and response, see
     * <a href="https://developer.bill.com/hc/en-us/articles/208196656-Invoice#sub-anchor-1-3" target="_blank">Update Invoice</a>.
     *
     * @param  {object}  invoiceEntity          <a href="index.html#invoiceentity" target="_blank">an InvoiceEntity object</a> - fields that differ from the invoice record are overwritten
     *
     * @return {object}                         the InvoiceEntity object with the updated invoice details
     *
     * @throws {MissingRequiredFieldException}  this exception is thrown if invoiceEntity is not defined
     * @throws {IncorrectEntityException}       this exception is thrown if the object passed in is not of type InvoiceEntity
     * @throws {FailedRequestException}         this exception is thrown if the request fails - exception includes error message and error code
     */

    /* Method which takes a InvoiceEntity object instance and, based on the ID
    attribute, updates the Invoice record in the DB with the attributes of the
    InvoiceEntity Object */
    async update(invoiceEntity) {
        /* throw an error if minimum required field(s) are not passed in
        and throw an error if the object passed in is of the wrong entity type */
        if (!invoiceEntity) {
            throw new MissingRequiredFieldException('InvoiceEntity');
        } else if (!(invoiceEntity instanceof InvoiceEntity)) {
            throw new IncorrectEntityException(
                invoiceEntity.entity,
                this.entity
            );
        }

        // take lineitems argument and generate a string version of the key value pairs to include in the request body
        const invoiceLineItemsData = util.generateNestedEntitiesString(
            invoiceEntity.invoiceLineItems
        );

        // build out request body from arguments, and set default values for what is not passed in
        const data = {
            data: `{
                "obj": {
                    "entity": "${this.entity}",
                    "id": "${invoiceEntity.id}",
                    "isActive": "${invoiceEntity.isActive}",
                    "customerId": "${invoiceEntity.customerId}",
                    "invoiceNumber": "${invoiceEntity.invoiceNumber}",
                    "invoiceDate": "${invoiceEntity.invoiceDate}",
                    "dueDate": "${invoiceEntity.dueDate}",
                    "glPostingDate": "${invoiceEntity.glPostingDate}",
                    "description": "${invoiceEntity.description}",
                    "poNumber": "${invoiceEntity.poNumber}",
                    "isToBePrinted": ${invoiceEntity.isToBePrinted},
                    "isToBeEmailed": ${invoiceEntity.isToBeEmailed},
                    "itemSalesTax": "${invoiceEntity.itemSalesTax}",
                    "salesTaxTotal": ${invoiceEntity.salesTaxTotal},
                    "terms": "${invoiceEntity.terms}",
                    "salesRep": "${invoiceEntity.salesRep}",
                    "FOB": "${invoiceEntity.FOB}",
                    "shipDate": "${invoiceEntity.shipDate || ''}",
                    "shipMethod": "${invoiceEntity.shipMethod}",
                    "departmentId": "${invoiceEntity.departmentId}",
                    "locationId": "${invoiceEntity.locationId}",
                    "actgClassId": "${invoiceEntity.actgClassId}",
                    "jobId": "${invoiceEntity.jobId}",
                    "payToBankAccountId": "${invoiceEntity.payToBankAccountId}",
                    "payToChartOfAccountId": "${
                        invoiceEntity.payToChartOfAccountId
                    }",
                    "invoiceLineItems": ${invoiceLineItemsData}
                }
            }`
        };

        const res = await util.makeRequest(
            `${this.Auth.env}/Crud/Update/Invoice.json`,
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
        const invoice = util.generateEntityWithNestedEntities(
            'Invoice',
            this.metadata,
            res.data
        );

        return invoice;
    }
}

module.exports = Invoice;
