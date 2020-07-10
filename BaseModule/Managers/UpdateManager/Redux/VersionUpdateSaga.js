import { VERSION_UPDATE_API } from './VersionUpdateTypes';
import { call, put, takeLatest } from 'redux-saga/effects';
import { isValidElement } from '../../../Utils/helpers';
import { appUpdate } from '../Utils/AppUpdateNetwork';

function* getVersionUpdateAPICall(action) {
    try {
        const apiResponse = yield call(appUpdate.get);
        if (isValidElement(apiResponse)) {
            yield put({
                type: VERSION_UPDATE_API.GET_VERSION_UPDATE_SUCCESS,
                payload: {
                    data: apiResponse.data
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* versionUpdateSaga() {
    yield [takeLatest(VERSION_UPDATE_API.GET_UPDATE, getVersionUpdateAPICall)];
}

export default versionUpdateSaga;
