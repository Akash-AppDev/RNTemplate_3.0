import React, { Component, Fragment } from 'react';
import { SafeAreaView } from 'react-native';
import { Colors } from '../../Themes';
import { connect } from 'react-redux';

class SafeAreaViewUI extends Component {
    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.white }} />
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.ToolBarPrimaryColor }}>{this.props.children}</SafeAreaView>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SafeAreaViewUI);
