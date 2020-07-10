import { StyleSheet } from 'react-native';
import { Colors } from '../../../Themes';
import { FONT_FAMILY } from '../../../Utils/Constants';

const styles = StyleSheet.create({
    modalContentContainerStyle: {
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 8
    },
    modalHeaderStyle: {
        color: Colors.black,
        fontSize: 20,
        paddingBottom: 12,
        fontFamily: FONT_FAMILY.SEMI_BOLD
    },
    modalHeaderTitleCenter: {
        alignSelf: 'center'
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 5
    },
    modalDescriptionStyle: {
        color: Colors.black,
        fontSize: 16,
        marginBottom: 15,
        fontFamily: FONT_FAMILY.REGULAR
    },
    negativeButtonStyle: {
        flex: 1,
        backgroundColor: Colors.transparent,
        borderWidth: 1,
        borderColor: Colors.ashColor,
        height: 50
    },
    positiveButtonStyle: {
        flex: 1,
        height: 50
    },
    negativeButtonTextStyle: {
        color: Colors.textGreyColor,
        fontSize: 14,
        fontFamily: FONT_FAMILY.REGULAR
    },
    buttonTextStyle: {
        fontFamily: FONT_FAMILY.REGULAR,
        fontSize: 14
    },
    buttonSpaceStyle: {
        width: 20
    }
});

export default styles;
