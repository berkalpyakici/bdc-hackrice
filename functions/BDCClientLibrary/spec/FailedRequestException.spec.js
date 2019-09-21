/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/*
Tests

FailedRequestException
- Should instantiate with BDCErrorCode & BDCErrorCodeList properties

*/

const FailedRequestException = require('../lib/Exceptions/FailedRequestException');

describe('FailedRequestException', () => {
    describe('constructor', () => {
        it('should instantiate with message, BDCErrorCode, & BDCErrorCodeList properties', () => {
            const errorJSON = {
                response_status: 1,
                response_message: 'Error',
                response_data: {
                    error_code: 'BDC_1178',
                    error_message: 'Developer key must be specified.'
                }
            };

            const exception = new FailedRequestException(errorJSON);

            expect(exception.message).toEqual(
                'Developer key must be specified.'
            );
            expect(exception.BDCErrorCode).toEqual('BDC_1178');
            expect(exception.BDCErrorCodeList).toEqual(
                'https://developer.bill.com/hc/en-us/articles/208762056-Error-codes-list'
            );
        });
    });
});
