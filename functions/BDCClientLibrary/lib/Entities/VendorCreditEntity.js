const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A Vendor Credit is a document which described the reduced adjustments of the amount owed to a Vendor.
 *
 * @param   {object}    vendorCredit                        the details of a vendorCredit
 * @param   {string}    vendorCredit.entity                 the type of entity
 * @param   {string}    vendorCredit.id                     the system generated ID of the vendor who issued the credit
 * @param   {string}    vendorCredit.isActive               denotes if the object is active [value = "1"] or inactive [value = "2"]
 * @param   {string}    vendorCredit.vendorId               the ID of the vendor which this vendorCredit was received from
 * @param   {string}    vendorCredit.refNumber              identification for Vendor Credit, provided by vendor on credit document
 * @param   {string}    vendorCredit.approvalStatus         denotes the approval status of the vendorCredit (Unassigned [value = "0"], Assigned [value = "1"], Approved [value = "3"], Approving [value = "4"], and Denied [value = "5"])
 * @param   {string}    vendorCredit.creditDate             date the Vendor Credit is issued. Typically provided by vendor on credit document.
 * @param   {string}    vendorCredit.glPostingDate          the date the vendorCredit is posted to the organizations third-party system
 * @param   {number}    vendorCredit.amount                 total amount due for the vendorCredit
 * @param   {number}    vendorCredit.appliedAmount          amount applied to a Bill
 * @param   {number}    vendorCredit.creditStatus           apply status for Vendor Credit (FullyApplied [value = "0"], Unapplied [value = "1"], and PartiallyApplied [value = "2"])
 * @param   {string}    vendorCredit.description            a brief description about the vendorCredit
 * @param   {string}    vendorCredit.createdTime            the date and time the vendorCredit was created
 * @param   {string}    vendorCredit.updatedTime            the date and time the vendorCredit was last updated
 * @param   {object[]}  vendorCredit.vendorCreditLineItems  an array of <a href="index.html#vendorcreditlineitementity" target="_blank">vendorCreditLineItem objects</a>
 * @param   {object}    metadata                            the list of all fields and metadata for the vendor credit entity type
 *
 * @throws  {IncorrectEntityException}                      this exception is thrown if the object passed does not have an entity type of VendorCredit
 */

// entity class which represents a VendorCredit entity
class VendorCreditEntity {
    constructor(vendorCredit, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (vendorCredit.entity !== 'VendorCredit') {
            throw new IncorrectEntityException(
                vendorCredit.entity,
                'VendorCredit'
            );
        }

        this.entity = vendorCredit.entity;
        this.id = vendorCredit.id;
        this.isActive = vendorCredit.isActive;
        this.vendorId = vendorCredit.vendorId;
        this.refNumber = vendorCredit.refNumber;
        this.approvalStatus = vendorCredit.approvalStatus;
        this.creditDate = vendorCredit.creditDate;
        this.glPostingDate = vendorCredit.glPostingDate;
        this.amount = vendorCredit.amount;
        this.appliedAmount = vendorCredit.appliedAmount;
        this.creditStatus = vendorCredit.creditStatus;
        this.description = vendorCredit.description;
        this.createdTime = vendorCredit.createdTime;
        this.updatedTime = vendorCredit.updatedTime;
        this.vendorCreditLineItems = vendorCredit.vendorCreditLineItems;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = VendorCreditEntity;
