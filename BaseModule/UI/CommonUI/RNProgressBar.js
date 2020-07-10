import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../Themes';
import RNView from './RNView';
// progress should be between 0 and 1
const RNProgressBar = ({ screenName, id, progress }) => {
    return (
        <RNView screenName={screenName} id={id} style={{ flex: 1, flexDirection: 'row', height: 2 }}>
            <View style={{ backgroundColor: Colors.carrotOrange, flex: progress }} />
            <View style={{ backgroundColor: Colors.grey, flex: 1 - progress }} />
        </RNView>
    );
};

export default RNProgressBar;
