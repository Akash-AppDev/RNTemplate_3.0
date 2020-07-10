import React from 'react';
import { TouchableOpacity } from 'react-native';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';

const RNTouchableOpacity = (props) => {
    return (
        <TouchableOpacity {...props} {...setTestId(props.screenName, props.id)}>
            {props.children}
        </TouchableOpacity>
    );
};

RNTouchableOpacity.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
RNTouchableOpacity.defaultProps = {
    activeOpacity: 0.7
};

export default RNTouchableOpacity;
