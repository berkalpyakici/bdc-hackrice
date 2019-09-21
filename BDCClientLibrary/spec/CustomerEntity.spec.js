/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

Customer Constructor
- instanties with all of the appropriate fields
    - entity
    - id
    - isActive
    - createdTime
    - updatedTime
    - name
    - shortName
    - parentCustomerId
    - companyName
    - contactFirstName
    - contactLastName
    - accNumber
    - billAddress1
    - billAddress2
    - billAddress3
    - billAddress4
    - billAddressCity
    - billAddressState
    - billAddressCountry
    - billAddressZip
    - shipAddress1
    - shipAddress2
    - shipAddress3
    - shipAddress4
    - shipAddressCity
    - shipAddressState
    - shipAddressCountry
    - shipAddressZip
    - email
    - phone
    - altPhone
    - fax
    - description
    - printAs
    - mergedIntoId
    - hasAuthorizedToCharge
    - accountType
- instantiates with BDC Customer metadata
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const CustomerEntity = require('../lib/Entities/CustomerEntity');

describe('CustomerEntity', () => {
    describe('constructor', () => {
        // initialize customerData modeled after an actual response object
        const customerData = {
            entity: 'Customer',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            isActive: '1',
            createdTime: '2019-08-19T16:42:31.000+0000',
            updatedTime: '2019-08-19T16:42:31.000+0000',
            name: 'Sora',
            shortName: null,
            parentCustomerId: '00000000000000000000',
            companyName: null,
            contactFirstName: null,
            contactLastName: null,
            accNumber: null,
            billAddress1: null,
            billAddress2: null,
            billAddress3: null,
            billAddress4: null,
            billAddressCity: null,
            billAddressState: null,
            billAddressCountry: null,
            billAddressZip: null,
            shipAddress1: null,
            shipAddress2: null,
            shipAddress3: null,
            shipAddress4: null,
            shipAddressCity: null,
            shipAddressState: null,
            shipAddressCountry: null,
            shipAddressZip: null,
            email: null,
            phone: null,
            altPhone: null,
            fax: null,
            description: null,
            printAs: null,
            mergedIntoId: '00000000000000000000',
            hasAuthorizedToCharge: false,
            accountType: '1',
            paymentTermId: '00000000000000000000',
            balance: 0,
            availCredit: 0,
            taxId: null,
            hasBankAccount: false,
            hasNetBankAccount: false,
            hasBankAccountAutoPay: false,
            hasCreditCard: false,
            hasCreditCardAutoPay: false,
            defaultDeliveryMethod: null,
            isAutoChargeDismissed: false
        };

        // initialize metadata modeled after actual BDC metadata object
        const metadata = {
            attributes: { display: ['name'] },
            fields: {
                id: {
                    readonly: true,
                    required: false,
                    type: 'IdField',
                    entity: 'Customer',
                    label: 'Id'
                }
            }
        };

        const customer = new CustomerEntity(customerData, metadata);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(customer.entity).toEqual('Customer');
            expect(customer.id).not.toBeUndefined();
            expect(customer.isActive).not.toBeUndefined();
            expect(customer.createdTime).not.toBeUndefined();
            expect(customer.updatedTime).not.toBeUndefined();
            expect(customer.name).not.toBeUndefined();
            expect(customer.shortName).not.toBeUndefined();
            expect(customer.parentCustomerId).not.toBeUndefined();
            expect(customer.companyName).not.toBeUndefined();
            expect(customer.contactFirstName).not.toBeUndefined();
            expect(customer.contactLastName).not.toBeUndefined();
            expect(customer.accNumber).not.toBeUndefined();
            expect(customer.billAddress1).not.toBeUndefined();
            expect(customer.billAddress2).not.toBeUndefined();
            expect(customer.billAddress3).not.toBeUndefined();
            expect(customer.billAddress4).not.toBeUndefined();
            expect(customer.billAddressCity).not.toBeUndefined();
            expect(customer.billAddressState).not.toBeUndefined();
            expect(customer.billAddressCountry).not.toBeUndefined();
            expect(customer.billAddressZip).not.toBeUndefined();
            expect(customer.shipAddress1).not.toBeUndefined();
            expect(customer.shipAddress2).not.toBeUndefined();
            expect(customer.shipAddress3).not.toBeUndefined();
            expect(customer.shipAddress4).not.toBeUndefined();
            expect(customer.shipAddressCity).not.toBeUndefined();
            expect(customer.shipAddressState).not.toBeUndefined();
            expect(customer.shipAddressCountry).not.toBeUndefined();
            expect(customer.shipAddressZip).not.toBeUndefined();
            expect(customer.email).not.toBeUndefined();
            expect(customer.phone).not.toBeUndefined();
            expect(customer.altPhone).not.toBeUndefined();
            expect(customer.fax).not.toBeUndefined();
            expect(customer.description).not.toBeUndefined();
            expect(customer.printAs).not.toBeUndefined();
            expect(customer.mergedIntoId).not.toBeUndefined();
            expect(customer.hasAuthorizedToCharge).not.toBeUndefined();
            expect(customer.accountType).not.toBeUndefined();

            expect(customer.metadata.fields.id.entity).toEqual('Customer');
        });

        it('should throw a IncorrectEntityException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                customerData.entity = 'Vendor';

                const newCustomer = new CustomerEntity(customerData, metadata);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Vendor. Expected entity type: Customer.'
            );
        });
    });
});
