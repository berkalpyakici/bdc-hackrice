/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

CustomerBankAccountEntity Constructor
- instanties with all of the appropriate fields
    - entity 
    - id
    - isActive
    - createdTime
    - updatedTime
    - customerId
    - nameOnAccount
    - nickname
    - routingNumber
    - accountNumber
    - isLockedByOrg
    - isSavings
    - isPersonalAcct
    - isWrittenAuth
- should instantiate with BDC CustomerBankAccount metadata
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const CustomerBankAccountEntity = require('../lib/Entities/CustomerBankAccountEntity');

describe('CustomerBankAccountEntity', () => {
    describe('constructor', () => {
        // initialize customerBankAccountData modeled after an actual response object
        const customerBankAccountData = {
            entity: 'CustomerBankAccount',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            isActive: '1',
            createdTime: '2019-08-20T20:21:50.000+0000',
            updatedTime: '2019-08-20T20:21:50.000+0000',
            customerId: 'xxxxxxxxxxxxxxxxxxxx',
            nameOnAccount: 'Kairi',
            nickname: 'Kairi',
            routingNumber: '322271627',
            accountNumber: '******7890',
            isLockedByOrg: false,
            isSavings: false,
            isPersonalAcct: false,
            isWrittenAuth: true
        };
        // initialize metadata modeled after actual BDC metadata object
        const metadata = {
            attributes: { display: ['nickname', 'accountNumber'] },
            fields: {
                id: {
                    readonly: true,
                    required: false,
                    type: 'IdField',
                    entity: 'CustomerBankAccount',
                    label: 'Id'
                }
            }
        };

        const customerBankAccount = new CustomerBankAccountEntity(
            customerBankAccountData,
            metadata
        );

        it('should instantiate with all of the appropriate attributes`', () => {
            expect(customerBankAccount.entity).toEqual('CustomerBankAccount');
            expect(customerBankAccount.id).not.toBeUndefined();
            expect(customerBankAccount.isActive).not.toBeUndefined();
            expect(customerBankAccount.createdTime).not.toBeUndefined();
            expect(customerBankAccount.updatedTime).not.toBeUndefined();
            expect(customerBankAccount.customerId).not.toBeUndefined();
            expect(customerBankAccount.nameOnAccount).not.toBeUndefined();
            expect(customerBankAccount.routingNumber).not.toBeUndefined();
            expect(customerBankAccount.accountNumber).not.toBeUndefined();
            expect(customerBankAccount.isLockedByOrg).not.toBeUndefined();
            expect(customerBankAccount.isSavings).not.toBeUndefined();
            expect(customerBankAccount.isPersonalAcct).not.toBeUndefined();
            expect(customerBankAccount.isWrittenAuth).not.toBeUndefined();
            expect(customerBankAccount.metadata.fields.id.entity).toEqual(
                'CustomerBankAccount'
            );
        });

        it('should throw a IncorrectEntityException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                customerBankAccountData.entity = 'VendorBankAccount';

                const newCustomerBankAccount = new CustomerBankAccountEntity(
                    customerBankAccountData,
                    metadata
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: VendorBankAccount. Expected entity type: CustomerBankAccount.'
            );
        });
    });
});
