"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
};
function validateRequest(req, res, next, schema) {
    const { error, value } = schema.validate(req.body, validationOptions);
    if (error) {
        return next(new Error(`Validation error: ${error.details.map(x => x.message).join(", ")}`));
    }
    req.body = value;
    next();
}
