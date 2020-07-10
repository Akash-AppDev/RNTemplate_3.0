import { StyleSheet } from "react-native";
import Colors from "../../../BaseModule/Themes/Colors";
import {FONT_FAMILY} from "../../../BaseModule/Utils/Constants";

export default StyleSheet.create({
    centerAlignedTextView: {
        flex: 1,
        backgroundColor: Colors.white,
        margin: 25
    },
    centerAlignedText: {
        fontSize: 14,
        fontFamily: FONT_FAMILY.SEMI_BOLD
    },
    mainContainerStyle: {
        flex: 1
    },
    scrollViewStyle: {
        flex: 1,
        backgroundColor: Colors.white
    },
    topIconAndHelpStyle: {
        padding: 20,
        alignItems: "center"
    },
    helpTextStyle: {
        fontSize: 14,
        fontFamily: FONT_FAMILY.MEDIUM,
        color: Colors.linkBlue,
        alignSelf: "flex-end",
        flex: 1
    },
    bottomMainVewStyle: {
        margin: 5,
        marginHorizontal: 15,
        backgroundColor: Colors.white,
        marginBottom: 10
    },
    loginButtonStyle: {
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#56b7ea'
    },
    loginTextStyle: {
        alignSelf: "center",
        color: Colors.white,
        fontFamily: FONT_FAMILY.MEDIUM
    },
    newUserButtonStyle: {
        flexDirection: "row",
        marginTop: 10,
        alignSelf: "center"
    },
    newUserText1Style: {
        textAlign: "center",
        fontSize: 14,
        fontFamily: FONT_FAMILY.MEDIUM,
        color: Colors.greyHeaderText
    },
    newUserText2Style: {
        textAlign: "center",
        fontSize: 14,
        fontFamily: FONT_FAMILY.MEDIUM,
        color: Colors.linkBlue
    },
    dashViewStyle: {
        alignSelf: "center",
        padding: 2,
        backgroundColor: "#e5e5e5",
        width: "40%",
        marginTop: 10
    },
    loginContainerStyle: {
        marginTop: 20
    },
    loginTitleTextStyle: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: FONT_FAMILY.SEMI_BOLD
    },
    loginSecondTitleTextStyle: {
        textAlign: "center",
        fontSize: 14,
        fontFamily: FONT_FAMILY.REGULAR,
        marginTop: 10
    },
    inputViewStyle: {
        marginTop: 30
    },
    forgotPasswordButtonStyle: {
        alignSelf: "flex-end",
        paddingVertical: 10
    },
    forgotPasswordTextStyle: {
        fontSize: 12,
        fontFamily: FONT_FAMILY.MEDIUM,
        color: Colors.linkBlue
    },
    imageStyle: {
        width: 30,
        height: 30
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
    }
});
