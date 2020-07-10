import React from 'react';
import { setTestId } from '../../Utils/AutomationHelper';
import CustomIcon from '../CustomUI/CustomIcon';
import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes';
import PropTypes from 'prop-types';

const RNCustomIcon = (props) => {
    return (
        <CustomIcon
            style={[style.style, props.style]}
            size={props.size}
            name={props.name}
            {...setTestId(props.screenName, props.id)}
            {...props}
        />
    );
};

const style = StyleSheet.create({
    style: {
        color: Colors.black
    }
});

RNCustomIcon.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default RNCustomIcon;
