import React from 'react';
import { Image } from 'react-native';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';

const RNImage = (props) => {
    const { screenName, id } = props;
    return <Image {...props} {...setTestId(screenName, id)} />;
};

RNImage.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default RNImage;
