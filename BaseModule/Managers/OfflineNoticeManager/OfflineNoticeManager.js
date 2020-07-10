import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './Styles/OfflineNoticeManagerStyles';
import { isValidElement } from '../../Utils/helpers';
import NetInfo from '@react-native-community/netinfo';
import { Constants } from '../../Utils/Constants';
import { updateConnectionStatusAction } from './Redux/OfflineNoticeManagerAction';

let unsubscribe;

class OfflineNotice extends PureComponent {
    state = {
        isConnected: true
    };
    componentDidMount() {
        unsubscribe = NetInfo.addEventListener((state) => {
            if (__DEV__) {
                console.log('Connection type', state.type);
                console.log('Is connected?', state.isConnected);
            }
            this.handleConnectivityChange(state.isConnected);
        });

        // For initial fetch
        NetInfo.fetch().then((state) => {
            if (__DEV__) {
                console.log('Connection type', state.type);
                console.log('Is connected?', state.isConnected);
            }
            this.handleConnectivityChange(state.isConnected);
        });
    }

    componentWillUnmount() {
        unsubscribe();
    }

    handleConnectivityChange = (isConnected) => {
        this.props.updateConnectionStatusAction(isConnected);
        if (isConnected) {
            this.setState({ isConnected });
        } else {
            this.setState({ isConnected });
        }
    };

    renderOfflineDialog() {
        const { isFullScreenView, offlineMessage, needToShowMessage } = this.props;
        if (!this.state.isConnected && isValidElement(needToShowMessage) && needToShowMessage) {
            return (
                <View style={isFullScreenView ? styles.offlineContainerFullScreen : styles.offlineContainer}>
                    <Text style={styles.offlineText}>
                        {isValidElement(offlineMessage) ? offlineMessage : Constants.NO_INTERNET_CONNECTION}
                    </Text>
                </View>
            );
        }
    }

    render() {
        return <View>{this.renderOfflineDialog()}</View>;
    }
}

const mapStateToProps = (state) => ({
    connectionStatus: state.offlineNoticeManagerState.connectionStatus
});

const mapDispatchToProps = {
    updateConnectionStatusAction
};

export default connect(mapStateToProps, mapDispatchToProps)(OfflineNotice);
