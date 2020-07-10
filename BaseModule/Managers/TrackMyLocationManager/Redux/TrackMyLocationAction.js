import {
    FOREGROUND_SERVICE_STATUS,
    LOCATION_WHILE_IN_USE,
    UPDATE_LOCATION_PERMISSION_STATUS,
    UPDATE_MASTER_LOCATION_STATUS
} from './TrackMyLocationTypes';

export const setForegroundServiceStatus = (foregroundServiceStatus) => {
    return {
        type: FOREGROUND_SERVICE_STATUS,
        foregroundServiceStatus
    };
};

export const updateMasterLocationStatus = (masterLocationStatus) => {
    return {
        type: UPDATE_MASTER_LOCATION_STATUS,
        masterLocationStatus
    };
};

export const updateLocationStatus = (locationStatus) => {
    return {
        type: UPDATE_LOCATION_PERMISSION_STATUS,
        locationStatus
    };
};

export const isLocationWhileInUseIOSAction = (isLocationWhileInUseIOS) => {
    return {
        type: LOCATION_WHILE_IN_USE,
        isLocationWhileInUseIOS
    };
};
