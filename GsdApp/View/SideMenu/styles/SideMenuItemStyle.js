import { StyleSheet } from 'react-native';
import Colors from "../../../../BaseModule/Themes/Colors";
import {FONT_FAMILY} from "../../../../BaseModule/Utils/Constants";

export default StyleSheet.create({
    sideMenuContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        marginTop: 5
    },
    sideMenuViewStyle: {
        flex: 1,
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuItemTextStyle: {
        fontSize: 16,
        fontFamily: FONT_FAMILY.REGULAR,
        color: Colors.textGreyColor,
        marginLeft: 10
    },
    menuSelectedTextStyle: {
        color: Colors.white,
        fontFamily: FONT_FAMILY.SEMI_BOLD
    },
    labelCount: {
        minWidth: 15,
        textAlign: 'center',
        fontSize: 12,
        fontFamily: FONT_FAMILY.REGULAR,
        backgroundColor: Colors.notificationCountBgColor,
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginBottom: 10,
        marginLeft: 5,
        color: Colors.white,
        borderRadius: 5,
        overflow: 'hidden'
    }
});
