import API from '../../BaseModule/Network/ApiConfig'

export const appBase = {
    makeAppAliveCall: (params) =>
        API.put('/app/alive?api_token=' + params.licenseKey, {})
};
