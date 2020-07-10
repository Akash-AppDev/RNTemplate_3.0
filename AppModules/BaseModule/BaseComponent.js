import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import AppStyles from "../../BaseModule/Themes/AppStyles";
import Header from "../../BaseModule/UI/CommonUI/Header";
import SafeAreaViewUI from "../../BaseModule/UI/CustomUI/SafeAreaViewUI";

class BaseComponent extends Component {
    render() {
        const { children, headerText, navigation, isWithoutMarginBottomStyle } = this.props;
        return (
            <SafeAreaViewUI>
                <View style={AppStyles.container}>
                    <Header headerText={headerText} navigation={navigation} isWithoutMarginBottomStyle={isWithoutMarginBottomStyle} />
                    {children}
                </View>
            </SafeAreaViewUI>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent);
