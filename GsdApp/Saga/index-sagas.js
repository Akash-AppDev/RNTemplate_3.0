import appSaga from './AppSaga';
import versionUpdateSaga from "../../BaseModule/Managers/UpdateManager/Redux/VersionUpdateSaga";

export default function* IndexSaga() {
    yield [appSaga(), versionUpdateSaga()];
}
