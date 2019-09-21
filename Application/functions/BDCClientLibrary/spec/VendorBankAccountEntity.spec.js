/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

VendorBankAccountEntity Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - isActive
    - createdTime
    - updatedTime
    - vendorId
    - accountNumber
    - routingNumber
    - usersId
    - status
    - isSavings
    - isPersonalAcct
- instantiates with BDC VendorBankAccount metadata
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const VendorBankAccountEntity = require('../lib/Entities/VendorBankAccountEntity');

describe('VendorBankAccountEntity', () => {
    describe('constructor', () => {
        // initialize vendorBankAccountData modeled after an actual response object
        const vendorBankAccountData = {
            entity: 'VendorBankAccount',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            isActive: '1',
            createdTime: '2019-08-19T22:33:34.000+0000',
            updatedTime: '2019-08-19T22:33:43.000+0000',
            vendorId: 'xxxxxxxxxxxxxxxxxxxx',
            nameOnAcct: null,
            accountNumber: '******7890',
            routingNumber: '322271627',
            usersId: 'xxxxxxxxxxxxxxxxxxxx',
            status: '1',
            isSavings: false,
            isPersonalAcct: true,
            intlEPaymentAcct: false,
            paymentCurrency: null,
            bankCountry: null,
            vendorBankData: null,
            intlTemplateKey: null,
            regulatory1: null,
            regulatory2: null,
            regulatory3: null,
            regulatory4: null,
            regulatory5: null,
            regulatory6: null,
            regulatory7: null
        };
        // initialize metadata modeled after actual BDC metadata object
        const metadata = {
            attributes: { display: ['accountNumber'] },
            fields: {
                id: {
                    readonly: true,
                    required: false,
                    type: 'IdField',
                    entity: 'VendorBankAccount',
                    label: 'id'
                }
            }
        };

        const vendorBankAccount = new VendorBankAccountEntity(
            vendorBankAccountData,
            metadata
        );

        it('should instantiate with all of the appropriate attributes', () => {
            expect(vendorBankAccount.entity).toEqual('VendorBankAccount');
            expect(vendorBankAccount.id).not.toBeUndefined();
            expect(vendorBankAccount.isActive).not.toBeUndefined();
            expect(vendorBankAccount.createdTime).not.toBeUndefined();
            expect(vendorBankAccount.updatedTime).not.toBeUndefined();
            expect(vendorBankAccount.vendorId).not.toBeUndefined();
            expect(vendorBankAccount.accountNumber).not.toBeUndefined();
            expect(vendorBankAccount.routingNumber).not.toBeUndefined();
            expect(vendorBankAccount.usersId).not.toBeUndefined();
            expect(vendorBankAccount.status).not.toBeUndefined();
            expect(vendorBankAccount.isSavings).not.toBeUndefined();
            expect(vendorBankAccount.isPersonalAcct).not.toBeUndefined();
            expect(vendorBankAccount.metadata.fields.id.entity).toEqual(
                'VendorBankAccount'
            );
        });

        it('should throw a IncorrectEntityException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                vendorBankAccountData.entity = 'CustomerBankAccount';

                const newVendorBankAccount = new VendorBankAccountEntity(
                    vendorBankAccountData,
                    metadata
                );
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: CustomerBankAccount. Expected entity type: VendorBankAccount.'
            );
        });
    });
});
