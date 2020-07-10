import { StyleSheet, Platform } from 'react-native';
import Colors from "../../../Themes/Colors";
import {FONT_FAMILY} from "../../../Utils/Constants";

export default StyleSheet.create({
    viewStyle: {
        alignItems: 'center',
        height: 60,
        flexDirection: 'row',
        paddingTop: 10,
        backgroundColor: Colors.white,
        elevation: 5,
        shadowColor: Colors.suvaGrey,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 0.2
    },
    iconContainer: {
        marginRight: 2
    },
    navigationIconStyle: {
        marginLeft: 5,
        color: Colors.black
    },
    headerText: {
        fontSize: 20,
        fontFamily: FONT_FAMILY.REGULAR,
        color: Colors.black,
        flex: 1
    },
    headerButtonContainer: {
        flexDirection: 'row'
    },
    headerButton: {
        marginRight: 5,
        color: Colors.black
    },
    modalStyle: {
        backgroundColor: Colors.white,
        margin: 0,
        alignItems: undefined,
        justifyContent: undefined
    },
    labelCount: {
        minWidth: 15,
        textAlign: 'center',
        fontSize: 10,
        fontFamily: FONT_FAMILY.REGULAR,
        backgroundColor: Colors.notificationCountBgColor,
        paddingHorizontal: 4,
        paddingVertical: 2,
        color: Colors.white,
        borderRadius: 5,
        position: 'absolute',
        right: 8,
        overflow: 'hidden'
    },
    detailHeaderStyle: {
        backgroundColor: Colors.ToolBarPrimaryColor,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        shadowColor: Colors.suvaGrey,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 0.2
    },
    detailHeaderWithoutElevationStyle: {
        backgroundColor: Colors.ToolBarPrimaryColor,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: Colors.suvaGrey
    },
    menuTextStyle: {
        fontFamily: FONT_FAMILY.MEDIUM,
        color: Colors.black,
        fontSize: 12,
        left: -12,
        textAlign: 'left',
        flex: 1,
        bottom: Platform.OS === 'ios' ? -1 : 0
    },
    marginBottomStyle: {
        marginBottom: 3
    },
    withoutMarginBottomStyle: {
        marginBottom: 0
    },
    headerModalImageStyle: {
        alignItems: 'center',
        bottom: Platform.OS === 'ios' ? 0 : -2
    },
    searchInputRowStyle: {
        flexDirection: 'row'
    },
    searchInputStyle: {
        width: '88%',
        height: 'auto'
    },
    searchInputIOSStyle: {
        borderBottomWidth: 0.2,
        borderColor: Colors.textGreyColor
    },
    searchInputAndroidStyle: {
        bottom: 10
    },
    cancelIconStyle: {
        right: 25,
        color: Colors.middleGrey
    },
    disclaimerFooterStyle: {
        textAlign: 'left',
        color: Colors.alizarinRed,
        fontFamily: FONT_FAMILY.REGULAR,
        fontSize: 12,
        paddingVertical: 10,
        marginLeft: 15
    },
    normalFooterStyle: {
        textAlign: 'left',
        fontFamily: FONT_FAMILY.REGULAR,
        fontSize: 12,
        paddingVertical: 10,
        marginLeft: 15
    },
    footerStyle: {
        backgroundColor: Colors.ToolBarPrimaryColor,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 24,
        shadowColor: Colors.darkBlack,
        shadowOffset: {
            width: 0,
            height: 12
        },
        shadowRadius: 16,
        shadowOpacity: 0.58
    }
});
