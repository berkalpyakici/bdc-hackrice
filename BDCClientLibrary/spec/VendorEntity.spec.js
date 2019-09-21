/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

Vendor Constructor
- instanties with all of the appropriate fields
    - entity
    - id 
    - isActive 
    - name 
    - shortName 
    - nameOnCheck 
    - companyName 
    - accNumber 
    - taxId 
    - track1099 
    - address1 
    - address2 
    - address3 
    - address4 
    - addressCity 
    - addressState 
    - addressZip 
    - addressCountry 
    - email 
    - fax 
    - phone 
    - payBy 
    - paymentEmail 
    - paymentPhone 
    - description 
    - createdTime 
    - updatedTime 
    - contactFirstName 
    - contactLastName 
    - mergedIntoId 
    - accountType 
- instantiates with BDC Vendor metadata
- throws an IncorrectEntityException if object passed in is not of the correct entity type

*/

const VendorEntity = require('../lib/Entities/VendorEntity');

describe('VendorEntity', () => {
    describe('constructor', () => {
        // initialize vendorData modeled after an actual response object
        const vendorData = {
            entity: 'Vendor',
            id: 'xxxxxxxxxxxxxxxxxxxx',
            isActive: '1',
            name: 'Riku',
            shortName: null,
            nameOnCheck: 'Riku',
            companyName: null,
            accNumber: '',
            taxId: '',
            taxIdType: null,
            track1099: false,
            address1: null,
            address2: null,
            address3: null,
            address4: null,
            addressCity: null,
            addressState: null,
            addressZip: null,
            addressCountry: null,
            email: null,
            fax: null,
            phone: null,
            payBy: '0',
            paymentEmail: null,
            paymentPhone: null,
            description: null,
            createdTime: '2019-08-19T18:30:45.000+0000',
            updatedTime: '2019-08-19T18:30:45.000+0000',
            contactFirstName: null,
            contactLastName: null,
            mergedIntoId: '00000000000000000000',
            accountType: '0',
            paymentTermId: '00000000000000000000',
            sendNotifications: true,
            balance: 0,
            lastBalanceUpdate: null,
            externalBillPayIn12m: null,
            since: null,
            payDaysBefore: null,
            enabledCombinePayments: true,
            hasBankAccountAutoPay: false,
            billCurrency: null,
            billSyncPref: '0',
            paymentCurrency: null,
            prefPmtMethod: '1',
            paymentPurpose: null,
            bankCountry: null,
            vendorBankAccountStatus: -1,
            sendInviteForPrivateVendor: true
        };

        // initialize metadata modeled after actual BDC metadata object
        const metadata = {
            attributes: { display: ['name'] },
            fields: {
                id: {
                    readonly: true,
                    required: false,
                    type: 'IdField',
                    entity: 'Vendor',
                    label: 'Id'
                }
            }
        };

        const vendor = new VendorEntity(vendorData, metadata);

        it('should instantiate with all of the appropriate attributes', () => {
            expect(vendor.entity).toEqual('Vendor');
            expect(vendor.id).not.toBeUndefined();
            expect(vendor.isActive).not.toBeUndefined();
            expect(vendor.name).not.toBeUndefined();
            expect(vendor.shortName).not.toBeUndefined();
            expect(vendor.nameOnCheck).not.toBeUndefined();
            expect(vendor.companyName).not.toBeUndefined();
            expect(vendor.accNumber).not.toBeUndefined();
            expect(vendor.taxId).not.toBeUndefined();
            expect(vendor.track1099).not.toBeUndefined();
            expect(vendor.address1).not.toBeUndefined();
            expect(vendor.address2).not.toBeUndefined();
            expect(vendor.address3).not.toBeUndefined();
            expect(vendor.address4).not.toBeUndefined();
            expect(vendor.addressCity).not.toBeUndefined();
            expect(vendor.addressState).not.toBeUndefined();
            expect(vendor.addressZip).not.toBeUndefined();
            expect(vendor.addressCountry).not.toBeUndefined();
            expect(vendor.email).not.toBeUndefined();
            expect(vendor.fax).not.toBeUndefined();
            expect(vendor.phone).not.toBeUndefined();
            expect(vendor.payBy).not.toBeUndefined();
            expect(vendor.paymentEmail).not.toBeUndefined();
            expect(vendor.paymentPhone).not.toBeUndefined();
            expect(vendor.description).not.toBeUndefined();
            expect(vendor.createdTime).not.toBeUndefined();
            expect(vendor.updatedTime).not.toBeUndefined();
            expect(vendor.contactFirstName).not.toBeUndefined();
            expect(vendor.contactLastName).not.toBeUndefined();
            expect(vendor.mergedIntoId).not.toBeUndefined();
            expect(vendor.accountType).not.toBeUndefined();
            expect(vendor.metadata.fields.id.entity).toEqual('Vendor');
        });

        it('should throw a IncorrectEntityException if request is unsuccessful', async () => {
            let errorMessage = 'No error thrown.';

            try {
                vendorData.entity = 'Customer';

                const newVendor = new VendorEntity(vendorData, metadata);
            } catch (error) {
                errorMessage = error.message;
            }

            expect(errorMessage).toBe(
                'Incorrect entity type: Customer. Expected entity type: Vendor.'
            );
        });
    });
});
