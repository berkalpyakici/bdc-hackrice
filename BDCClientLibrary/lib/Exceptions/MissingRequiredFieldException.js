class MissingRequiredFieldException extends Error {
    constructor(requiredField) {
        super(
            `Missing required field: ${requiredField}, please define ${requiredField}.`
        );

        // include the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = MissingRequiredFieldException;
