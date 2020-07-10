import { combineReducers } from 'redux';
import appsReducer from './AppReducers';
import offlineNoticeManagerReducer from '../../../BaseModule/Managers/OfflineNoticeManager/Redux/OfflineNoticeManagerReducer';

const appReducer = combineReducers({
    appState: appsReducer,
    offlineNoticeManagerState: offlineNoticeManagerReducer
});

const rootReducer = (state, action) => {
    /**
     *  ENABLE FOR LOGOUT
     */
    /* if (action.type === AuthTypes.LOGIN_API.LOGOUT_ACTION) {
        Object.keys(state).forEach((key) => {
            storage.removeItem(`persist:${key}`);
        });
        state = undefined;
    }*/
    return appReducer(state, action);
};

export default rootReducer;
