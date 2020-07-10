import {
    FOREGROUND_SERVICE_STATUS,
    LOCATION_WHILE_IN_USE,
    UPDATE_LOCATION_PERMISSION_STATUS,
    UPDATE_MASTER_LOCATION_STATUS
} from './TrackMyLocationTypes';

const INITIAL_STATE = {
    masterLocationStatus: false,
    locationStatus: false,
    foregroundServiceStatus: false,
    isLocationWhileInUseIOS: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_MASTER_LOCATION_STATUS: {
            return {
                ...state,
                masterLocationStatus: action.masterLocationStatus
            };
        }
        case UPDATE_LOCATION_PERMISSION_STATUS: {
            return {
                ...state,
                locationStatus: action.locationStatus
            };
        }
        case LOCATION_WHILE_IN_USE:
            return {
                ...state,
                isLocationWhileInUseIOS: action.isLocationWhileInUseIOS
            };
        case FOREGROUND_SERVICE_STATUS:
            return {
                ...state,
                foregroundServiceStatus: action.foregroundServiceStatus
            };
        default:
            return state;
    }
};
