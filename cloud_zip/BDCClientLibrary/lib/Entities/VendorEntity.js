// Entity class which represents a Vendor Entity
const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A Vendor provides goods or services to the organization.
 * This class houses the parameters required to read, list, and update the vendor details.
 *
 * @param   {object}    vendor                  the details of a vendor
 * @param   {string}    vendor.id               the system generated vendor ID that is unique to a vendor record
 * @param   {string}    vendor.name             the name of the vendor
 * @param   {string}    vendor.isActive         denotes if the object is active [value = "1"] or inactive [value = "2"]
 * @param   {string}    vendor.shortName        the short version of the vendor's name
 * @param   {string}    vendor.nameOnCheck      the name printed on the Pay To field of the check or ACH addendum when payments are made. If empty, vendor name is used instead.
 * @param   {string}    vendor.companyName      name of the vendor's company
 * @param   {string}    vendor.accNumber        a code or name to identify the vendor
 * @param   {string}    vendor.taxId            the tax ID of the vendor. It is used by the accounting systems for 1099 reporting.
 * @param   {boolean}   vendor.track1099        if true, indicates that the vendor is a 1099 vendor
 * @param   {string}    vendor.address1         first line of the address
 * @param   {string}    vendor.address2         second line of the address
 * @param   {string}    vendor.address3         third line of the address
 * @param   {string}    vendor.address4         fourth line of the address
 * @param   {string}    vendor.addressCity      the city
 * @param   {string}    vendor.addressState     the state/county/province/region. Enter the state abbreviation for state.
 * @param   {string}    vendor.addressZip       the ZIP code or postal code
 * @param   {string}    vendor.addressCountry   the country
 * @param   {string}    vendor.email            the email of the vendor
 * @param   {string}    vendor.fax              the fax number of the vendor
 * @param   {string}    vendor.phone            the phone number of the vendor
 * @param   {string}    vendor.paymentEmail     the email the payment notification needs to be sent. If empty, the notifications are sent to the primary email.
 * @param   {string}    vendor.description      a description of the vendor
 * @param   {string}    vendor.contactFirstName first name of the vendor
 * @param   {string}    vendor.contactLastName  last name of the vendor
 * @param   {string}    vendor.accountType      type of the account. The default value is "0". If the vendor runs a business, assign the value "1". If the vendor is an individual that
 *                                              provides goods/services, assign the value "2".
 * @param   {string}    metadata                a list of all fields and metadata for the vendor entity
 *
 * @throws  {IncorrectEntityException}          this exception is thrown if the object passed does not have an entity type of Vendor
 */

// entity class which represents a Vendor entity
class VendorEntity {
    constructor(vendor, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (vendor.entity !== 'Vendor') {
            throw new IncorrectEntityException(vendor.entity, 'Vendor');
        }

        this.entity = vendor.entity;
        this.id = vendor.id;
        this.isActive = vendor.isActive;
        this.name = vendor.name;
        this.shortName = vendor.shortName;
        this.nameOnCheck = vendor.nameOnCheck;
        this.companyName = vendor.companyName;
        this.accNumber = vendor.accNumber;
        this.taxId = vendor.taxId;
        this.track1099 = vendor.track1099;
        this.address1 = vendor.address1;
        this.address2 = vendor.address2;
        this.address3 = vendor.address3;
        this.address4 = vendor.address4;
        this.addressCity = vendor.addressCity;
        this.addressState = vendor.addressState;
        this.addressZip = vendor.addressZip;
        this.addressCountry = vendor.addressCountry;
        this.email = vendor.email;
        this.fax = vendor.fax;
        this.phone = vendor.phone;
        this.payBy = vendor.payBy;
        this.paymentEmail = vendor.paymentEmail;
        this.paymentPhone = vendor.paymentPhone;
        this.description = vendor.description;
        this.createdTime = vendor.createdTime;
        this.updatedTime = vendor.updatedTime;
        this.contactFirstName = vendor.contactFirstName;
        this.contactLastName = vendor.contactLastName;
        this.mergedIntoId = vendor.mergedIntoId;
        this.accountType = vendor.accountType;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = VendorEntity;
