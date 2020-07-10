import { StyleSheet } from 'react-native';
import {FONT_FAMILY} from "../../../Utils/Constants";


const styles = StyleSheet.create({
    textStyle: {
        fontSize: 22,
        color: '#3E4A59',
        fontFamily: FONT_FAMILY.REGULAR
    },
    underline: {
        maxWidth: 40,
        borderBottomWidth: 3,
        borderBottomColor: '#F7D823'
    }
});
export default styles;
