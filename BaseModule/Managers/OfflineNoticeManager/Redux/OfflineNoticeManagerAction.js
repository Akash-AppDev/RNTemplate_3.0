import { UPDATE_CONNECTION_STATUS } from './OfflineNoticeManagerTypes';

export const updateConnectionStatusAction = (connectionStatus) => {
    return {
        type: UPDATE_CONNECTION_STATUS,
        connectionStatus
    };
};
