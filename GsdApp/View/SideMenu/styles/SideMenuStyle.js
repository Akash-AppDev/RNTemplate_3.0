import { StyleSheet } from 'react-native';
import {FONT_FAMILY} from "../../../../BaseModule/Utils/Constants";
import Colors from "../../../../BaseModule/Themes/Colors";


export default StyleSheet.create({
    sideMenuParentContainer: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: Colors.sideMenuBackgroundColor,
        paddingBottom: 5
    },
    sideMenuContainer: {
        backgroundColor: Colors.sideMenuHeaderBackgroundColor,
        height: 150
    },
    sideMenuTextContainer: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: Colors.white,
        marginTop: 5,
        alignItems: 'center'
    },
    imageStyle: {
        marginLeft: 5
    },
    moreLessImage: {
        color: Colors.suvaGrey,
        marginLeft: 5
    },
    sideMenuText: {
        fontSize: 16,
        fontFamily: FONT_FAMILY.REGULAR,
        color: Colors.textGreyColor,
        marginLeft: 10,
        flex: 1
    },
    versionNameText: {
        width: '100%',
        fontSize: 12,
        fontFamily: FONT_FAMILY.REGULAR,
        textAlign: 'center'
    },
    versionContainer: {
        width: '100%',
        flex: 1,
        marginTop: 10
    },
    arrowStyle: {
        marginRight: 15
    },
    logoutStyle: {
        color: '#D4C76D',
        marginLeft: 10
    }
});
