import { Constants, NETWORK_CONSTANTS } from '../Utils/Constants';
import { isValidElement } from '../Utils/helpers';
import { logAPIErrorEvent, parseAPIEndPoint } from '../Network/NetworkHelpers';

export const requestHandler = async (request) => {
    if (__DEV__) {
        console.log('Request Data:', request.data);
        console.log('Request Headers:', request.headers);
        console.log('Request Config:', request);
    }
    return request;
};
export const successHandler = (response) => {
    return response.data;
};
export const errorHandler = (error) => {
    let errorObject = {
        type: '',
        message: ''
    };
    if (error.response) {
        if (__DEV__) {
            console.log('Response Status:', error.response.status);
            console.log('Response Data:', error.response.data);
            console.log('Response Headers:', error.response.headers);
            console.log('Response Config:', error.config);
        }
        let errorParams = {
            U: '',
            M: ''
        };
        if (error.config.url !== null) {
            errorParams.url = parseAPIEndPoint(error.config.url);
        }
        errorParams.METHOD = error.config.method;
        logAPIErrorEvent(errorParams);
        if (error.response.status >= 500 && error.response.status < 599) {
            errorObject.type = NETWORK_CONSTANTS.API_ERROR;
            errorObject.message = Constants.SERVER_ERROR;
            return Promise.reject(errorObject);
        } else {
            if (Object.prototype.hasOwnProperty.call(error.response.data, 'errors')) {
                let dataError = error.response.data;
                let errors = '';
                for (var key in dataError.errors) {
                    errors += dataError.errors[key];
                }
                errorObject.type = NETWORK_CONSTANTS.API_ERROR;
                errorObject.message = errors;
                return Promise.reject(errorObject);
            } else {
                if (isValidElement(error.response.data) && isValidElement(error.response.data.error.message)) {
                    let message = error.response.data.error.message;
                    errorObject.type = NETWORK_CONSTANTS.API_ERROR;
                    errorObject.message = message;
                    return Promise.reject(errorObject);
                } else {
                    errorObject.type = NETWORK_CONSTANTS.API_ERROR;
                    errorObject.message = Constants.WENT_WRONG;
                    return Promise.reject(errorObject);
                }
            }
        }
    } else {
        // Something else happened while setting up the request
        if (__DEV__) {
            console.log('Error Message:', error.message);
        }
        logAPIErrorEvent({ error_config: JSON.stringify(error.config) });
        if (isValidElement(error) && isValidElement(error.message)) {
            let message = error.message;
            if (message.includes('timeout')) {
                message = Constants.TIMEOUT_ERROR;
            }
            errorObject.type = NETWORK_CONSTANTS.NETWORK_ERROR;
            errorObject.message = message;
            return Promise.reject(errorObject);
        } else {
            errorObject.type = NETWORK_CONSTANTS.NETWORK_ERROR;
            errorObject.message = Constants.WENT_WRONG;
            return Promise.reject(errorObject);
        }
    }
};
