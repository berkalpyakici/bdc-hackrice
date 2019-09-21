const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A Customer consumes goods or services from your organization. This class houses the parameters to read, list, and update the customer details.
 *
 * @param   {object}    customer                        the details of a customer
 * @param   {string}    customer.entity                 the type of entity
 * @param   {string}    customer.id                     the system generated customer ID that is unique to a customer record
 * @param   {string}    customer.isActive               denotes if the customer is active [value="1"] or inactive [value="2"]
 * @param   {string}    customer.createdTime            the date and time the record was created
 * @param   {string}    customer.updatedTime            the date and time the record was last updated
 * @param   {string}    customer.name                   the name of the customer
 * @param   {string}    customer.shortName              the short version of the customer's name
 * @param   {string}    customer.parentCustomerId       the ID of the parent object (denotes this object as child object)
 * @param   {string}    customer.companyName            name of the customer's company
 * @param   {string}    customer.contactFirstName       first name of the customer
 * @param   {string}    customer.contactLastName        last name of the customer
 * @param   {string}    customer.accNumber              a code or name to identify the customer
 * @param   {string}    customer.billAddress1           first line of the billing address
 * @param   {string}    customer.billAddress2           second line of the billing address
 * @param   {string}    customer.billAddress3           third line of the billing address
 * @param   {string}    customer.billAddress4           fourth line of the billing address
 * @param   {string}    customer.billAddressCity        the city
 * @param   {string}    customer.billAddressState       the state/county/province/region. Enter the state abbreviation for state.
 * @param   {string}    customer.billAddressCountry     the country
 * @param   {string}    customer.billAddressZip         the ZIP code or postal code
 * @param   {string}    customer.shipAddress1           first line of the shipping address
 * @param   {string}    customer.shipAddress2           second line of the shipping address
 * @param   {string}    customer.shipAddress3           third line of the shipping address
 * @param   {string}    customer.shipAddress4           fourth line of the shipping address
 * @param   {string}    customer.shipAddressCity        the city
 * @param   {string}    customer.shipAddressState       the state/county/province/region. Enter the state abbreviation for state.
 * @param   {string}    customer.shipAddressCountry     the country
 * @param   {string}    customer.shipAddressZip         the ZIP code or postal code
 * @param   {string}    customer.email                  the email of the customer
 * @param   {string}    customer.phone                  the phone number of the customer
 * @param   {string}    customer.altPhone               the alternative phone number of the customer
 * @param   {string}    customer.fax                    the fax number of the customer
 * @param   {string}    customer.description            a description of the customer
 * @param   {string}    customer.printAs
 * @param   {string}    customer.mergedIntoId           the ID of the parent the customer object gets merged into
 * @param   {boolean}   customer.hasAuthorizedToCharge  if the value is set to true, the organization has permission to directly charge the customer
 * @param   {string}    customer.accountType            the type of the account. The default value is "0". If the customer runs a business, assign the value "1".
 * @param   {object}    metadata                        the list of all fields and metadata for the customer entity
 *
 * @throws  {IncorrectEntityException}                  this exception is thrown if the object passed does not have an entity type of Customer
 */

// entity class which represents a Customer entity
class CustomerEntity {
    constructor(customer, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (customer.entity !== 'Customer') {
            throw new IncorrectEntityException(customer.entity, 'Customer');
        }

        this.entity = customer.entity;
        this.id = customer.id;
        this.isActive = customer.isActive;
        this.createdTime = customer.createdTime;
        this.updatedTime = customer.updatedTime;
        this.name = customer.name;
        this.shortName = customer.shortName;
        this.parentCustomerId = customer.parentCustomerId;
        this.companyName = customer.companyName;
        this.contactFirstName = customer.contactFirstName;
        this.contactLastName = customer.contactLastName;
        this.accNumber = customer.accNumber;
        this.billAddress1 = customer.billAddress1;
        this.billAddress2 = customer.billAddress2;
        this.billAddress3 = customer.billAddress3;
        this.billAddress4 = customer.billAddress4;
        this.billAddressCity = customer.billAddressCity;
        this.billAddressState = customer.billAddressState;
        this.billAddressCountry = customer.billAddressCountry;
        this.billAddressZip = customer.billAddressZip;
        this.shipAddress1 = customer.shipAddress1;
        this.shipAddress2 = customer.shipAddress2;
        this.shipAddress3 = customer.shipAddress3;
        this.shipAddress4 = customer.shipAddress4;
        this.shipAddressCity = customer.shipAddressCity;
        this.shipAddressState = customer.shipAddressState;
        this.shipAddressCountry = customer.shipAddressCountry;
        this.shipAddressZip = customer.shipAddressZip;
        this.email = customer.email;
        this.phone = customer.phone;
        this.altPhone = customer.altPhone;
        this.fax = customer.fax;
        this.description = customer.description;
        this.printAs = customer.printAs;
        this.mergedIntoId = customer.mergedIntoId;
        this.hasAuthorizedToCharge = customer.hasAuthorizedToCharge;
        this.accountType = customer.accountType;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = CustomerEntity;
