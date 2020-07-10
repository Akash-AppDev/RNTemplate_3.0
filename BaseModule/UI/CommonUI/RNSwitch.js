import React from 'react';
import { Platform, Switch } from 'react-native';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';
import Colors from '../../Themes/Colors';

const RNSwitch = (props) => {
    const { screenName, id } = props;
    return (
        <Switch
            {...props}
            {...setTestId(screenName, id)}
            thumbColor={Platform.OS === 'android' ? Colors.white : null}
            trackColor={{ false: Colors.ashColor, true: Colors.green }}
        />
    );
};
RNSwitch.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
export default RNSwitch;
