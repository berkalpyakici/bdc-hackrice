class FailedRequestException extends Error {
    constructor(json) {
        // make the error message we get back in the api response data the message of the error
        super(json.response_data.error_message);
        // include stack trace
        Error.captureStackTrace(this, this.constructor);

        // include BDC error code and link to error code descriptions
        this.BDCErrorCode = json.response_data.error_code;
        this.BDCErrorCodeList =
            'https://developer.bill.com/hc/en-us/articles/208762056-Error-codes-list';
    }
}

module.exports = FailedRequestException;
