// Generic Error

export const Constants = {
    APP_NAME: 'Agent Kiosk',
    GENERIC_ERROR_MSG: 'Please check your internet connection and try again',
    ERROR: 'Error',
    NETWORK_ERROR: 'Network Error',
    TIMEOUT_ERROR:
        'Looks like the server is taking to long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while',
    RETRY: 'retry',
    SERVER_ERROR: 'App is temporarily unable to connect to the Server. Please try again later.',
    NO_INTERNET_CONNECTION: 'No Internet Connection',
    WENT_WRONG: 'Oops! Something went wrong.',
    SUCCESS: 'success',
    OKAY: 'Okay',
    INVALID_ACCESS_TOKEN: 'Access is denied due to invalid api token',
    UPDATED_SUCCESSFULLY: 'Updated Successfully',
    DELETED_SUCCESSFULLY: 'Deleted Successfully',
    ENABLED: 'ENABLED',
    DISABLED: 'DISABLED',
    LESS_THAN_10_MB: 'Please select image below 10Mb',
    IMAGE_TYPE: 'Selected Image type is not a valid',
    CONTACTS_PERMISSION_DISABLED:
        'Agent Kiosk app needs contact permission for reading the contacts from device. Please provide access from settings.'
};

export const Permissions = {
    DESCRIPTION: 'Agent Kiosk needs this permission to display Notifications',
    ALLOW: 'Allow',
    REJECT: 'Cancel'
};

export const NETWORK_CONSTANTS = {
    API_ERROR: 'API_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    EVENT_NAME: {
        API_ERROR_RESPONSE: 'APIErrorResponse'
    },
    ERROR: 'Error',
    ERROR_STATUS: 'ErrorStatus'
};

// Code Push
export const CODE_PUSH = {
    CODE_PUSH_TITLE: 'Agent Kiosk',
    CODE_PUSH_OPTIONAL_DESCRIPTION: 'A new version of the app is available. Would you like to update them now ?',
    CODE_PUSH_NOT_NOW: 'Not Now',
    CODE_PUSH_UPDATE: 'Update',
    CODE_PUSH_MANDATORY_DESCRIPTION: 'An update to MyTakeaway app is required to continue.'
};

export const PUSH_NOTIFICATION_CONSTANTS = {
    DEVICE_ALREADY_REGISTERED: 'A Device Registration with the specified token already exists.'
};

export const FONT_FAMILY = {
    MEDIUM: 'ProximaNova-Medium',
    REGULAR: 'ProximaNova-Regular',
    SEMI_BOLD: 'ProximaNova-Semibold',
    THIN: 'ProximaNova-Thin'
};
export const RANDOM_STRING_ALPHA_NUMERIC = {
    ALPHANUMERIC: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
};
