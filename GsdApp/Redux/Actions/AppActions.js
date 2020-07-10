import { API, TYPES_SIDE_MENU } from './Types';

export const refreshSideMenuAction = () => {
    return {
        type: TYPES_SIDE_MENU.REFRESH_SIDE_MENU
    };
};

export const setSideMenuActiveAction = (activeMenu) => {
    return {
        type: TYPES_SIDE_MENU.SET_ACTIVE_SIDE_MENU,
        activeMenu
    };
};

export const appAliveAction = (licenseKey) => {
    return {
        type: API.APP_ALIVE_ACTION,
        licenseKey
    };
};
