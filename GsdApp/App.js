import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './Redux/Store/ConfigureStore';
import RootStack from './Navigation/AppNavigation';
import { createAppContainer } from 'react-navigation';
import FlashMessage from 'react-native-flash-message';
import DeviceInfo from 'react-native-device-info';
import AppStyles from "../BaseModule/Themes/AppStyles";
import Colors from "../BaseModule/Themes/Colors";

console.disableYellowBox = true;
const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
    componentDidMount() {
        DeviceInfo.getApiLevel().then((apiLevel) => {
            if (apiLevel >= 21 && Platform.OS === 'android') {
                StatusBar.setBackgroundColor(Colors.white);
                StatusBar.setBarStyle('dark-content');
            }
        });
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <View style={AppStyles.container}>
                        <AppContainer />
                        <FlashMessage position="bottom" floating={true} />
                    </View>
                </PersistGate>
            </Provider>
        );
    }
}
