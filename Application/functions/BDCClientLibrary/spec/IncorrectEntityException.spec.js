/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

IncorrectEntityException
- Should instantiate with proper error message

*/

const IncorrectEntityException = require('../lib/Exceptions/IncorrectEntityException');

describe('IncorrectEntityException', () => {
    describe('constructor', () => {
        it('should instantiate with proper error message', () => {
            const entity = 'Vendor';
            const expectedEntity = 'Customer';

            const exception = new IncorrectEntityException(
                entity,
                expectedEntity
            );

            expect(exception.message).toEqual(
                'Incorrect entity type: Vendor. Expected entity type: Customer.'
            );
        });
    });
});
