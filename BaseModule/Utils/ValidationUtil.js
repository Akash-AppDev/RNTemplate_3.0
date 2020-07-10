import { RNConfig } from './RNConfig';
import { validateRegex } from './helpers';

/**
 * POSTCODE VALIDATION FORMATTER
 * USE: Formatting entered postcode as mentioned below example
 * UK POSTCODES:
 1) AA9A 9AA
 2) A9A 9AA
 3) A9 9AA
 4) A99 9AA
 5) AA9 9AA
 6) AA99 9AA
 7) BFPO 01, BFPO 012.
 * */
export const formatPostcodeFormatUK = (postcode) => {
    let replacedPostcodeString = postcode.toUpperCase();
    let postcodeFormat = /(([A-Z]{1,2}[0-9][A-Z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)/g;
    let enteredString = replacedPostcodeString.replace(/[ ]/g, '');
    let stringLength = enteredString.length;
    let bfpoPostcode = false;
    if (enteredString.length > 4) {
        if (enteredString.substring(0, 4) === 'BFPO') {
            bfpoPostcode = true;
        }
    }
    if (isValidFormat(postcodeFormat, enteredString) && !bfpoPostcode) {
        switch (stringLength) {
            case 5:
                return enteredString.substring(0, 2) + ' ' + enteredString.substring(2, 5);
            case 6:
                return enteredString.substring(0, 3) + ' ' + enteredString.substring(3, 6);
            case 7:
                return enteredString.substring(0, 4) + ' ' + enteredString.substring(4, 7);
            default:
                if (stringLength > 4) {
                    return enteredString.substring(0, 4) + ' ' + enteredString.substring(4, enteredString.length);
                }
                return replacedPostcodeString;
        }
    } else if (bfpoPostcode) {
        if (stringLength > 4) {
            return enteredString.substring(0, 4) + ' ' + enteredString.substring(4, enteredString.length);
        }
    }
    return replacedPostcodeString;
};

export const isValidFormat = (regex, enteredString) => {
    if (regex.test(enteredString)) {
        return true;
    }
    return false;
};
export const priceValidationFormatter = (text) => {
    return text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
};
export const postcodeValidationFormatter = (text) => {
    return text.replace(/[^a-zA-Z0-9\s]/g, '');
};
export const distanceValidationFormatter = (text) => {
    return text
        .replace(/[^\d.]/g, '')
        .replace(new RegExp('(^[\\d]{2})[\\d]', 'g'), '$1')
        .replace(/(\..*)\./g, '$1')
        .replace(new RegExp('(\\.[\\d]).', 'g'), '$1');
};

export const isValidPostCode = (postCode, countryId) => {
    switch (countryId) {
        case RNConfig.country.UK:
            return validateRegex(RNConfig.postcodeRegex.UK, postCode);
        case RNConfig.country.IRE:
            return validateRegex(RNConfig.postcodeRegex.IRE, postCode);
        case RNConfig.country.AUS:
        case RNConfig.country.NZ:
            return validateRegex(RNConfig.postcodeRegex.AUS_NZ, postCode);
        default:
            return false;
    }
};

export const AtoZFormatter = (text) => {
    return text.replace(/[^A-Za-z\s]/g, '');
};
