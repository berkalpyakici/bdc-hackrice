const IncorrectEntityException = require('../Exceptions/IncorrectEntityException');

/**
 * A Customer can only have one bank account. If the customer wants to change the details or switch to another
 * bank account, you need to delete the current bank account, and create a new bank account.
 * This class houses the parameters required to read, list, and update customer bank account information.
 *
 * @param   {object}    customerBankAccount                 the details of a customerBankAccount
 * @param   {string}    customerBankAccount.entity          the type of entity
 * @param   {string}    customerBankAccount.id              the system generated customer bank account ID
 * @param   {string}    customerBankAccount.isActive        denotes if the customer bank account is active [value="1"] or inactive [value="2"]
 * @param   {string}    customerBankAccount.createdTime     the date and time the bank account details were added to the system
 * @param   {string}    customerBankAccount.updatedTime     the date and time the bank account details were last updated
 * @param   {string}    customerBankAccount.customerId      the system generated ID of the customer this bank account is for
 * @param   {string}    customerBankAccount.nameOnAccount   the full name of the customer who owns this bank account
 * @param   {string}    customerBankAccount.nickname        the user-friendly or short version of the customer's name
 * @param   {string}    customerBankAccount.routingNumber   the bank routing number
 * @param   {string}    customerBankAccount.accountNumber   the bank account number
 * @param   {boolean}   customerBankAccount.isLockedByOrg   denotes whether the bank account can be edited/deleted by the customer [value = true] or not [value=false] through the customer portal
 * @param   {boolean}   customerBankAccount.isSavings       denotes if the account is a savings account [value = true] or not [value = false]
 * @param   {boolean}   customerBankAccount.isPersonalAcct  denotes if the account is a personal account [value = true] or business bank account [value = false]
 * @param   {boolean}   customerBankAccount.isWrittenAuth
 * @param   {object}    metadata                            the fields and metadata of the customer bank account entity
 *
 * @throws  {IncorrectEntityException}                      this exception is thrown if the object passed does not have an entity type of CustomerBankAccount
 */

// entity class which represents a CustomerBankAccount entity
class CustomerBankAccountEntity {
    constructor(customerBankAccount, metadata) {
        // check to make sure the entity type is correct, if not throw an exception
        if (customerBankAccount.entity !== 'CustomerBankAccount') {
            throw new IncorrectEntityException(
                customerBankAccount.entity,
                'CustomerBankAccount'
            );
        }

        this.entity = customerBankAccount.entity;
        this.id = customerBankAccount.id;
        this.isActive = customerBankAccount.isActive;
        this.createdTime = customerBankAccount.createdTime;
        this.updatedTime = customerBankAccount.updatedTime;
        this.customerId = customerBankAccount.customerId;
        this.nameOnAccount = customerBankAccount.nameOnAccount;
        this.nickname = customerBankAccount.nickname;
        this.routingNumber = customerBankAccount.routingNumber;
        this.accountNumber = customerBankAccount.accountNumber;
        this.isLockedByOrg = customerBankAccount.isLockedByOrg;
        this.isSavings = customerBankAccount.isSavings;
        this.isPersonalAcct = customerBankAccount.isPersonalAcct;
        this.isWrittenAuth = customerBankAccount.isWrittenAuth;

        // instantiate class with BDC entity metadata
        this.metadata = metadata;
    }
}

module.exports = CustomerBankAccountEntity;
