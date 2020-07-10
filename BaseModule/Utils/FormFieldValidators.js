import { checkRegexPatternTest, EMAIL_PATTERN, INDIAN_MOBILE_NUMBER_PATTERN } from "./helpers";

const ValidationError = {
    INVALID_STRING: "Please enter a valid value",
    INVALID_EMAILADDRESS: "Please enter a valid email address",
    INVALID_PHONENUMBER: "Please enter a valid contact number",
    REGEX_MISMATCH: "The given string is not in the required format"
}

export const isValidObject = (value) => value !== null && value !== undefined;

export const isValidString = (data, customMsg) => {
    const isValid = data !== null && data !== undefined && data !== '';
    const msgToSend = isValidObject(customMsg) ? customMsg : ValidationError.INVALID_STRING;
    const errorMsg = isValid ? null : msgToSend;
    return { value: data, hasError: !isValid, errorMsg };
};

export const isValidEmail = (data, customMsg) => {
    const msg = isValidObject(customMsg) ? customMsg : ValidationError.INVALID_EMAILADDRESS;
    return matchesRegex(data, EMAIL_PATTERN, msg);
}

export const isValidPhoneNumber = (data, customMsg) => {
    const msg = isValidObject(customMsg) ? customMsg : ValidationError.INVALID_PHONENUMBER;
    return matchesRegex(data, INDIAN_MOBILE_NUMBER_PATTERN, msg);
}

/**
 * Validates whether the given data matches the given regular expression
 */
export const matchesRegex = (data, regex, defaultMsg) => {
    const msgToSend = isValidObject(defaultMsg) ? defaultMsg : ValidationError.REGEX_MISMATCH;
    const isValid = checkRegexPatternTest(regex, data);
    const errorMsg = isValid ? null : msgToSend;
    return { value: data, hasError: !isValid, errorMsg };
}

/**
 * Validates the values against the given validation criteria.
 * 
 * @param {*} formFields an object with key as the field name and value as an object 
 * with the following format { value: "", hasError: false, errorMsg: "" }. Any other
 * format will result in the validation to fail
 * @param {*} validators An object with key as the field name and value as an array of
 * validator functions as defined in this file
 * 
 * @returns: An object with the exact same format as the formfields with the 
 * hasError and errorMsg values updated with the validation results
 */
export const validateFields = (formFields, validators) => {
    const results = {};
    const formFieldKeys = Object.keys(formFields);
    let hasError = false;

    formFieldKeys.forEach((key) => {
        const value = formFields[key].value;
        const validationFunctions = validators[key];
        const result = validate(value, validationFunctions);
        hasError = hasError || result.hasError 
        results[key] = result;
    });
    return { results, hasError }
}

/**
 * Validates a given value through a given array of validation functions
 */
const validate = (value, validatorFns) => {

    const validationSuccess = { value: value, hasError: false, errorMsg: "" }
    // There are either no validation methods to execute or else there was
    // a type mismatch. In this case return hasError to be false.
    console.log(validatorFns.length);
    if (!isValidObject(validatorFns) || validatorFns.length == 0) {
        return validationSuccess;
    }

    // Check whether all the validation functions passes. 
    for (let index = 0; index < validatorFns.length; index++) {
        const validationFunction = validatorFns[index];
        const result = validationFunction(value);
        if (result.hasError) {
            return result
        }
    }
    return validationSuccess;
}