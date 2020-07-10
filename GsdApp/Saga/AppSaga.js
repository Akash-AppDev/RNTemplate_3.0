import {call, put, takeLatest} from 'redux-saga/effects';
import {API, TYPES_SIDE_MENU} from '../Redux/Actions/Types';
import Menu from '../View/SideMenu/SideMenuConfig';
import {appBase} from '../Network/AppBaseNetwork';
import {showErrorMessage, showInfoMessage} from "../../BaseModule/Network/NetworkHelpers";
import {Constants} from "../../BaseModule/Utils/Constants";

export function* refreshSideMenuPropertiesForTakeaway() {
    yield put({
        type: TYPES_SIDE_MENU.SET_SIDE_MENU,
        payload: {
            visibleSideMenuItems: Menu.filter((value) => {
                return !value.is_more;
            }),
            hiddenSideMenuItems: Menu.filter((value) => {
                return value.is_more;
            })
        }
    });
}

function* makeAppAliveCall(action) {
    try {
        yield call(appBase.makeAppAliveCall, action);
        showInfoMessage(Constants.SUCCESS);
    } catch (e) {
        showErrorMessage(e);
    }
}

function* appSaga() {
    yield [
        takeLatest(TYPES_SIDE_MENU.REFRESH_SIDE_MENU, refreshSideMenuPropertiesForTakeaway),
        takeLatest(API.APP_ALIVE_ACTION, makeAppAliveCall)
    ];
}

export default appSaga;
