import React from 'react';
import { TextInput } from 'react-native';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';

const RNTextInput = (props) => {
    const { screenName, id } = props;
    return <TextInput {...props} autoCorrect={false} {...setTestId(screenName, id)} />;
};

RNTextInput.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default RNTextInput;
