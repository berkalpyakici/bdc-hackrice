class IncorrectEntityException extends Error {
    constructor(entity, expectedEntity) {
        super(
            `Incorrect entity type: ${entity}. Expected entity type: ${expectedEntity}.`
        );

        // include the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = IncorrectEntityException;
