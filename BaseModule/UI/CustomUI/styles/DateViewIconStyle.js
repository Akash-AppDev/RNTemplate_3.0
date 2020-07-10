import { StyleSheet } from 'react-native';
import { Colors } from '../../../Themes';
import { FONT_FAMILY } from '../../../Utils/Constants';

export default StyleSheet.create({
    dateTextDisplayStyle: {
        marginLeft: 5,
        color: Colors.suvaGrey,
        fontFamily: FONT_FAMILY.REGULAR,
        fontSize: 12
    },
    datePlaceholderStyle: {
        marginLeft: 5,
        marginTop: 5,
        color: Colors.suvaGrey,
        fontFamily: FONT_FAMILY.REGULAR,
        fontSize: 14
    },
    dateParentViewStyle: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center'
    }
});
