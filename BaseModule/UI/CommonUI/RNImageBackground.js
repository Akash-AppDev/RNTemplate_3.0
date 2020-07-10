import React from 'react';
import { ImageBackground } from 'react-native';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';

const RNImageBackground = (props) => {
    const { screenName, id } = props;
    return (
        <ImageBackground {...props} {...setTestId(screenName, id)}>
            {props.children}
        </ImageBackground>
    );
};

RNImageBackground.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default RNImageBackground;
