import { VERSION_UPDATE_API } from './VersionUpdateTypes';

export const versionUpdateAction = () => {
    return {
        type: VERSION_UPDATE_API.GET_UPDATE
    };
};
export const resetAppUpdateVersionAction = () => {
    return {
        type: VERSION_UPDATE_API.RESET_APP_UPDATE_RESPONSE
    };
};
