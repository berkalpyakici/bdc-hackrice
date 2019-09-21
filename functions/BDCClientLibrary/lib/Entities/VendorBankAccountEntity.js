const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * To pay vendors via an Automated Clearing House (ACH), the vendor must provide bank account information.
 * This information is encrypted and stored securely. The session needs to be Multi Factor Authentication (MFA) trusted
 * before calling any of the vendor bank account methods, and the read results only display the last 4 digits of the account
 * and routing details.
 * This class houses the parameters required to read, list, and update vendor bank account information.
 *
 * @param   {object}    vendorBankAccount                the details of a vendorBankAccount
 * @param   {string}    vendorId                         the system generated vendor ID of the vendor you need to add the bank account
 * @param   {string}    routingNumber                    the bank routing number
 * @param   {string}    accountNumber                    the bank account number
 * @param   {boolean}   usersId                          the system generated ID of the user who is adding this bank account
 * @param   {object}    vendorBankAccount                an array of VendorBankAccount objects that include the details of the bank account
 * @param   {string}    vendorBankAccount.id             the system generated vendor bank account ID
 * @param   {string}    vendorBankAccount.isActive       denotes if the object is active [value = "1"] or inactive [value = "2"]
 * @param   {string}    vendorBankAccount.createdTime    the date and time the vendor bank account details were added to the system
 * @param   {string}    vendorBankAccount.updatedTime    the date and time the vendor bank account details were last updated
 * @param   {boolean}   vendorBankAccount.isSavings      denotes if the account is a savings account [value = true] or not [value = false]
 * @param   {boolean}   vendorBankAccount.isPersonalAcct denotes if the account is a personal account [value = true] or business bank account [value = false]
 * @param   {object}    metadata                         the fields and metadata of the vendor bank account entity
 *
 * @throws  {IncorrectEntityException}                   this exception is thrown if the object passed does not have an entity type of VendorBankAccount
 */

// entity class which represents a VendorBankAccount entity
class VendorBankAccountEntity {
    constructor(vendorBankAccount, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (vendorBankAccount.entity !== 'VendorBankAccount') {
            throw new IncorrectEntityException(
                vendorBankAccount.entity,
                'VendorBankAccount'
            );
        }

        this.entity = vendorBankAccount.entity;
        this.id = vendorBankAccount.id;
        this.isActive = vendorBankAccount.isActive;
        this.createdTime = vendorBankAccount.createdTime;
        this.updatedTime = vendorBankAccount.updatedTime;
        this.vendorId = vendorBankAccount.vendorId;
        this.accountNumber = vendorBankAccount.accountNumber;
        this.routingNumber = vendorBankAccount.routingNumber;
        this.usersId = vendorBankAccount.usersId;
        this.status = vendorBankAccount.status;
        this.isSavings = vendorBankAccount.isSavings;
        this.isPersonalAcct = vendorBankAccount.isPersonalAcct;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = VendorBankAccountEntity;
