import React, { Component } from 'react';
import { DeviceEventEmitter, NativeModules, PermissionsAndroid, Platform, View } from 'react-native';
import { connect } from 'react-redux';
import {
    setForegroundServiceStatus,
    updateLocationStatus,
    updateMasterLocationStatus,
    isLocationWhileInUseIOSAction
} from './Redux/TrackMyLocationAction';
import RNSettings from 'react-native-settings'; // Install these library for using this manager
import BackgroundGeolocation from 'react-native-background-geolocation'; // Install these library for using this manager
import { isValidElement } from '../../Utils/helpers';
import { requestLocationPermission } from './Utils/PermissionUtils';

let permissionTimer;

class TrackMyLocationManager extends Component {
    state = {
        isMasterLocationModalShown: true,
        isAppPermissionModalShown: true,
        isWhileInUseModalShown: true
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            isValidElement(nextProps.trackMyLocationSwitchValue) &&
            isValidElement(this.props.trackMyLocationSwitchValue) &&
            nextProps.trackMyLocationSwitchValue === true
        ) {
            if (Platform.OS === 'ios') {
                setTimeout(() => {
                    this.startIOSBackgroundListeners();
                }, 1000);
            }
        }
    }

    componentDidMount() {
        this.previousCoordinates = { latitude: null, longitude: null };
        this.currentCoordinates = { latitude: null, longitude: null };
        this.checkMasterLocationAndPermissionStatus();
        if (Platform.OS === 'ios') {
            this.startIOSBackgroundListeners();
        } else {
            this.startAndroidBackgroundListeners();
        }
    }

    componentWillUnmount() {
        clearInterval(permissionTimer);
    }

    // Func which configures the background geo location in ios
    startIOSBackgroundListeners() {
        if (this.props.trackMyLocationSwitchValue) {
            // This handler fires whenever bgGeo receives a location update.
            BackgroundGeolocation.on('location', this.onDriverLocationChanged.bind(this), this.onError);

            // This handler fires when movement states changes (stationary->moving; moving->stationary)
            BackgroundGeolocation.on('motionchange', this.onMotionChange);

            // This event fires when a change in motion activity is detected
            BackgroundGeolocation.on('activitychange', this.onActivityChange);

            // This event fires when the user toggles location-services authorization
            BackgroundGeolocation.on('providerchange', this.onProviderChange.bind(this));

            BackgroundGeolocation.onPowerSaveChange((isPowerSaveMode) => {
                console.log('ios lower power', isPowerSaveMode);
            });

            BackgroundGeolocation.ready(
                {
                    disableLocationAuthorizationAlert: true,
                    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
                    distanceFilter: 50,
                    stopTimeout: 1,
                    debug: false,
                    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
                    stopOnTerminate: false,
                    startOnBoot: false
                },
                (state) => {
                    if (!state.enabled) {
                        this.startTracking();
                    }
                }
            );
        }
    }

    onDriverLocationChanged(location) {
        console.log('ios loc', location);
    }

    onError(error) {}

    onActivityChange(activity) {}

    // func called whenever there is a change in the app permission
    onProviderChange(provider) {
        if (provider.status === BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS) {
            this.props.updateLocationStatus(true);
            this.props.isLocationWhileInUseIOSAction(false);
            this.setState({ isWhileInUseModalShown: true, isAppPermissionModalShown: true });
            this.startTracking();
        } else if (provider.status === BackgroundGeolocation.AUTHORIZATION_STATUS_WHEN_IN_USE) {
            this.props.updateLocationStatus(true);
            this.props.isLocationWhileInUseIOSAction(true);
            if (this.state.isWhileInUseModalShown) {
                this.setState({ isWhileInUseModalShown: false });
            }
            this.setState({ isAppPermissionModalShown: true });
            this.startTracking();
        } else {
            this.setState({ isWhileInUseModalShown: true });
            if (this.props.masterLocationStatus && this.props.trackMyLocationSwitchValue && this.state.isAppPermissionModalShown) {
                this.setState({ isAppPermissionModalShown: false });
            }
            this.props.updateLocationStatus(false);
            this.props.isLocationWhileInUseIOSAction(false);
            this.stopTracking();
        }
    }

    onMotionChange(location) {}

    startTracking() {
        BackgroundGeolocation.start(function() {});
        this.checkMasterLocation();
    }

    stopTracking() {
        this.checkMasterLocation();
        // You must explicitly stop tracking if currently enabled
    }

    startAndroidBackgroundListeners() {
        requestLocationPermission();
    }

    async startService() {
        if (Platform.OS === 'android') {
            let isStarted = await NativeModules.GeoLocation.startService();
            if (isStarted === 'Success') {
                this.props.setForegroundServiceStatus(true);
                DeviceEventEmitter.addListener('updateLocation', (geoData) => {
                    console.log(geoData);
                });
            }
        }
    }

    async checkAndroidLocationPermissionStatus() {
        if (!(Platform.OS === 'ios')) {
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted) {
                // Android Location Permission Granted
                if (this.props.trackMyLocationSwitchValue === true && this.props.masterLocationStatus === true) {
                    this.props.updateLocationStatus(true);
                    this.setState({ isAppPermissionModalShown: true });
                    if (this.props.foregroundServiceStatus === false) {
                        this.startService();
                    }
                }
            } else {
                // Android Location Permission Declined
                this.props.updateLocationStatus(false);
                if (Platform.OS === 'android') {
                    if (this.props.masterLocationStatus && this.props.trackMyLocationSwitchValue && this.state.isAppPermissionModalShown) {
                        this.setState({ isAppPermissionModalShown: false });
                    }
                    this.props.setForegroundServiceStatus(false);
                    await NativeModules.GeoLocation.stopService();
                }
            }
        }
    }

    async checkMasterLocation() {
        const result = await RNSettings.getSetting(RNSettings.LOCATION_SETTING);
        if (result === RNSettings.ENABLED) {
            // Master Location Status Enabled
            this.props.updateMasterLocationStatus(true);
            this.setState({ isMasterLocationModalShown: true });
            if (Platform.OS === 'ios' && !this.props.locationStatus && this.state.isAppPermissionModalShown) {
                this.setState({ isAppPermissionModalShown: false });
            }
            if (
                this.props.foregroundServiceStatus === false &&
                this.props.trackMyLocationSwitchValue === true &&
                this.props.locationStatus === true
            ) {
                this.startService();
            }
        } else if (result === RNSettings.DISABLED) {
            // Master Location Status disabled
            if (this.state.isMasterLocationModalShown) {
                this.setState({ isMasterLocationModalShown: false, isAppPermissionModalShown: true });
            }
            this.props.updateMasterLocationStatus(false);
            if (Platform.OS === 'android') {
                this.props.setForegroundServiceStatus(false);
                await NativeModules.GeoLocation.stopService();
                DeviceEventEmitter.removeAllListeners('updateLocation');
            }
        }
    }

    async checkAndroidBatterySaverOn() {
        if (Platform.OS === 'android') {
            let isPowerModeOn = await NativeModules.batterySaver.show();
            console.log('isPowerModeOn', isPowerModeOn);
        }
    }

    checkMasterLocationAndPermissionStatus() {
        this.checkMasterLocation();
        this.checkAndroidLocationPermissionStatus();
        permissionTimer = setInterval(() => {
            this.checkAndroidLocationPermissionStatus();
            // Check master location status
            this.checkMasterLocation();
            this.checkAndroidBatterySaverOn();
        }, 2000);
    }

    render() {
        return <View />;
    }
}

const mapDispatchToProps = {
    updateMasterLocationStatus,
    updateLocationStatus,
    setForegroundServiceStatus,
    isLocationWhileInUseIOSAction
};

const mapStateToProps = (state) => ({
    trackMyLocationSwitchValue: state.trackMyLocationState.trackMyLocationSwitchValue,
    masterLocationStatus: state.trackMyLocationState.masterLocationStatus,
    locationStatus: state.trackMyLocationState.locationStatus,
    foregroundServiceStatus: state.trackMyLocationState.foregroundServiceStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackMyLocationManager);
