/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

IncorrectEntityException
- Should instantiate with proper message

*/

const MissingRequiredFieldException = require('../lib/Exceptions/MissingRequiredFieldException');

describe('MissingRequiredFieldException', () => {
    describe('constructor', () => {
        it('should instantiate with proper error message', () => {
            const requiredField = 'id';

            const exception = new MissingRequiredFieldException(requiredField);

            expect(exception.message).toEqual(
                'Missing required field: id, please define id.'
            );
        });
    });
});
