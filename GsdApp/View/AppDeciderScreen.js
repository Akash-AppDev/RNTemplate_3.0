import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { appAliveAction } from '../Redux/Actions';
import RNText from "../../BaseModule/UI/CommonUI/RNText";
import AuthManager from '../../BaseModule/Managers/AuthManager/AuthManager';

class AppDeciderScreen extends Component {
    componentDidMount() {
        switch (AuthManager.isUserLoggedIn()) {
            case true:
                this.props.navigation.navigate('appStack');
                break;
            case false:
                this.props.navigation.navigate('authStack');
                break;
        }
    }

    render() {
        return (
            <View>
                <RNText> AppDeciderScreen </RNText>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    appAliveAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AppDeciderScreen);
