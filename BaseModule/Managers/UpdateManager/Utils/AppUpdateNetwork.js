import API, { AppUpdateConfig } from '../../../Network/ApiConfig';
import { getPlatformID } from '../../../Utils/helpers';

export const appUpdate = {
    get: () =>
        API.get('/lookup/product/' + AppUpdateConfig.productID + '/platform/' + getPlatformID() + '/version', {
            headers: {
                'api-token': AppUpdateConfig.appUpdateLicenseKey
            }
        })
};
