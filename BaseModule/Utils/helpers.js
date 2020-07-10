import { Linking, Platform } from 'react-native';
import { AppUpdateConfig } from '../Network/ApiConfig';
import { RANDOM_STRING_ALPHA_NUMERIC } from './Constants';
import moment from 'moment-timezone';

export const isValidElement = (data) => {
    return data !== null && data !== undefined;
};

export const isValidString = (data) => {
    return data !== null && data !== undefined && data !== '';
};

/**
 * return safe Int Value
 * @param value
 * @param decimal
 * @returns {number}
 */
export const safeFloatValue = (value, decimal = 2) => {
    if (isValidElement(value)) {
        try {
            return parseFloat(value).toFixed(decimal);
        } catch (e) {
            return 0.0;
        }
    } else {
        return 0.0;
    }
};

export const safeFloatValueWithoutDecimal = (value) => {
    if (isValidElement(value)) {
        try {
            return parseFloat(value);
        } catch (e) {
            return 0.0;
        }
    } else {
        return 0.0;
    }
};

/**
 * return safe Int Value
 * @param value
 * @returns {number}
 */
export const safeIntValue = (value) => {
    if (isValidElement(value)) {
        try {
            return parseInt(value);
        } catch (e) {
            return 0;
        }
    } else {
        return 0;
    }
};

export const trimDecimal = (text) => {
    let decimal = text
        .replace(' ', '')
        .replace('-', '')
        .replace(',', '')
        .replace(/[^0-9.]|\.(?=.*\.)/g, '');
    return decimal.split('.').length === 2 && decimal.split('.')[1].length > 2
        ? (Math.floor(parseFloat(decimal) * 100) / 100).toFixed(2).toString()
        : decimal;
};

export const trimInteger = (text) =>
    text
        .replace(' ', '')
        .replace('.', '')
        .replace('-', '')
        .replace(',', '')
        .replace(/[^0-9.]|\.(?=.*\.)/g, '');

export const capsWordCase = (str) => {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
};

export const getDeviceOS = () => {
    if (Platform.OS === 'ios') {
        return 'iOS';
    } else {
        return 'ANDROID';
    }
};

export const isNewerVersion = (oldVer, newVer) => {
    const oldParts = oldVer.toString().split('.');
    const newParts = newVer.toString().split('.');
    for (let i = 0; i < newParts.length; i++) {
        const a = parseInt(newParts[i]) || 0;
        const b = parseInt(oldParts[i]) || 0;
        if (a > b) return true;
        if (a < b) return false;
    }
    return false;
};

export function getPlatformID() {
    return Platform.OS === 'ios' ? AppUpdateConfig.platformID.iOS : AppUpdateConfig.platformID.android;
}

export const callNumber = (url) => {
    Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) {
                // Not support for Dial Pad
            } else {
                return Linking.openURL(url);
            }
        })
        .catch((err) => {
            // Error
        });
};
export const getNextPage = (currentPage, lastPage) => {
    if (currentPage !== lastPage && lastPage > 1) {
        return currentPage + 1;
    }
    return -1;
};
export const validateRegex = (pattern, data) => {
    let regex = new RegExp(pattern);
    return regex.test(data);
};

/**
 * is More than Zero
 * @param value
 * @returns {*|boolean|boolean}
 */
export const isNegativeValue = (value) => {
    if (isValidElement(value)) {
        try {
            return parseFloat(value) < 0.0;
        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
};

/**
 * return safe Absolute Value
 * @param value
 * @returns {number}
 */
export const safeAbsoluteValue = (value) => {
    if (isValidElement(value)) {
        try {
            let values = parseFloat(value).toFixed(2);
            return Math.abs(values);
        } catch (e) {
            return 0;
        }
    } else {
        return 0;
    }
};

/**
 * is More than Zero
 * @param value
 * @returns {*|boolean|boolean}
 */
export const isMoreZero = (value) => {
    if (isValidElement(value)) {
        try {
            return parseFloat(value) > 0;
        } catch (e) {
            return false;
        }
    } else {
        return false;
    }
};

export const isNonEmptyString = (data) => {
    return data !== null && data !== undefined && data.toString().length > 0;
};

export const checkAndAppend = (value, placeholder) => {
    return `${placeholder}  ${isValidString(value) ? ' - ' + value : ''}`;
};

export const prefixZero = (number, length = 2) => {
    let string = '' + number;
    while (string.length < length) {
        string = '0' + string;
    }
    return string;
};

/**
 *
 * @param length
 * @returns {string}
 * Genrate and return random string of Given length from available alpha numeric characters
 */
export const randomStringWithLength = (length) => {
    var randomStrArr = [];
    var ALPHANUMERIC = RANDOM_STRING_ALPHA_NUMERIC.ALPHANUMERIC;
    for (var i = 0; i < length; i++) {
        randomStrArr[i] = ALPHANUMERIC.substr(Math.floor(Math.random() * ALPHANUMERIC.length), 1);
    }
    return randomStrArr.join('').toUpperCase();
};

export const getDateStr = (date, format) => {
    return moment(date).format(format);
};

export const firstCharacterUpperCased = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const firstWordUpperCased = (text) => {
    let output = '';
    let words = text.trim().split(' ');
    words.forEach((value) => {
        output = output + firstCharacterUpperCased(value) + ' ';
    });
    return output;
};

export const checkRegexPatternTest = (pattern, data) => {
    let testPattern = new RegExp(pattern);
    return testPattern.test(data);
};

export const isLessThan10MB = (bytes) => {
    let mb = bytes / 1000 / 1000;
    return mb < 10;
};

export const isDesiredFormat = (type) => {
    let desiredFormats = ['image/jpeg', 'image/jpg', 'image/png'];
    return desiredFormats.indexOf(type) > -1;
};

export const EMAIL_PATTERN = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';

export const isValidURL = (str) => {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return regexp.test(str);
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

export const isEmpty = (string) => {
    return !string || string.length === 0;
};

export const INDIAN_MOBILE_NUMBER_PATTERN =
    "^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[789]\\d{9}$";
