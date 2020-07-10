import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        maxWidth: 248,
        minWidth: 124,
        alignItems: 'center'
    },
    title: {
        fontSize: 14,
        paddingHorizontal: 8,
        textAlign: 'left',
        color: '#333333',
        flex: 1
    },
    image: {
        width: 30,
        height: 15
    },
    itemContainer: {
        flexDirection: 'row',
        height: 48,
        maxWidth: 248,
        minWidth: 124,
        marginLeft: 8,
        alignItems: 'center'
    },
    itemImage: {
        width: 30,
        height: 16,
        marginHorizontal: 8
    },
    selectorIcon: {
        width: 12,
        height: 12,
        marginLeft: 8,
        marginRight: 10
    }
});
export default styles;
