import React from 'react';
import FastImage from 'react-native-fast-image';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';
import { isValidURL } from '../../Utils/helpers';
import { Image } from 'react-native';

const RNFastImage = (props) => {
    const { screenName, id, source, style } = props;
    if (isValidURL(source.uri)) {
        return <FastImage {...props} {...setTestId(screenName, id)} />;
    } else {
        return <Image resizeMode="cover" source={require('../../Images/common/no_profile_icon.png')} style={style} />;
    }
};
RNFastImage.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
export default RNFastImage;
