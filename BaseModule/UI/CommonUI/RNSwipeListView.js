import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../Themes';
import { setTestId } from '../../Utils/AutomationHelper';
import PropTypes from 'prop-types';

const RNSwipeListView = (props) => {
    //TODO facing issue with SwipeListView import. Have to change View into SwipeListView once it resolved.
    return (
        <View style={[style.style, props.style]} {...setTestId(props.screenName, props.id)} {...props}>
            {props.children}
        </View>
    );
};

const style = StyleSheet.create({
    style: {
        backgroundColor: Colors.white
    }
});

RNSwipeListView.propType = {
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default RNSwipeListView;
