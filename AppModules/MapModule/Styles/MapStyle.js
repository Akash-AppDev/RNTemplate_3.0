import { StyleSheet } from "react-native";
import Colors from "../../../BaseModule/Themes/Colors";
import { FONT_FAMILY } from "../../../BaseModule/Utils/Constants";

export default StyleSheet.create({
    centerAlignedTextView: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerAlignedText: {
        fontSize: 14,
        fontFamily: FONT_FAMILY.SEMI_BOLD
    }
});
