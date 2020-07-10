import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles/SideMenuHeaderViewStyle';

const SideMenuHeaderView = (props) => {
    const { onPressed } = props;
    return (
        <TouchableOpacity onPress={onPressed} activeOpacity={1} style={styles.rootContainer}>
            <View style={styles.imageDrawable} />
        </TouchableOpacity>
    );
};
export default SideMenuHeaderView;
