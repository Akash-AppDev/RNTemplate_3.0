import { TYPES_SIDE_MENU } from '../Actions/Types';
import { SIDE_MENU_CONSTANTS } from '../../View/SideMenu/SideMenuConstants';

const INITIAL_STATE = {
    visibleSideMenuItems: null,
    activeMenu: SIDE_MENU_CONSTANTS.DASHBOARD
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TYPES_SIDE_MENU.SET_SIDE_MENU:
            return {
                ...state,
                visibleSideMenuItems: action.payload.visibleSideMenuItems
            };
        case TYPES_SIDE_MENU.SET_ACTIVE_SIDE_MENU:
            return {
                ...state,
                activeMenu: action.activeMenu
            };

        default:
            return state;
    }
};
