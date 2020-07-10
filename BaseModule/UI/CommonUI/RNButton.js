import React from 'react';
import { Text, View, ViewPropTypes } from 'react-native';
import styles from './Style/ButtonStyle';
import PropTypes from 'prop-types';
import RNTouchableOpacity from './RNTouchableOpacity';

const viewPropTypes = ViewPropTypes || View.propTypes;

const RNButton = (props) => {
    const { textStyle, disableGrey, enableGreen, buttonStyle } = styles;
    return (
        <RNTouchableOpacity
            screenName={props.screenName}
            id={props.id}
            activeOpacity={0.6}
            onPress={props.onPress}
            style={[buttonStyle, props.disable ? disableGrey : enableGreen, props.buttonStyle]}
            disabled={props.disable}
            {...props}
        >
            <Text style={[textStyle, props.buttonTextStyle]}>
                {props.textAllCaps ? props.children.toLocaleUpperCase() : props.children}
            </Text>
        </RNTouchableOpacity>
    );
};
RNButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    disable: PropTypes.bool,
    children: PropTypes.string,
    buttonStyle: viewPropTypes.style,
    buttonTextStyle: Text.propTypes.style,
    textAllCaps: PropTypes.bool,
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
RNButton.defaultProps = {
    textAllCaps: true
};
export default RNButton;
