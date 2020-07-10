import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';

const RNTouchableWithoutFeedback = (props) => {
    return (
        <TouchableWithoutFeedback
            activeOpacity={props.activeOpacity}
            style={props.style}
            onPress={props.onPress}
            {...props}
            {...setTestId(props.screenName, props.id)}
        >
            {props.children}
        </TouchableWithoutFeedback>
    );
};

RNTouchableWithoutFeedback.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default RNTouchableWithoutFeedback;
