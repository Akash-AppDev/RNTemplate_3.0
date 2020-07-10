import React, { Component } from 'react';
import { Linking, View } from 'react-native';
// Redux
import { resetAppUpdateVersionAction, versionUpdateAction } from './Redux/VersionUpdateActions';
import { connect } from 'react-redux';
// UI
import { getVersion } from 'react-native-device-info';
// Util
import { APP_UPDATE_CONSTANTS } from './Utils/AppUpdateConstants';
import { getDeviceOS, isNewerVersion, isValidElement } from '../../Utils/helpers';
import { RNModal } from 'BaseModule/UI';
import { AppUpdateConfig } from './Utils/AppUpdateConfig';

class AppUpdateManager extends Component {
    componentDidMount() {
        this.props.versionUpdateAction();
    }

    state = {
        showForceUpdateModal: false,
        showOptionalUpdateModal: false
    };

    shouldShowForceOrOptionUpdateModal() {
        const { appUpdateResponse } = this.props;
        if (isValidElement(appUpdateResponse) && isValidElement(appUpdateResponse.data)) {
            let objData = appUpdateResponse.data;
            let forcedVersion = objData.last_forced_version;
            let latestVersion = objData.name;
            let appVersion = getVersion();
            if (isNewerVersion(appVersion, forcedVersion)) {
                this.props.resetAppUpdateVersionAction();
                this.setState({
                    showForceUpdateModal: true
                });
            } else if (isNewerVersion(appVersion, latestVersion)) {
                this.props.resetAppUpdateVersionAction();
                this.setState({
                    showOptionalUpdateModal: true
                });
            }
        }
    }

    redirectToStore() {
        this.dismissModal();
        if (getDeviceOS() === 'iOS') {
            Linking.openURL(AppUpdateConfig.storeUrls.IOS_APP_STORE_LINK).catch((err) => console.error('An error occurred', err));
        } else {
            Linking.openURL(AppUpdateConfig.storeUrls.ANDROID_PLAY_STORE_LINK).catch((err) => console.error('An error occurred', err));
        }
    }

    dismissModal() {
        this.setState({
            showOptionalUpdateModal: false
        });
    }

    render() {
        return (
            <View>
                {this.shouldShowForceOrOptionUpdateModal()}
                <RNModal
                    title={APP_UPDATE_CONSTANTS.ModalButtons.UPDATE}
                    isVisible={this.state.showOptionalUpdateModal}
                    description={APP_UPDATE_CONSTANTS.updateType.optionalUpdate}
                    positiveButtonText={APP_UPDATE_CONSTANTS.ModalButtons.OK}
                    positiveButtonClicked={() => this.redirectToStore()}
                    negativeButtonText={APP_UPDATE_CONSTANTS.ModalButtons.CANCEL}
                    negativeButtonClicked={() => this.dismissModal()}
                    requestClose={() => this.dismissModal()}
                />
                <RNModal
                    title={APP_UPDATE_CONSTANTS.ModalButtons.UPDATE}
                    isVisible={this.state.showForceUpdateModal}
                    description={APP_UPDATE_CONSTANTS.updateType.forceUpdate}
                    positiveButtonText={APP_UPDATE_CONSTANTS.ModalButtons.OK}
                    positiveButtonClicked={() => this.redirectToStore()}
                    requestClose={() => {}}
                    dialogCancelable={false}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appUpdateResponse: state.updateState.appUpdateResponse
    };
};

const mapDispatchToProps = {
    versionUpdateAction,
    resetAppUpdateVersionAction
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUpdateManager);
