import React from 'react';
import { View } from 'react-native';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';

const RNView = (props) => {
    return (
        <View style={props.style} {...setTestId(props.screenName, props.id)} {...props}>
            {props.children}
        </View>
    );
};

RNView.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default RNView;
