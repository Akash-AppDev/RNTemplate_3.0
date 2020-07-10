import { VERSION_UPDATE_API } from './VersionUpdateTypes';

const initialState = {
    appUpdateResponse: null
};
export default (state = initialState, action) => {
    switch (action.type) {
        case VERSION_UPDATE_API.GET_UPDATE:
            return {
                ...state,
                appUpdateResponse: null
            };
        case VERSION_UPDATE_API.GET_VERSION_UPDATE_SUCCESS:
            return {
                ...state,
                appUpdateResponse: action.payload
            };
        case VERSION_UPDATE_API.GET_VERSION_UPDATE_ACTION_FAILED:
            return {
                ...state,
                appUpdateResponse: action.payload.data
            };
        case VERSION_UPDATE_API.RESET_APP_UPDATE_RESPONSE:
            return {
                ...state,
                appUpdateResponse: null
            };
        default:
            return state;
    }
};
