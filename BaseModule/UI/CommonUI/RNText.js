import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FONT_FAMILY } from '../../Utils/Constants';
import { Colors } from '../../Themes';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';

const RNText = (props) => {
    return (
        <Text numberOfLines={props.numberOfLines} style={[style.style, props.style]} {...props} {...setTestId(props.screenName, props.id)}>
            {props.children}
        </Text>
    );
};

const style = StyleSheet.create({
    style: {
        color: Colors.black,
        fontFamily: FONT_FAMILY.REGULAR
    }
});

RNText.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default RNText;
