import React, { Component } from 'react';
import { View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

let fcmToken;

class App extends Component {
    componentDidMount() {
        fcmToken = messaging().getToken();
        console.log('token', fcmToken);
        this.requestPermission();
        this.sendMessage();
    }

    requestPermission() {
        // Permission for ios
        const granted = messaging().requestPermission();
        if (granted) {
            console.log('User granted messaging permissions!');
        } else {
            console.log('User declined messaging permissions :(');
        }
    }

    sendMessage() {
        console.log('fcm token', fcmToken);
        messaging().onMessage(async (remoteMessage) => {
            console.log('FCM Message Data:', remoteMessage.data);
        });
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('Message handled in the background!', remoteMessage);
        });
    }

    render() {
        return <View />;
    }
}

export default App;
