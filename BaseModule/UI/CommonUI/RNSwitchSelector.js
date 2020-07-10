import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';

const RNSwitchSelector = (props) => {
    return <SwitchSelector {...props} {...setTestId(props.screenName, props.id)} />;
};
RNSwitchSelector.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
export default RNSwitchSelector;
