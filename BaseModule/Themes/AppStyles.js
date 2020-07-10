import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    horizontalDivider: {
        marginBottom: 5,
        backgroundColor: Colors.dividerGrey,
        width: '100%',
        height: 1
    },
    verticalDivider: {
        marginBottom: 5,
        backgroundColor: Colors.dividerGrey,
        height: '100%',
        width: 1
    }
});
