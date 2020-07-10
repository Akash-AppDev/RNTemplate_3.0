import React from 'react';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';
import styles from './Style/FloatingActionButtonStyle';
import CustomIcon from '../CustomUI/CustomIcon';
import RNTouchableOpacity from './RNTouchableOpacity';

const RNFloatingActionButton = (props) => {
    const { screenName, id, onPress, icon } = props;
    return (
        <RNTouchableOpacity
            activeOpacity={0.7}
            screenName={screenName}
            id={id}
            style={styles.floatingButtonStyle}
            onPress={onPress}
            {...setTestId(screenName, id)}
        >
            <CustomIcon size={30} name={icon} style={styles.floatingButtonIconStyle} />
        </RNTouchableOpacity>
    );
};

RNFloatingActionButton.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};
RNFloatingActionButton.defaultProps = {
    icon: 'Plus'
};

export default RNFloatingActionButton;
